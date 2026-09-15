import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { productImage } from "@/data/product-images";
import { PORTFOLIO_IMAGES, isPortfolioSlug, portfolioProducts, type PortfolioSlug } from "@/data/portfolios";
import { SITE, whatsappLink } from "@/data/site";
import { useI18n } from "@/i18n";
import { es } from "@/i18n/locales/es";

export const Route = createFileRoute("/portafolios/$slug")({
  loader: ({ params }) => {
    if (!isPortfolioSlug(params.slug)) throw notFound();
    return { slug: params.slug as PortfolioSlug };
  },
  head: ({ params }) => {
    const item = isPortfolioSlug(params.slug) ? es.portfolios.items[params.slug] : null;
    const title = item
      ? `${item.name} | Portafolio de Next G Solutions Telecom`
      : "Portafolio | Next G Solutions Telecom";
    const description = item?.description.slice(0, 155) ?? "Portafolio de equipos para telecomunicaciones.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PortfolioDetail,
});

function PortfolioDetail() {
  const { slug } = Route.useLoaderData();
  const { t, locale } = useI18n();
  const item = t.portfolios.items[slug];
  const products = portfolioProducts(slug);

  return (
    <>
      <section className="relative overflow-hidden bg-primary-deep text-primary-foreground">
        <img
          src={PORTFOLIO_IMAGES[slug]}
          alt={item.name}
          width={1280}
          height={800}
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <div className="container-page relative py-20 md:py-24">
          <Link
            to="/portafolios"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/80 transition-colors hover:text-primary-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t.portfolios.viewAll}
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {item.tagline}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">{item.name}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <p className="text-lg leading-relaxed text-foreground/85">{item.description}</p>
          </Reveal>
          <Reveal delay={120} className="h-fit rounded-lg border border-border bg-surface p-7">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {t.portfolios.scopeTitle}
            </h2>
            <ul className="mt-5 space-y-3">
              {item.scope.map((entry) => (
                <li key={entry} className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {entry}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16">
        <div className="container-page">
          <Reveal>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">{t.portfolios.equipmentTitle}</h2>
          </Reveal>

          {products.length === 0 ? (
            <Reveal delay={80} className="mt-8 max-w-2xl rounded-lg border border-border bg-card p-8">
              <p className="text-muted-foreground">{t.portfolios.empty}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
                >
                  {t.portfolios.emptyCta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <a
                  href={whatsappLink(`Hola, ${SITE.shortName}. Deseo información del portafolio ${item.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  {t.common.whatsapp}
                </a>
              </div>
            </Reveal>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <Reveal key={product.slug} delay={index * 70}>
                  <Link
                    to="/catalogo/$slug"
                    params={{ slug: product.slug }}
                    className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    {productImage(product.slug) ? (
                      <div className="mb-5 flex h-44 items-center justify-center overflow-hidden rounded-md bg-surface p-4">
                        <img
                          src={productImage(product.slug)}
                          alt={`${product.name} — ${product.code}`}
                          loading="lazy"
                          className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) : null}
                    <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {t.catalog.productCode}: {product.code}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {product.short[locale]}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      {t.common.specifications}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          <Link
            to="/catalogo"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            {t.catalog.title}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
