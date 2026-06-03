import Image from "next/image";
import { Leaf, Users, Award, Heart, Target, Globe } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "50K+", label: "Happy Customers" },
    { value: "500+", label: "Products" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  const founder = {
    name: "Francis Roo Calumpang",
    role: "Founder & CEO",
    image: "/images/founder.jpg",
    bio: "With over a decade of passion for gardening and sustainable living, Francis founded Roro Gardening Tools with a vision to make quality gardening accessible to everyone. His commitment to excellence and customer satisfaction has driven the company to become a trusted name in the industry.",
  };

  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "We prioritize eco-friendly materials and sustainable manufacturing practices in all our products.",
    },
    {
      icon: Award,
      title: "Quality",
      description:
        "Every tool is crafted to the highest standards, ensuring durability and performance for years.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "Our love for gardening drives us to create tools that make your gardening experience joyful.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "We believe in building a community of gardeners who share knowledge and grow together.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about-garden.jpg"
            alt="Beautiful garden with plants"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/25" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm text-white ring-1 ring-white/30 rounded-full text-sm font-medium">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white text-balance drop-shadow-md">
              Growing Gardens, Growing Communities
            </h1>
            <p className="text-lg text-white/90 drop-shadow">
              Founded in 2010, Roro Gardening Tools started with a simple
              mission: to provide gardeners with the best tools to nurture
              their green spaces. What began as a small family workshop has
              grown into a trusted name in gardening equipment.
            </p>
            <p className="text-white/80 drop-shadow">
              Today, we serve over 50,000 customers worldwide, from hobbyist
              gardeners to professional landscapers. Our commitment to
              quality, sustainability, and customer satisfaction remains at
              the heart of everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground">
              To empower gardeners of all levels with high-quality, sustainable
              tools that make gardening more accessible, enjoyable, and
              rewarding. We believe that everyone deserves the joy of watching
              something grow, and we&apos;re here to help make that happen.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card rounded-xl p-6 text-center"
              >
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Meet the Founder
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The vision behind Roro Gardening Tools
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-square md:aspect-auto">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {founder.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">{founder.role}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Globe className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Serving Gardeners Worldwide
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            From our headquarters in California, we ship to over 30 countries,
            bringing quality gardening tools to green thumbs around the globe.
            Wherever you are, we&apos;re here to help your garden thrive.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              "United States",
              "Canada",
              "United Kingdom",
              "Australia",
              "Germany",
              "France",
              "Japan",
              "And More...",
            ].map((country) => (
              <span
                key={country}
                className="px-4 py-2 bg-primary-foreground/10 rounded-full"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
