export const SITE = {
  name: "Next G Solutions Telecom, C.A.",
  shortName: "NextG",
  tagline: "Telecommunications Solutions",
  email: "a.luzardo@ngstelecom.com.ve",
  whatsapp: "+58 414-3004421",
  whatsappDigits: "584143004421",
  website: "www.ngstelecom.com.ve",
  addressLine: "Caracas, Distrito Capital, Venezuela",
  mapQuery: "Caracas, Distrito Capital, Venezuela",
  founded: 2005,
  social: [
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/ngstelecom" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/ngstelecom" },
    { id: "facebook", label: "Facebook", href: "https://www.facebook.com/ngstelecom" },
    { id: "x", label: "X", href: "https://x.com/ngstelecom" },
    { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@ngstelecom" },
  ],
} as const;

export const CLIENTS = [
  "DIGITEL",
  "TELEFÓNICA",
  "AirTEK",
  "THUNDERNET",
  "INGYPRO",
  "SUCRENET",
] as const;

export const PARTNERS = [
  "Aranet",
  "SAF Tehnika",
  "Fujikura",
  "dol-sensors",
  "AFL",
  "Fluke Networks",
] as const;

export function whatsappLink(text: string) {
  return `https://wa.me/${SITE.whatsappDigits}?text=${encodeURIComponent(text)}`;
}
