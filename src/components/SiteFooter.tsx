import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Clock } from "lucide-react";

import { Logo } from "@/components/Logo";
import { SITE } from "@/data/site";
import { useI18n } from "@/i18n";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t.home.subtitle}
          </p>
          <ul className="mt-6 space-y-2 text-sm text-foreground/85">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {SITE.addressLine}
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <a className="hover:text-primary" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <a
                className="hover:text-primary"
                href={`https://wa.me/${SITE.whatsappDigits}`}
                target="_blank"
                rel="noreferrer"
              >
                {SITE.whatsapp}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {t.common.hoursValue}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            {t.nav.home}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[
              { to: "/nosotros", label: t.nav.about },
              { to: "/portafolios", label: t.nav.portfolios },
              { to: "/soluciones", label: t.nav.solutions },
              { to: "/catalogo", label: t.nav.catalog },
              { to: "/contacto", label: t.nav.contact },
              { to: "/politicas", label: t.nav.policies },
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. {t.common.rights}
          </p>
          <Link to="/auth" className="transition-colors hover:text-primary">
            {t.nav.admin}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
