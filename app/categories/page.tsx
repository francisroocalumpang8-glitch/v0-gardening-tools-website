import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories, products } from "@/lib/products";
import { categoryImages } from "@/lib/product-images";

export default function CategoriesPage() {
  const getCategoryImage = (slug: string) =>
    categoryImages[slug] ?? "/placeholder.jpg";

  const getCategoryDescription = (slug: string) => {
    const descriptions: Record<string, string> = {
      "hand-tools":
        "Essential hand tools for everyday gardening tasks. From trowels to rakes, find the perfect grip for your garden.",
      "power-tools":
        "Electric and battery-powered tools for efficient garden maintenance. Save time and effort with our premium selection.",
      watering:
        "Keep your plants hydrated with our range of hoses, sprinklers, and irrigation systems designed for any garden size.",
      planting:
        "Everything you need to start and grow healthy plants. Seed trays, soil, grow lights, and more.",
      pruning:
        "Professional-grade pruning tools for shaping and maintaining your garden. Sharp, durable, and ergonomic.",
      "lawn-care":
        "Maintain a lush, healthy lawn with our specialized equipment. Mowers, aerators, and spreaders.",
    };
    return descriptions[slug];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header banner */}
      <div className="relative overflow-hidden rounded-2xl mb-12">
        <Image
          src="/images/hero-garden.jpg"
          alt="Lush garden"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        <div className="relative z-10 px-6 py-16 md:py-24 text-center">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-md">
            Shop by Category
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow">
            Browse our carefully curated categories to find exactly what you need
            for your garden
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/shop?category=${category.slug}`}
            className="group"
          >
            <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={getCategoryImage(category.slug)}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {category.name}
                  </h2>
                  <p className="text-white/80 text-sm">
                    {category.count} Products
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  {getCategoryDescription(category.slug)}
                </p>
                <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                  <span>Shop {category.name}</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Popular Products Section */}
      <div className="bg-secondary rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Popular Across Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products
            .filter((p) => p.badge)
            .slice(0, 6)
            .map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-card rounded-lg p-3 text-center hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square rounded-md overflow-hidden mb-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-primary font-semibold mt-1">
                  ${product.price.toFixed(2)}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
