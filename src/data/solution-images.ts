import cadenaFrio from "@/assets/solution-cadena-frio.jpg";
import calidadAire from "@/assets/solution-calidad-aire.jpg";
import granjas from "@/assets/solution-granjas.jpg";
import horticultura from "@/assets/solution-horticultura.jpg";

export const SOLUTION_IMAGES: Record<string, string> = {
  "calidad-aire": calidadAire,
  granjas,
  horticultura,
  "cadena-frio": cadenaFrio,
};

export function solutionImage(slug: string): string | undefined {
  return SOLUTION_IMAGES[slug];
}
