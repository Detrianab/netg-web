import { Link } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SITE } from "@/data/site";
import { useI18n } from "@/i18n";

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/nosotros", label: t.nav.about },
    { to: "/portafolios", label: t.nav.portfolios },
    { to: "/soluciones", label: t.nav.solutions },
    { to: "/contacto", label: t.nav.contact },
    { to: "/politicas", label: t.nav.policies },
  ] as const;


  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="shrink-0" aria-label={t.nav.home}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="relative text-sm font-medium text-foreground/80 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:text-primary hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href={`tel:+${SITE.whatsappDigits}`}
            className="hidden items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary md:inline-flex"
          >
            <Phone className="size-4" aria-hidden />
            {t.common.callUs}
          </a>
          <Link
            to="/contacto"
            className="hidden items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-deep sm:inline-flex"
          >
            {t.common.contactUs}
          </Link>


          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex items-center justify-center rounded-md border border-border p-2 lg:hidden"
              aria-label="Menú"
            >
              <Menu className="size-5" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1 px-4">
                {[...links, { to: "/catalogo", label: t.nav.catalog } as const].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: link.to === "/" }}
                    activeProps={{ className: "bg-secondary text-primary" }}
                    className="rounded-md px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
