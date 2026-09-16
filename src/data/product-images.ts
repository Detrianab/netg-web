export const PRODUCT_IMAGES: Record<string, string> = {
  "gateway-pro": "/product-6.png",
  "sensor-co2-temperatura": "/product-co2.jpg",
  "sonda-4xt": "/product-3.png",
  "transmisor-0-10v": "/product-5.png",
  "sensor-amoniaco-dol-53": "/product-4.png",
  "fujikura-96s": "/product-7.png",
};

export function productImage(slug: string) {
  return PRODUCT_IMAGES[slug];
}