import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ShieldCheck, Wrench, Handshake, Timer } from "lucide-react";

import heroPoster from "@/assets/hero-poster.jpg";
import { LogoLoop } from "@/components/LogoLoop";
import { Reveal } from "@/components/Reveal";
import { PORTFOLIO_IMAGES, PORTFOLIO_SLUGS } from "@/data/portfolios";
import { CLIENTS, PARTNERS } from "@/data/site";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Next G Solutions Telecom, C.A. | Instrumentación y monitoreo" },
      {
        name: "description",
        content:
          "Desde 2005 comercializamos equipos, herramientas e insumos de alta ingeniería para operadores, integradores y contratistas de telecomunicaciones en Venezuela.",
      },
      { property: "og:title", content: "Next G Solutions Telecom, C.A." },
      {
        property: "og:description",
        content:
          "Instrumentación electrónica, fibra óptica y monitoreo ambiental para redes críticas en Venezuela.",
      },
    ],
  }),
  component: Home,
});

const WHY_ICONS = [Wrench, ShieldCheck, Handshake, Timer];

function Home() {
  const { t, locale } = useI18n();
  const solutionEntries = Object.entries(t.solutions.items);

  return (
    <>
      <section className="relative overflow-hidden bg-primary-deep text-primary-foreground">
        <video
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroPoster}
          src="/hero-video.mp4"
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-45"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary-deep via-primary-deep/85 to-primary-deep/50"
        />
        <div className="container-page relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              {t.home.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.08] md:text-6xl">{t.home.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              {t.home.subtitle}
            </p>
            <div className="mt-8 max-w-xl rounded-lg border border-primary-foreground/15 bg-primary-foreground/[0.06] p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {t.home.letterTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">{t.home.letter}</p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/contacto"
                className="group inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-semibold text-primary-deep transition-transform hover:-translate-y-0.5"
              >
                {t.home.ctaPrimary}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                to="/portafolios"
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                {t.home.ctaSecondary}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {t.home.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/[0.06] p-6 backdrop-blur"
              >
                <p className="font-display text-3xl font-bold text-accent">{stat.value}</p>
                <p className="mt-1 text-sm text-primary-foreground/75">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <nav aria-label={t.nav.home} className="border-b border-border bg-surface">
        <div className="container-page flex flex-wrap gap-2 py-4">
          {[
            { to: "/portafolios", label: t.nav.portfolios },
            { to: "/catalogo", label: t.nav.catalog },
            { to: "/nosotros", label: t.nav.about },
            { to: "/soluciones", label: t.nav.solutions },
            { to: "/contacto", label: t.nav.contact },
            { to: "/politicas", label: t.nav.policies },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <section className="border-b border-border bg-background py-14">
        <div className="container-page">
          <Reveal className="text-center">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">{t.home.clientsTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.home.clientsSubtitle}</p>
          </Reveal>
          <div className="mt-10">
            <LogoLoop
              ariaLabel={t.home.clientsTitle}
              speed={55}
              gap={64}
              logos={CLIENTS.map((name) => ({
                id: name,
                title: name,
                node: (
                  <span className="font-display text-xl font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary md:text-2xl">
                    {name}
                  </span>
                ),
              }))}
            />
          </div>
          <div className="mt-8">
            <LogoLoop
              ariaLabel="Partners"
              direction="right"
              speed={40}
              gap={56}
              logos={PARTNERS.map((name) => ({
                id: name,
                title: name,
                node: (
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
                    {name}
                  </span>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-4xl">{t.home.portfoliosTitle}</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">{t.home.portfoliosSubtitle}</p>
            </div>
            <Link
              to="/portafolios"
              className="group inline-flex items-center gap-2 rounded-md border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {t.portfolios.viewAll}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {PORTFOLIO_SLUGS.map((slug, index) => {
              const item = t.portfolios.items[slug];
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
                      <h3 className="mt-3 text-xl font-semibold text-foreground">{item.name}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        {t.portfolios.viewPortfolio}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <h2 className="text-2xl font-bold text-foreground md:text-4xl">{t.about.title}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t.about.whyParagraphs[0]}</p>
            <Link
              to="/nosotros"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              {t.common.learnMore}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {t.about.valuesTitle}
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {t.about.values.map((value) => (
                <div key={value.title} className="rounded-lg border border-border bg-card p-5">
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-primary" aria-hidden />
                    <p className="font-semibold text-foreground">{value.title}</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="max-w-2xl text-2xl font-bold text-foreground md:text-4xl">
              {t.home.solutionsTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{t.home.solutionsSubtitle}</p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {solutionEntries.map(([slug, item], index) => (
              <Reveal key={slug} delay={index * 90}>
                <Link
                  to="/soluciones/$slug"
                  params={{ slug }}
                  className="group flex h-full flex-col rounded-lg border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {item.tagline}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{item.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {t.common.learnMore}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="text-2xl font-bold text-foreground md:text-4xl">{t.home.whyTitle}</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {t.home.why.map((item, index) => {
              const Icon = WHY_ICONS[index] ?? Wrench;
              return (
                <Reveal key={item.title} delay={index * 80}>
                  <Icon className="size-7 text-primary" aria-hidden />
                  <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <Reveal className="rounded-xl bg-primary-deep px-8 py-14 text-center text-primary-foreground md:px-16">
            <h2 className="text-2xl font-bold md:text-4xl">{t.home.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">{t.home.ctaText}</p>
            <Link
              to="/contacto"
              className="group mt-8 inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-semibold text-primary-deep transition-transform hover:-translate-y-0.5"
            >
              {t.common.contactUs}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}