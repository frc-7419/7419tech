import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Link href="/">
              <span className="text-lg font-bold pl-4">FRC 7419</span>
            </Link>
            <Separator
              orientation="vertical"
              className="hidden h-4 md:inline-block"
            />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2024 QLS Tech Support. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:underline"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
