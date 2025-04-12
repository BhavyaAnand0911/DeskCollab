import Image from "next/image";

export function Features() {
  return (
    <section id="features" className="container space-y-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent sm:text-3xl md:text-6xl">
          Keep track of your meetings all in one place
        </h2>

        <p className="max-w-[85%] text-muted-foreground sm:text-lg">
          Capture your ideas, thoughts, and meeting notes in a structured and
          organized manner.
        </p>
      </div>

      <div className="relative mx-auto h-96 rounded-md border-2 border-dashed md:w-[44rem]">
        <div className="absolute inset-2 flex items-center justify-center rounded-md bg-muted text-center font-handwriting text-2xl md:text-4xl">
        <Image
        priority
        fetchPriority="high"
        loading="eager"
        src="/illustrations/cal.png"
        alt="Home Office"
        width={1000}
        height={1000}
        className="drop-shadow-xl duration-500 ease-out animate-in fade-in-0 zoom-in-50 slide-in-from-bottom-1/2 "
      />
        </div>
      </div>
    </section>
  );
}
