import fibraImg from "@/assets/portfolio-fibra-optica.jpg";
import instrumentacionImg from "@/assets/portfolio-instrumentacion.jpg";
import monitoreoImg from "@/assets/portfolio-monitoreo-ambiental.jpg";
import rfImg from "@/assets/portfolio-radiofrecuencia.jpg";
import { PRODUCTS, type Product } from "@/data/products";

export const PORTFOLIO_SLUGS = [
  "fibra-optica",
  "radiofrecuencia",
  "monitoreo-ambiental",
  "instrumentacion",
] as const;

export type PortfolioSlug = (typeof PORTFOLIO_SLUGS)[number];

export const PORTFOLIO_IMAGES: Record<PortfolioSlug, string> = {
  "fibra-optica": fibraImg,
  "radiofrecuencia": rfImg,
  "monitoreo-ambiental": monitoreoImg,
  "instrumentacion": instrumentacionImg,
};

export function isPortfolioSlug(slug: string): slug is PortfolioSlug {
  return (PORTFOLIO_SLUGS as readonly string[]).includes(slug);
}

export function portfolioProducts(slug: PortfolioSlug): Product[] {
  return PRODUCTS.filter((product) => product.division === slug);
}
