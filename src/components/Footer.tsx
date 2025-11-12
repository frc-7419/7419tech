import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-2 md:py-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Link href="/">

              <div className="flex items-center ml-28">
            <span className="text-3xl font-bold text-[hsl(var(--brand-gold))] mr-3">Team</span>
            <Image 
              width="48" 
              height="48" 
              src="/Logo.png" 
              alt="7419 Logo"
              className="rounded-full transition-transform duration-200 hover:scale-105" 
            />
          </div>
            </Link>
            <Separator
              orientation="vertical"
              className="hidden h-4 md:inline-block"
            />
          </div>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:underline text-gray-50 "
            >
              Contact Us
            </Link>
          </div>
          
        </div>
</div>
    </footer>
  );
}
