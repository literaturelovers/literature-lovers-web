import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => (
  <footer className="bg-[#444444] grid grid-cols-1 sm:grid-cols-2 text-white py-6 px-4">
    <div></div>
    <div className="flex flex-col">
      <p className="text-base font-bold">Have a query?</p>
      <p className="text-sm font-normal">Contact us and we will get back to you on your number</p>
      <div className="flex items-center gap-5 mt-5">
        <Link href="/contact-us">
          <Button size="sm" variant="customprimarybtn" className="text-base font-normal px-3 md:px-6 py-2 md:py-4">
              Contact Us
          </Button>
        </Link>
        <Link href="/privacy-policy">
          <Button size="sm" variant="customprimarybtn" className="text-base font-normal px-3 md:px-6 py-2 md:py-4">
              View Privacy Policy
          </Button>
        </Link>
      </div>
    </div>
  </footer>
);
