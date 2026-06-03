"""
One-off image harvester.

Queries the Wikimedia Commons API (keyless, free-licensed) for a relevant HD
photo for each gardening category and tool, filters for real JPEG photos, makes
sure no image is reused, and writes the resulting key->url map to images.json.
"""
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request

API = "https://commons.wikimedia.org/w/api.php"
UA = "GardenToolsSite/1.0 (local dev image harvest)"

# (key, search query). Keys for tools match `${slug}:${baseName}` so products.ts
# can look them up; category keys are the plain slug.
ITEMS = [
    # --- Category heroes ---
    ("cat:hand-tools", "gardening hand tools trowel"),
    ("cat:power-tools", "hedge trimmer garden"),
    ("cat:watering", "watering can garden"),
    ("cat:planting", "planting seedlings garden"),
    ("cat:pruning", "pruning roses secateurs"),
    ("cat:lawn-care", "lawn mower grass"),

    # --- Hand Tools ---
    ("hand-tools:Garden Trowel", "garden trowel"),
    ("hand-tools:Hand Weeder", "weeding fork tool"),
    ("hand-tools:Garden Fork", "garden digging fork"),
    ("hand-tools:Cultivator Rake", "hand cultivator garden"),
    ("hand-tools:Transplanting Spade", "garden spade"),
    ("hand-tools:Bulb Planter", "bulb planter"),
    ("hand-tools:Garden Hoe", "garden hoe tool"),
    ("hand-tools:Wooden Dibber", "garden dibber"),
    ("hand-tools:Soil Scoop", "potting scoop garden"),
    ("hand-tools:Hori Hori Knife", "hori hori knife"),

    # --- Power Tools ---
    ("power-tools:Hedge Trimmer", "hedge trimmer"),
    ("power-tools:Lawn Edger", "lawn edger tool"),
    ("power-tools:Leaf Blower", "leaf blower"),
    ("power-tools:Garden Tiller", "rotary tiller"),
    ("power-tools:Pruning Saw", "pruning saw"),
    ("power-tools:Chainsaw", "chainsaw"),
    ("power-tools:Garden Shredder", "garden chipper shredder"),
    ("power-tools:Grass Trimmer", "string trimmer grass"),
    ("power-tools:Cordless Drill", "cordless drill"),
    ("power-tools:Pressure Washer", "pressure washer"),

    # --- Watering ---
    ("watering:Garden Hose 50ft", "garden hose"),
    ("watering:Spray Nozzle", "garden hose nozzle"),
    ("watering:Oscillating Sprinkler", "garden sprinkler watering"),
    ("watering:Drip Irrigation Kit", "drip irrigation"),
    ("watering:Watering Can", "watering can"),
    ("watering:Hose Reel Cart", "garden hose reel"),
    ("watering:Soaker Hose", "soaker hose garden"),
    ("watering:Water Timer", "hose tap timer"),
    ("watering:Rain Barrel", "rain barrel"),
    ("watering:Plant Mister", "spray bottle plant"),

    # --- Planting ---
    ("planting:Seed Starting Tray", "seedling tray"),
    ("planting:Potting Soil Mix", "potting soil"),
    ("planting:Grow Light", "grow light plant"),
    ("planting:Plant Labels", "plant marker label"),
    ("planting:Seedling Heat Mat", "seed germination tray"),
    ("planting:Compost Bin", "compost bin"),
    ("planting:Raised Bed Kit", "raised garden bed"),
    ("planting:Plant Support Stakes", "tomato plant support"),
    ("planting:Propagation Pots", "seedling pots"),
    ("planting:Garden Kneeler", "garden kneeler bench"),

    # --- Pruning ---
    ("pruning:Bypass Pruning Shears", "secateurs pruning"),
    ("pruning:Hedge Shears", "hedge shears garden"),
    ("pruning:Lopper", "loppers pruning"),
    ("pruning:Folding Pruning Saw", "folding pruning saw"),
    ("pruning:Pole Pruner", "pole pruner"),
    ("pruning:Topiary Shears", "topiary trimming"),
    ("pruning:Anvil Pruner", "anvil pruner"),
    ("pruning:Garden Scissors", "harvesting scissors garden"),
    ("pruning:Ratchet Pruner", "garden secateurs"),
    ("pruning:Pruning Knife", "pruning knife"),

    # --- Lawn Care ---
    ("lawn-care:Reel Mower", "push reel mower"),
    ("lawn-care:Aerator Shoes", "lawn aerator"),
    ("lawn-care:Broadcast Spreader", "lawn spreader"),
    ("lawn-care:Lawn Roller", "lawn roller"),
    ("lawn-care:Dethatching Rake", "garden lawn rake"),
    ("lawn-care:Grass Seed Spreader", "garden spreader fertilizer"),
    ("lawn-care:Lawn Sprinkler", "garden lawn sprinkler watering"),
    ("lawn-care:Edging Shears", "long handle edging shears"),
    ("lawn-care:Leaf Rake", "leaf rake garden"),
    ("lawn-care:Lawn Fertilizer", "lawn fertilizer grass"),
]

