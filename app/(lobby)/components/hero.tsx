import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="hero"
      className="flex w-full flex-col items-center justify-center gap-4 text-center"
    >
      <header className="mt-10 flex flex-col items-center gap-4">
        <Badge className="shadow duration-500 ease-out animate-in fade-in-0 zoom-in-50 slide-in-from-bottom-1/2">
          ✨ Your Workspace, Perfected
        </Badge>

        <h1 className="mt-4 font-heading text-4xl font-bold duration-500 ease-out animate-in fade-in-0 zoom-in-50 slide-in-from-bottom-1/2 [text-shadow:_0_4px_0_#e1e1e1] dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent dark:[text-shadow:none] md:text-7xl">
          All-In-One Collaboration and Productivity Platform
        </h1>

        <h2 className="max-w-xl text-lg text-muted-foreground duration-500 ease-out animate-in fade-in-0 zoom-in-50 slide-in-from-bottom-1/2">
          A Note Taking app built using{" "}
          <ExternalLink href="https://nextjs.org/">
            Next.js (App Router)
          </ExternalLink>
          ,{" "}
          <ExternalLink href="https://www.typescriptlang.org/">
            Typescript
          </ExternalLink>
          ,{" "}
          <ExternalLink href="https://tailwindcss.com/">
            Tailwind CSS
          </ExternalLink>
          , <ExternalLink href="https://ui.shadcn.com/">shadcn/ui</ExternalLink>
          ,{" "}
          <ExternalLink href="https://orm.drizzle.team/">
            Drizzle ORM
          </ExternalLink>{" "}
          & more!
        </h2>
      </header>

      <Image
        priority
        fetchPriority="high"
        loading="eager"
        src="/illustrations/appBanner.png"
        alt="Home Office"
        width={5000}
        height={5000}
        className="drop-shadow-xl duration-500 ease-out animate-in fade-in-0 zoom-in-50 slide-in-from-bottom-1/2 "
      />
    </section>
  );
}

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
};

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium underline-offset-4 transition-colors hover:text-foreground hover:underline"
  >
    {children}
  </a>
);
