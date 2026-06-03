"""Download every harvested image (cached, with backoff) and build a single
labeled contact sheet so the picks can be reviewed visually in one pass."""
import json
import os
import time
import urllib.error
import urllib.request

from PIL import Image, ImageDraw

CACHE = os.path.join(os.environ.get("TEMP", "/tmp"), "imgcache")
os.makedirs(CACHE, exist_ok=True)
OUT = os.path.join(os.environ.get("TEMP", "/tmp"), "contact_sheet.png")

TILE = 240
PAD = 6
LABEL_H = 30
COLS = 6


def fetch(url, path):
    if os.path.exists(path) and os.path.getsize(path) > 0:
        return True
    delay = 4
    for _ in range(6):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 sheet"})
            with urllib.request.urlopen(req, timeout=40) as r, open(path, "wb") as f:
                f.write(r.read())
            return True
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(delay)
                delay = min(delay * 2, 40)
                continue
            return False
        except Exception:
            time.sleep(delay)
            delay = min(delay * 2, 40)
    return False


def main():
    data = json.load(open("scripts/images.json", encoding="utf-8"))
    keys = list(data.keys())
    cells = []
    for i, k in enumerate(keys):
        path = os.path.join(CACHE, f"{i:03d}.jpg")
        ok = fetch(data[k], path)
        cells.append((k, path if ok else None))
        print(("OK  " if ok else "FAIL") + f" {k}")
        time.sleep(1.0)

    rows = (len(cells) + COLS - 1) // COLS
    W = COLS * (TILE + PAD) + PAD
    H = rows * (TILE + LABEL_H + PAD) + PAD
    sheet = Image.new("RGB", (W, H), (245, 245, 245))
    draw = ImageDraw.Draw(sheet)

    for idx, (k, path) in enumerate(cells):
        r, c = divmod(idx, COLS)
        x = PAD + c * (TILE + PAD)
        y = PAD + r * (TILE + LABEL_H + PAD)
        if path:
            try:
                im = Image.open(path).convert("RGB")
                im.thumbnail((TILE, TILE))
                ox = x + (TILE - im.width) // 2
                oy = y + (TILE - im.height) // 2
                sheet.paste(im, (ox, oy))
            except Exception:
                draw.rectangle([x, y, x + TILE, y + TILE], fill=(200, 120, 120))
        else:
            draw.rectangle([x, y, x + TILE, y + TILE], fill=(200, 120, 120))
        draw.rectangle([x, y + TILE, x + TILE, y + TILE + LABEL_H], fill=(30, 30, 30))
        label = f"{idx}:{k}"
        if len(label) > 38:
            label = label[:37] + "…"
        draw.text((x + 3, y + TILE + 8), label, fill=(255, 255, 255))

    sheet.save(OUT)
    print("\nSaved", OUT, sheet.size)


if __name__ == "__main__":
    main()
