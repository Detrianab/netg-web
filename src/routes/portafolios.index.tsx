import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { PORTFOLIO_IMAGES, PORTFOLIO_SLUGS, portfolioProducts } from "@/data/portfolios";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/portafolios/")({
  head: () => ({
    meta: [
      { title: "Portafolios de equipos | Next G Solutions Telecom" },
      {
        name: "description",
        content:
          "Fibra óptica, radiofrecuencia, monitoreo ambiental e instrumentación electrónica: nuestro catálogo de equipos organizado por especialidad técnica.",
      },
      { property: "og:title", content: "Portafolios de equipos | Next G Solutions Telecom" },
      {
        property: "og:description",
        content: "Catálogo corporativo por portafolios técnicos para operadores, integradores y contratistas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfoliosIndex,
});

function PortfoliosIndex() {
  const { t } = useI18n();

  return (
    <>
      <PageHero title={t.portfolios.title} subtitle={t.portfolios.subtitle} />

      <section className="py-16">
        <div className="container-page grid gap-8 md:grid-cols-2">
          {PORTFOLIO_SLUGS.map((slug, index) => {
            const item = t.portfolios.items[slug];
            const count = portfolioProducts(slug).length;
            return (
              <Reveal key={slug} delay={index * 80}>
                <Link
                  to="/portafolios/$slug"
                  params={{ slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-surface">
                    <img
                      src={PORTFOLIO_IMAGES[slug]}
                      alt={item.name}
                      loading="lazy"
                      width={1280}
                      height={800}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {item.tagline}
                    </p>
                    <h2 className="mt-3 text-xl font-semibold text-foreground">{item.name}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      {count > 0 ? t.portfolios.viewPortfolio : t.portfolios.emptyCta}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
