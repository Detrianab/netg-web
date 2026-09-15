import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

import aboutTeam from "@/assets/about-team.jpg";
import { LogoLoop } from "@/components/LogoLoop";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CLIENTS, PARTNERS, SITE } from "@/data/site";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros | Next G Solutions Telecom, C.A." },
      {
        name: "description",
        content:
          "Desde 2005 atendemos el mercado venezolano de telecomunicaciones. Misión, visión, valores corporativos y política de calidad de Next G Solutions Telecom.",
      },
      { property: "og:title", content: "Nosotros | Next G Solutions Telecom" },
      {
        property: "og:description",
        content: "Socios estratégicos de operadores, integradores y contratistas desde 2005.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useI18n();

  return (
    <>
      <PageHero eyebrow={`${SITE.founded} — ${new Date().getFullYear()}`} title={t.about.title} subtitle={t.about.subtitle} />

      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src={aboutTeam}
                alt={t.about.title}
                loading="lazy"
                width={1280}
                height={800}
                className="size-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100} className="space-y-5">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">{t.about.whyTitle}</h2>
            {t.about.whyParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="container-page grid gap-8 md:grid-cols-2">
          <Reveal className="rounded-lg border border-border bg-card p-8">
            <h2 className="text-xl font-semibold text-primary">{t.about.missionTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.about.mission}</p>
          </Reveal>
          <Reveal delay={120} className="rounded-lg border border-border bg-card p-8">
            <h2 className="text-xl font-semibold text-primary">{t.about.visionTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.about.vision}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">{t.about.valuesTitle}</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.about.values.map((value, index) => (
              <Reveal
                key={value.title}
                delay={index * 70}
                className="rounded-lg border border-border p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-primary" aria-hidden />
                  <h3 className="font-semibold text-foreground">{value.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl rounded-lg border-l-4 border-primary bg-card p-8">
            <h2 className="text-xl font-semibold text-foreground">{t.about.qualityTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.about.quality}</p>
          </Reveal>

          <Reveal className="mt-16 text-center">
            <h2 className="text-lg font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t.about.partnersTitle}
            </h2>
          </Reveal>
          <div className="mt-8">
            <LogoLoop
              ariaLabel={t.about.partnersTitle}
              speed={45}
              gap={60}
              logos={PARTNERS.map((name) => ({
                id: name,
                title: name,
                node: (
                  <span className="font-display text-lg font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    {name}
                  </span>
                ),
              }))}
            />
          </div>

          <Reveal className="mt-16 text-center">
            <h2 className="text-lg font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t.about.clientsTitle}
            </h2>
          </Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {CLIENTS.map((name) => (
              <span
                key={name}
                className="rounded-md border border-border bg-card px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.14em] text-foreground/80"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
