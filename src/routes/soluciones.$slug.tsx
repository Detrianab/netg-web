import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { PRODUCTS } from "@/data/products";
import { useI18n } from "@/i18n";

const SLUGS = ["calidad-aire", "granjas", "horticultura", "cadena-frio"] as const;
type SolutionSlug = (typeof SLUGS)[number];

export const Route = createFileRoute("/soluciones/$slug")({
  loader: ({ params }) => {
    if (!(SLUGS as readonly string[]).includes(params.slug)) throw notFound();
    return { slug: params.slug as SolutionSlug };
  },
  head: ({ params }) => ({
    meta: [
      { title: `Solución ${params.slug} | Next G Solutions Telecom` },
      {
        name: "description",
        content:
          "Monitoreo ambiental profesional con sensores inalámbricos, gateway y software para medir en tiempo real.",
      },
      { property: "og:title", content: "Soluciones de monitoreo | Next G Solutions Telecom" },
      {
        property: "og:description",
        content: "Sensores inalámbricos y software de monitoreo para industrias críticas.",
      },
    ],
  }),
  component: SolutionDetail,
});

function SolutionDetail() {
  const { slug } = Route.useLoaderData();
  const { t, locale } = useI18n();
  const item = t.solutions.items[slug];
  const related = PRODUCTS.filter((product) => product.solutions.includes(slug));

  return (
    <>
      <PageHero eyebrow={item.tagline} title={item.name}>
        <Link
          to="/soluciones"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {t.solutions.title}
        </Link>
      </PageHero>

      <section className="py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {t.solutions.detailIntro}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/85">{item.description}</p>
          </Reveal>

          <Reveal delay={120} className="rounded-lg border border-border bg-surface p-8">
            <h2 className="text-base font-semibold text-foreground">{t.solutions.bulletsTitle}</h2>
            <ul className="mt-4 space-y-3">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm text-foreground/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {bullet}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-border bg-surface py-16">
          <div className="container-page">
            <Reveal>
              <h2 className="text-xl font-bold text-foreground md:text-2xl">
                {t.solutions.productsTitle}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((product, index) => (
                <Reveal key={product.slug} delay={index * 80}>
                  <Link
                    to="/catalogo/$slug"
                    params={{ slug: product.slug }}
                    className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {product.code}
                    </p>
                    <h3 className="mt-2 font-semibold text-foreground">{product.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{product.short[locale]}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      {t.common.learnMore}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-16">
        <div className="container-page">
          <Reveal className="rounded-xl bg-primary-deep px-8 py-12 text-center text-primary-foreground">
            <h2 className="text-xl font-bold md:text-3xl">{t.home.ctaTitle}</h2>
            <Link
              to="/contacto"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-semibold text-primary-deep transition-transform hover:-translate-y-0.5"
            >
              {t.common.contactUs}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
