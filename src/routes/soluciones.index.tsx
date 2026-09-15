import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { solutionImage } from "@/data/solution-images";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/soluciones/")({
  head: () => ({
    meta: [
      { title: "Soluciones de monitoreo ambiental | Next G Solutions Telecom" },
      {
        name: "description",
        content:
          "Calidad del aire en oficinas, granjas de animales vivos, horticultura y control de cadena de frío con sensores inalámbricos y software profesional.",
      },
      { property: "og:title", content: "Soluciones | Next G Solutions Telecom" },
      {
        property: "og:description",
        content: "Ecosistemas de monitoreo ambiental para oficinas, granjas, invernaderos y cadena de frío.",
      },
    ],
  }),
  component: SolutionsIndex,
});

function SolutionsIndex() {
  const { t } = useI18n();
  const items = Object.entries(t.solutions.items);

  return (
    <>
      <PageHero title={t.solutions.title} subtitle={t.solutions.subtitle} />

      <section className="py-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {items.map(([slug, item], index) => (
            <Reveal key={slug} delay={index * 90}>
              <Link
                to="/soluciones/$slug"
                params={{ slug }}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                {solutionImage(slug) ? (
                  <div className="aspect-[16/9] overflow-hidden bg-surface">
                    <img
                      src={solutionImage(slug)}
                      alt={item.name}
                      loading="lazy"
                      width={1280}
                      height={800}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {item.tagline}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-foreground">{item.name}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <ul className="mt-5 space-y-1.5 text-sm text-foreground/80">
                  {item.bullets.slice(0, 3).map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {t.common.learnMore}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
