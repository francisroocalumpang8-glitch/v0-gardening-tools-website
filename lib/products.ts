import { categoryImages, toolImages } from "./product-images";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
}

// ---------------------------------------------------------------------------
// Product catalog
//
// Each category below is expanded to 50 products (300 total) by combining a
// set of base items with a set of variants. Every product gets a picture that
// is matched to its name via a keyword image service, so the photo reflects
// the actual item (e.g. a "Pro Garden Trowel" shows a garden trowel).
// ---------------------------------------------------------------------------

interface BaseItem {
  // Core noun, e.g. "Garden Trowel"
  name: string;
  // Comma-separated keywords used to fetch a matching photo
  keywords: string;
  // Base (Classic) price in USD
  price: number;
  // Short marketing description
  description: string;
}

interface CategoryDef {
  name: string;
  slug: string;
  items: BaseItem[];
}

// 5 variants -> with 10 base items each gives exactly 50 products per category.
const VARIANTS = [
  { label: "Classic", mult: 1.0 },
  { label: "Pro", mult: 1.3 },
  { label: "Premium", mult: 1.7 },
  { label: "Heavy-Duty", mult: 1.45 },
  { label: "Compact", mult: 0.8 },
] as const;

const CATEGORY_DEFS: CategoryDef[] = [
  {
    name: "Hand Tools",
    slug: "hand-tools",
    items: [
      { name: "Garden Trowel", keywords: "garden,trowel", price: 24, description: "Ergonomic stainless steel trowel with comfort grip handle." },
      { name: "Hand Weeder", keywords: "garden,weeding,tool", price: 18, description: "Sharp forked tip for easy, root-deep weed removal." },
      { name: "Garden Fork", keywords: "garden,fork,tool", price: 34, description: "Sturdy tines for turning soil and lifting roots." },
      { name: "Cultivator Rake", keywords: "garden,cultivator,rake", price: 22, description: "Three-prong cultivator for loosening and aerating soil." },
      { name: "Transplanting Spade", keywords: "garden,spade,shovel", price: 28, description: "Narrow blade ideal for transplanting seedlings." },
      { name: "Bulb Planter", keywords: "garden,bulb,planting", price: 16, description: "Quick bulb planting with built-in depth gauge." },
      { name: "Garden Hoe", keywords: "garden,hoe,tool", price: 19, description: "Compact hoe for weeding tight spaces and containers." },
      { name: "Wooden Dibber", keywords: "garden,seedling,planting", price: 12, description: "Traditional wooden dibber for precise seed planting." },
      { name: "Soil Scoop", keywords: "garden,soil,scoop", price: 26, description: "Deep scoop for potting, mulching, and transplanting." },
      { name: "Hori Hori Knife", keywords: "garden,knife,tool", price: 32, description: "Japanese-style soil knife for digging and cutting." },
    ],
  },
  {
    name: "Power Tools",
    slug: "power-tools",
    items: [
      { name: "Hedge Trimmer", keywords: "hedge,trimmer,garden", price: 149, description: "Cordless 20V trimmer with a 22-inch dual-action blade." },
      { name: "Lawn Edger", keywords: "lawn,edger,garden", price: 89, description: "Electric edger for crisp, clean lawn borders." },
      { name: "Leaf Blower", keywords: "leaf,blower,garden", price: 129, description: "Powerful brushless motor in a lightweight body." },
      { name: "Garden Tiller", keywords: "garden,tiller,soil", price: 170, description: "Electric tiller with adjustable tilling depth." },
      { name: "Pruning Saw", keywords: "pruning,saw,garden", price: 79, description: "Cordless saw for branches up to 4 inches thick." },
      { name: "Chainsaw", keywords: "chainsaw,garden,wood", price: 160, description: "16-inch bar with automatic chain oiling." },
      { name: "Garden Shredder", keywords: "garden,shredder,mulch", price: 175, description: "Quiet roller shredder mulches branches to 1.5 inches." },
      { name: "Grass Trimmer", keywords: "grass,trimmer,garden", price: 69, description: "Adjustable head with a 12-inch cutting width." },
      { name: "Cordless Drill", keywords: "cordless,drill,tool", price: 95, description: "Compact drill for garden builds and repairs." },
      { name: "Pressure Washer", keywords: "pressure,washer,cleaning", price: 150, description: "High-pressure washer for patios, decks, and tools." },
    ],
  },
  {
    name: "Watering",
    slug: "watering",
    items: [
      { name: "Garden Hose 50ft", keywords: "garden,hose,water", price: 44, description: "Kink-resistant, drinking-water-safe 50ft hose." },
      { name: "Spray Nozzle", keywords: "garden,hose,nozzle", price: 18, description: "Ten spray patterns with easy thumb control." },
      { name: "Oscillating Sprinkler", keywords: "garden,sprinkler,water", price: 29, description: "Even coverage for up to 3,600 sq ft." },
      { name: "Drip Irrigation Kit", keywords: "drip,irrigation,garden", price: 54, description: "Complete 100ft system with built-in timer." },
      { name: "Watering Can", keywords: "watering,can,garden", price: 24, description: "Galvanized steel can with a detachable rose." },
      { name: "Hose Reel Cart", keywords: "garden,hose,reel", price: 79, description: "Rolling cart that holds up to 200ft of hose." },
      { name: "Soaker Hose", keywords: "soaker,hose,garden", price: 32, description: "Porous hose for slow, deep-root watering." },
      { name: "Water Timer", keywords: "garden,water,timer", price: 38, description: "Programmable dual-outlet digital water timer." },
      { name: "Rain Barrel", keywords: "rain,barrel,water", price: 89, description: "UV-resistant 50-gallon barrel with spigot." },
      { name: "Plant Mister", keywords: "plant,mister,spray", price: 14, description: "Fine-mist sprayer for delicate indoor plants." },
    ],
  },
  {
    name: "Planting",
    slug: "planting",
    items: [
      { name: "Seed Starting Tray", keywords: "seed,tray,seedling", price: 16, description: "72-cell tray with a clear humidity dome." },
      { name: "Potting Soil Mix", keywords: "potting,soil,garden", price: 22, description: "Premium 40qt blend for containers and pots." },
      { name: "Grow Light", keywords: "grow,light,plant", price: 69, description: "Full-spectrum LED panel with adjustable height." },
      { name: "Plant Labels", keywords: "plant,label,garden", price: 9, description: "Weatherproof markers, 100-pack." },
      { name: "Seedling Heat Mat", keywords: "seedling,germination,plant", price: 34, description: "Waterproof 10x20-inch warming mat." },
      { name: "Compost Bin", keywords: "compost,bin,garden", price: 119, description: "Dual-chamber tumbler for fast composting." },
      { name: "Raised Bed Kit", keywords: "raised,bed,garden", price: 149, description: "Cedar 4x8 raised bed with tool-free assembly." },
      { name: "Plant Support Stakes", keywords: "plant,stake,garden", price: 19, description: "36-inch bamboo stakes, 50-pack." },
      { name: "Propagation Pots", keywords: "plant,pot,seedling", price: 15, description: "Biodegradable starter pots, 50-pack." },
      { name: "Garden Kneeler", keywords: "garden,kneeler,knee", price: 39, description: "Padded kneeler that flips into a sturdy seat." },
    ],
  },
  {
    name: "Pruning",
    slug: "pruning",
    items: [
      { name: "Bypass Pruning Shears", keywords: "pruning,shears,garden", price: 29, description: "SK5 steel blade with an ergonomic non-slip grip." },
      { name: "Hedge Shears", keywords: "hedge,shears,garden", price: 42, description: "8-inch wavy blade with shock-absorbing bumpers." },
      { name: "Lopper", keywords: "lopper,pruning,garden", price: 54, description: "24-inch loppers cut branches up to 2 inches." },
      { name: "Folding Pruning Saw", keywords: "pruning,saw,garden", price: 28, description: "Triple-cut teeth in a safe folding design." },
      { name: "Pole Pruner", keywords: "pole,pruner,tree", price: 79, description: "Extendable pruner reaches up to 14 feet." },
      { name: "Topiary Shears", keywords: "topiary,shears,garden", price: 36, description: "Single-hand shears for precise topiary work." },
      { name: "Anvil Pruner", keywords: "anvil,pruner,garden", price: 26, description: "Anvil action powers through dry, woody stems." },
      { name: "Garden Scissors", keywords: "garden,scissors,snips", price: 14, description: "Precision snips for harvesting and deadheading." },
      { name: "Ratchet Pruner", keywords: "ratchet,pruner,garden", price: 31, description: "Ratcheting mechanism multiplies cutting power." },
      { name: "Pruning Knife", keywords: "pruning,knife,garden", price: 22, description: "Curved blade for grafting and clean cuts." },
    ],
  },
  {
    name: "Lawn Care",
    slug: "lawn-care",
    items: [
      { name: "Reel Mower", keywords: "lawn,mower,grass", price: 159, description: "Eco-friendly push reel mower, 18-inch cut." },
      { name: "Aerator Shoes", keywords: "lawn,aerator,grass", price: 24, description: "Spiked strap-on shoes that aerate as you walk." },
      { name: "Broadcast Spreader", keywords: "lawn,spreader,fertilizer", price: 89, description: "12,000 sq ft capacity with pneumatic tires." },
      { name: "Lawn Roller", keywords: "lawn,roller,grass", price: 74, description: "Fillable drum roller, tow or push." },
      { name: "Dethatching Rake", keywords: "lawn,rake,thatch", price: 34, description: "Curved tines lift thatch over a 15-inch width." },
      { name: "Grass Seed Spreader", keywords: "grass,seed,spreader", price: 29, description: "Hand-held spreader with adjustable flow." },
      { name: "Lawn Sprinkler", keywords: "lawn,sprinkler,water", price: 27, description: "Impact sprinkler covers large lawns evenly." },
      { name: "Edging Shears", keywords: "lawn,edging,shears", price: 33, description: "Long-handle shears for tidy lawn edges." },
      { name: "Leaf Rake", keywords: "leaf,rake,lawn", price: 21, description: "Wide spring-tine rake for fast leaf clean-up." },
      { name: "Lawn Fertilizer", keywords: "lawn,fertilizer,grass", price: 36, description: "Slow-release feed for a thick, green lawn." },
    ],
  },
];

