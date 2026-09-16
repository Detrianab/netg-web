import { cn } from "@/lib/utils";

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <img
      src="/nextg-logo.png"
      alt="Next G Solutions Telecom, C.A."
      width={600}
      height={240}
      className={cn("h-11 w-auto object-contain md:h-12", inverted && "brightness-0 invert", className)}
    />
  );
}

export default Logo;
