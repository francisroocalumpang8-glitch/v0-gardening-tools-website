import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Shield, Leaf, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { products, categories } from "@/lib/products";
import { categoryImages } from "@/lib/product-images";

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.badge).slice(0, 4);
  const newArrivals = products.slice(0, 8);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex items-center min-h-[560px] md:min-h-[640px]">
        {/* Garden background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-garden.jpg"
            alt="Lush green garden with plants and gardening tools"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Readability + garden tint overlays (theme-independent) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/15" />
          <div className="absolute inset-0 bg-primary/25 mix-blend-multiply" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/15 backdrop-blur-sm text-white rounded-full text-sm font-medium ring-1 ring-white/30">
              <Leaf className="h-4 w-4" />
              Quality Since 2010
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance drop-shadow-md">
              Grow Your Garden with the Right Tools
            </h1>
            <p className="text-lg text-white/90 max-w-lg text-pretty drop-shadow">
              Discover our curated collection of premium gardening tools
              designed for both professionals and home gardeners. Quality
              craftsmanship meets modern design.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-white/10 text-white border-white/40 backdrop-blur-sm hover:bg-white/20 hover:text-white"
              >
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/tools-display.jpg"
                alt="Premium gardening tools display"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Choose Roro Gardening Tools?
              </h2>
              <p className="text-muted-foreground mb-6">
                At Roro, we believe every gardener deserves access to premium quality tools. 
                Our products are carefully curated to ensure durability, comfort, and 
                outstanding performance for all your gardening needs.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Truck,
                    title: "Free Shipping",
                    desc: "On orders over $50",
                  },
                  {
                    icon: Shield,
                    title: "2-Year Warranty",
                    desc: "On all products",
                  },
                  {
                    icon: Leaf,
                    title: "Eco-Friendly",
                    desc: "Sustainable materials",
                  },
                  {
                    icon: Phone,
                    title: "Expert Support",
                    desc: "Garden advice 24/7",
                  },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="flex items-center gap-4 p-4 rounded-lg bg-secondary"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find the perfect tools for every gardening task
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-muted"
              >
                <Image
                  src={categoryImages[category.slug] ?? "/placeholder.jpg"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {category.count} Products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Our most popular gardening essentials
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/shop">View All</Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-accent text-accent"
                />
              ))}
            </div>
            <blockquote className="text-2xl font-medium text-foreground mb-6 text-balance">
              {'"'}Roro Gardening Tools has transformed my gardening experience.
              The quality is exceptional, and my garden has never looked
              better!{'"'}
            </blockquote>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">
                Maria Santos
              </span>{" "}
              — Verified Customer
            </p>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                New Arrivals
              </h2>
              <p className="text-muted-foreground">
                The latest additions to our collection
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/shop">View All</Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-balance">
            Ready to Start Your Garden Journey?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of happy gardeners who trust Roro for their gardening
            needs. Subscribe for exclusive deals and gardening tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 flex-1"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
