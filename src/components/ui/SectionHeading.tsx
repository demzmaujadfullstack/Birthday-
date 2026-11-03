import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  italic?: string;
  description?: string;
  dark?: boolean;
  align?: "left" | "center";
};

export function SectionHeading({ kicker, title, italic, description, dark, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className={cn("section-kicker", align === "center" && "justify-center", dark && "text-burgundy")}>{kicker}</p>
      <h2 className={cn("display-title mt-7 text-[clamp(3.4rem,8vw,7.4rem)]", dark && "text-midnight")}>
        {title}
        {italic && <><br /><em className={cn("font-normal", dark ? "text-burgundy" : "text-rose")}>{italic}</em></>}
      </h2>
      {description && (
        <p className={cn("mt-7 max-w-xl text-sm leading-7 text-cream/55 sm:text-base", align === "center" && "mx-auto", dark && "text-midnight/60")}>
          {description}
        </p>
      )}
    </div>
  );
}
