import LandingLayout from "@/components/landing/LandingLayout";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CallToActionSection from "@/components/landing/CallToActionSection";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function RootPage() {
  return (
    <LandingLayout>
      <nav className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Literature Lovers"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="text-lg font-semibold tracking-tight">
              Literature Lovers
            </span>
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              <Button variant="ghost">
                Home
              </Button>
            </Link>
            <Link href="/e-books" className="text-gray-700 hover:text-gray-900">
              <Button variant="ghost">
                E‑books
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </LandingLayout>
  );
}
