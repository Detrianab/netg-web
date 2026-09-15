import co2 from "@/assets/product-co2.png.asset.json";
import dol53 from "@/assets/product-4.png.asset.json";
import fujikura from "@/assets/product-7.png.asset.json";
import gateway from "@/assets/product-6.png.asset.json";
import probe4xt from "@/assets/product-3.png.asset.json";
import transmitter from "@/assets/product-5.png.asset.json";

export const PRODUCT_IMAGES: Record<string, string> = {
  "gateway-pro": gateway.url,
  "sensor-co2-temperatura": co2.url,
  "sonda-4xt": probe4xt.url,
  "transmisor-0-10v": transmitter.url,
  "sensor-amoniaco-dol-53": dol53.url,
  "fujikura-96s": fujikura.url,
};

export function productImage(slug: string) {
  return PRODUCT_IMAGES[slug];
}
