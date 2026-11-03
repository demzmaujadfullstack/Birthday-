"use client";

import { storyChapters } from "@/data/timeline";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function StorySection() {
  return (
    <section id="story" className="relative overflow-hidden bg-cream py-28 text-midnight sm:py-36 lg:py-44" aria-labelledby="story-title">
      <div className="pointer-events-none absolute -right-24 top-20 font-serif text-[24rem] leading-none text-burgundy/[0.025]" aria-hidden="true">Us</div>
      <div className="section-shell relative">
        <ScrollReveal>
          <div id="story-title">
            <SectionHeading
              dark
              kicker="03 · Our story"
              title="Every chapter,"
              italic="still my favorite."
              description="Not just the milestones, but all the little moments in between—the ones that quietly became our story."
            />
          </div>
        </ScrollReveal>

        <div className="relative mt-20 sm:mt-28">
          <div className="absolute bottom-0 left-[11px] top-0 w-px bg-burgundy/20 sm:left-1/2" aria-hidden="true" />
          <ol className="space-y-16 sm:space-y-24">
            {storyChapters.map((chapter, index) => (
              <li key={chapter.number} className="relative grid pl-12 sm:grid-cols-2 sm:gap-20 sm:pl-0 lg:gap-32">
                <span className="absolute left-[5px] top-2 h-[13px] w-[13px] rotate-45 border border-burgundy bg-cream sm:left-[calc(50%-6px)]" aria-hidden="true" />
                <ScrollReveal
                  className={index % 2 === 0 ? "sm:col-start-1 sm:text-right" : "sm:col-start-2"}
                  distance={24}
                >
                  <div className="sm:pt-1">
                    <div className={`flex items-center gap-4 ${index % 2 === 0 ? "sm:justify-end" : ""}`}>
                      <span className="font-serif text-2xl italic text-burgundy/35">{chapter.number}</span>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-burgundy/60">{chapter.date}</span>
                    </div>
                    <h3 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">{chapter.title}</h3>
                    <p className={`mt-4 max-w-md text-sm leading-7 text-midnight/60 ${index % 2 === 0 ? "sm:ml-auto" : ""}`}>
                      {chapter.description}
                    </p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
