import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Input } from "@/components/ui/input";
import { productImage } from "@/data/product-images";
import { PRODUCTS } from "@/data/products";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/catalogo/")({
  head: () => ({
    meta: [
      { title: "Catálogo digital de productos | Next G Solutions Telecom" },
      {
        name: "description",
        content:
          "Catálogo por divisiones: monitoreo ambiental, fibra óptica e instrumentación electrónica, con ficha técnica de cada equipo.",
      },
      { property: "og:title", content: "Catálogo de productos | Next G Solutions Telecom" },
      {
        property: "og:description",
        content: "Consulte fichas técnicas y solicite información de nuestros equipos.",
      },
    ],
  }),
  component: CatalogIndex,
});

const DIVISIONS = ["monitoreo-ambiental", "fibra-optica", "instrumentacion"] as const;

function CatalogIndex() {
  const { t, locale } = useI18n();
  const [query, setQuery] = useState("");
  const [division, setDivision] = useState<string>("all");

  const products = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesDivision = division === "all" || product.division === division;
      const matchesQuery =
        !needle ||
        [product.name, product.code, product.brand, product.short[locale]]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      return matchesDivision && matchesQuery;
    });
  }, [division, locale, query]);

  return (
    <>
      <PageHero title={t.catalog.title} subtitle={t.catalog.subtitle} />

      <section className="py-14">
        <div className="container-page">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-md">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.catalog.search}
                className="pl-9"
                aria-label={t.catalog.search}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {[{ id: "all", label: t.catalog.allDivisions }, ...DIVISIONS.map((id) => ({ id, label: t.catalog.divisions[id] }))].map(
                (option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setDivision(option.id)}
                    className={cn(
                      "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                      division === option.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground/80 hover:border-primary/40 hover:text-primary",
                    )}
                  >
                    {option.label}
                  </button>
                ),
              )}
            </div>
          </div>

          {products.length === 0 ? (
            <p className="mt-16 text-center text-muted-foreground">{t.catalog.noResults}</p>
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
                    <span className="w-fit rounded-sm bg-secondary px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-secondary-foreground">
                      {t.catalog.divisions[product.division]}
                    </span>
                    <h2 className="mt-4 text-lg font-semibold text-foreground">{product.name}</h2>
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
        </div>
      </section>
    </>
  );
}