# Titles containing any of these are skipped: paintings, old catalog scans,
# museum pieces, diagrams, maps, etc. — anything that isn't a clean modern photo.
BLOCK = [
    "catalogue", "catalog", "price list", "wholesale", "supplies", "art project",
    "painting", "drawing", "engraving", "lithograph", "museum", "kremlin",
    "diagram", "map of", "patent", "logo", "coat of arms", "stamp", "banknote",
    "annual", "descriptive", "seeds", "seed list", "fire sprinkler", "fire hose",
    "navy", "looper", "hemlock", "geograph", "redware", "seminary", "wikibooks",
    "spread eagle", "cemetery", "memorial", "everything for the garden", "dpla",
    "bamenda", "stihl", "installation", "weingartenschere", "weinweg", "trimbot",
    "platform", "sculpture", "robot", "autonomous", "icon", ".svg", ".png",
]

# Secondary (broader) query tried when the primary returns nothing acceptable.
SECONDARY = {
    "hand-tools:Wooden Dibber": "planting seedling hand",
    "hand-tools:Bulb Planter": "planting flower bulbs soil",
    "watering:Water Timer": "garden tap faucet",
    "watering:Plant Mister": "spray bottle",
    "planting:Plant Support Stakes": "tomato plants garden",
    "planting:Garden Kneeler": "gardening kneeling soil",
    "pruning:Garden Scissors": "garden secateurs pruning",
    "lawn-care:Broadcast Spreader": "lawn care fertilizing grass",
    "lawn-care:Grass Seed Spreader": "sowing grass seed lawn",
    "lawn-care:Edging Shears": "garden shears trimming",
    "lawn-care:Lawn Sprinkler": "water sprinkler lawn grass",
    "lawn-care:Lawn Fertilizer": "fertilizer granules garden",
    "cat:hand-tools": "garden trowel gloves soil",
}


def api_search(query, limit=40, width=1000):
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": query,
        "gsrnamespace": "6",
        "gsrlimit": str(limit),
        "prop": "imageinfo",
        "iiprop": "url|mime|size",
        "iiurlwidth": str(width),
        "format": "json",
        "maxlag": "5",
    }
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    delay = 5
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code in (429, 503) and attempt < 4:
                print(f"     throttled ({e.code}); backing off {delay}s")
                time.sleep(delay)
                delay *= 2
                continue
            raise


def candidates(data):
    pages = (data.get("query") or {}).get("pages") or {}
    out = []
    for p in pages.values():
        ii = p.get("imageinfo")
        if not ii:
            continue
        info = ii[0]
        out.append({
            "index": p.get("index", 999),
            "title": p.get("title", ""),
            "mime": info.get("mime", ""),
            "w": info.get("width", 0),
            "h": info.get("height", 0),
            "thumb": info.get("thumburl", ""),
        })
    out.sort(key=lambda c: c["index"])
    return out


def blocked(c):
    t = c["title"].lower()
    if any(b in t for b in BLOCK):
        return True
    # Any pre-1990 year in the title is a strong "archival scan" signal.
    for y in re.findall(r"\b(1[5-9]\d\d)\b", t):
        if int(y) < 1990:
            return True
    return False


def good(c, min_w=800, ar=(0.45, 2.4)):
    if c["mime"] != "image/jpeg" or not c["thumb"]:
        return False
    if blocked(c):
        return False
    if c["w"] < min_w or c["h"] == 0:
        return False
    r = c["w"] / c["h"]
    return ar[0] <= r <= ar[1]


def pick(query, used):
    data = api_search(query)
    cands = candidates(data)
    # First pass: strict quality.
    for c in cands:
        if c["thumb"] in used:
            continue
        if good(c):
            return c
    # Relax: allow smaller / wider, still a non-blocked jpeg.
    for c in cands:
        if c["thumb"] in used:
            continue
        if c["mime"] == "image/jpeg" and c["thumb"] and c["w"] >= 500 and not blocked(c):
            return c
    return None


def main():
    # Resume: keep anything already harvested.
    try:
        with open("scripts/images.json", encoding="utf-8") as f:
            result = json.load(f)
    except FileNotFoundError:
        result = {}
    used = set(result.values())
    misses = []
    for key, query in ITEMS:
        if key in result:
            print(f"SKIP {key:34s} (already have)")
            continue
        try:
            c = pick(query, used)
            if not c and key in SECONDARY:
                time.sleep(1.2)
                c = pick(SECONDARY[key], used)
        except Exception as e:  # noqa: BLE001
            c = None
            print(f"ERR  {key!r} ({query!r}): {e}")
        if c:
            result[key] = c["thumb"]
            used.add(c["thumb"])
            print(f"OK   {key:34s} {c['w']}x{c['h']:<5} {c['title']}")
            # Persist incrementally so throttling never loses progress.
            with open("scripts/images.json", "w", encoding="utf-8") as f:
                json.dump(result, f, indent=2, ensure_ascii=False)
        else:
            misses.append((key, query))
            print(f"MISS {key:34s} ({query})")
        time.sleep(1.2)

    with open("scripts/images.json", "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"\nGot {len(result)}/{len(ITEMS)} images. Misses: {misses}")


if __name__ == "__main__":
    main()