// Deterministic pseudo-random in [0, 1) seeded by an integer. Using Math.sin
// keeps results identical on server and client (no hydration mismatch) while
// still varying per product.
function seeded(n: number): number {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

function imageFor(slug: string, baseName: string): string {
  // Curated HD photo for this exact tool, else the category photo as fallback.
  return toolImages[`${slug}:${baseName}`] ?? categoryImages[slug] ?? "/placeholder.jpg";
}

function badgeFor(id: number): string | undefined {
  const r = seeded(id * 5);
  if (r > 0.92) return "Best Seller";
  if (r > 0.85) return "Premium";
  if (r > 0.78) return "Top Rated";
  return undefined;
}

function buildProducts(): Product[] {
  const result: Product[] = [];
  let id = 1;

  for (const cat of CATEGORY_DEFS) {
    for (const item of cat.items) {
      for (const variant of VARIANTS) {
        const name = `${variant.label} ${item.name}`;
        const price = Math.round(item.price * variant.mult) - 0.01;
        const rating = Number((4.1 + Math.round(seeded(id * 7) * 8) / 10).toFixed(1));
        const reviews = 30 + Math.floor(seeded(id * 13) * 420);
        const inStock = seeded(id * 3) > 0.06;

        result.push({
          id,
          name,
          price: Number(price.toFixed(2)),
          category: cat.slug,
          description: item.description,
          image: imageFor(cat.slug, item.name),
          rating,
          reviews,
          inStock,
          badge: badgeFor(id),
        });
        id++;
      }
    }
  }

  return result;
}

export const products: Product[] = buildProducts();

export const categories = CATEGORY_DEFS.map((cat) => ({
  name: cat.name,
  slug: cat.slug,
  count: products.filter((p) => p.category === cat.slug).length,
}));

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
}
