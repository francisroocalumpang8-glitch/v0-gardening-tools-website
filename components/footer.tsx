import Link from "next/link";
import Image from "next/image";
import {
  Leaf,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const quickLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const categoryLinks = [
  { label: "Hand Tools", href: "/shop?category=hand-tools" },
  { label: "Power Tools", href: "/shop?category=power-tools" },
  { label: "Watering", href: "/shop?category=watering" },
  { label: "Planting", href: "/shop?category=planting" },
];

const socials = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Youtube, label: "YouTube" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-white">
      {/* Garden background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about-garden.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-neutral-950/85" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
      </div>

      <div className="relative z-10">
        {/* Newsletter strip */}
        <div className="border-b border-white/10">
          <div className="container mx-auto px-4 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <h3 className="text-xl font-bold">Join our gardening community</h3>
              <p className="text-white/70 text-sm mt-1">
                Seasonal tips, growing guides, and exclusive deals — straight to
                your inbox.
              </p>
            </div>
            <form className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                className="rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground transition hover:opacity-90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Main columns */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <Leaf className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Roro Gardening Tools</span>
              </Link>
              <p className="text-sm text-white/70">
                Quality gardening tools for professionals and enthusiasts.
                Growing gardens, growing communities since 2010.
              </p>
              <div className="flex gap-3">
                {socials.map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/70 transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="mb-4 font-semibold">Categories</h3>
              <ul className="space-y-2">
                {categoryLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/70 transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-4 font-semibold">Contact</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>123 Garden Street, Greenville, CA 94102</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span>hello@rorogardening.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row">
            <p>&copy; {year} Roro Gardening Tools. All rights reserved.</p>
            <div className="flex gap-5">
              <Link href="/about" className="transition-colors hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/about" className="transition-colors hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
