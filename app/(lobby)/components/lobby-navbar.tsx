import Link from "next/link";

import { Logo } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function LobbyNavbar() {
  return (
    <header className="mt-3 h-14">
      <nav className="container flex h-full items-center justify-between">
        <Link
          href="/"
          className="flex gap-2 px-4 font-handwriting text-3xl [text-shadow:_0_2px_0_#e1e1e1] dark:[text-shadow:none]"
        >
          <Logo size={28} />
          DeskCollab
        </Link>

        <div className="hidden space-x-4 px-5 text-sm font-medium text-muted-foreground md:inline-block">
          <Link
            href="/#features"
            className="transition-colors hover:text-foreground"
          >
            Features
          </Link>
        </div>

        <div className="flex flex-1 justify-end gap-2">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "hidden h-8 rounded-full px-5 font-semibold transition-all duration-200 hover:ring-2 hover:ring-border hover:ring-offset-2 hover:ring-offset-background sm:inline-flex"
            )}
          >
            Login
          </Link>

          <Link
            href="/signup"
            className={cn(
              buttonVariants(),
              "h-8 rounded-full px-3 font-semibold transition-all duration-200 hover:ring-2 hover:ring-foreground hover:ring-offset-2 hover:ring-offset-background"
            )}
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
