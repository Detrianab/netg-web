import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { productImage } from "@/data/product-images";
import { PRODUCTS, productBySlug } from "@/data/products";
import { SITE, whatsappLink } from "@/data/site";
import { useI18n } from "@/i18n";
import { createInquiry } from "@/lib/public.functions";

export const Route = createFileRoute("/catalogo/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug };
  },
  head: ({ params }) => {
    const product = productBySlug(params.slug);
    const title = product
      ? `${product.name} (${product.code}) | Next G Solutions Telecom`
      : "Producto | Next G Solutions Telecom";
    const description = product?.short.es ?? "Ficha técnica de producto.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useLoaderData();
  const { t, locale } = useI18n();
  const product = productBySlug(slug)!;
  const related = PRODUCTS.filter((item) => item.slug !== product.slug && item.division === product.division);
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);
    try {
      const result = await createInquiry({
        data: {
          productSlug: product.slug,
          productName: `${product.name} (${product.code})`,
          fullName: String(data.get("fullName") ?? ""),
          company: String(data.get("company") ?? ""),
          email: String(data.get("email") ?? ""),
          whatsapp: String(data.get("whatsapp") ?? ""),
          message: String(data.get("message") ?? ""),
          locale,
        },
      });
      if (!result.ok) throw new Error("failed");
      toast.success(t.catalog.inquirySuccess);
      form.reset();
    } catch {
      toast.error(t.booking.error);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageHero eyebrow={`${t.catalog.divisions[product.division]} · ${product.brand}`} title={product.name}>
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {t.catalog.productCode}: {product.code}
        </p>
        <nav aria-label="breadcrumb" className="mt-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link to="/portafolios" className="inline-flex items-center gap-2 font-semibold text-primary">
            <ArrowLeft className="size-4" aria-hidden />
            {t.nav.portfolios}
          </Link>
          <span aria-hidden>/</span>
          <Link
            to="/portafolios/$slug"
            params={{ slug: product.division }}
            className="font-semibold text-primary"
          >
            {t.catalog.divisions[product.division]}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </PageHero>

      <section className="py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            {productImage(product.slug) ? (
              <div className="mb-8 flex items-center justify-center rounded-lg border border-border bg-surface p-8">
                <img
                  src={productImage(product.slug)}
                  alt={`${product.name} — ${product.code}`}
                  className="max-h-80 w-auto object-contain"
                />
              </div>
            ) : null}
            <p className="text-lg leading-relaxed text-foreground/85">{product.description[locale]}</p>

            <h2 className="mt-12 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {t.common.specifications}
            </h2>
            <dl className="mt-4 divide-y divide-border rounded-lg border border-border">
              {product.specs.map((spec) => (
                <div key={spec.label.es} className="grid gap-1 p-4 sm:grid-cols-[0.8fr_1.2fr] sm:gap-6">
                  <dt className="text-sm font-semibold text-foreground">{spec.label[locale]}</dt>
                  <dd className="text-sm text-muted-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} className="h-fit rounded-lg border border-border bg-surface p-7">
            <h2 className="text-lg font-semibold text-foreground">{t.catalog.inquiryTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.catalog.inquiryText}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="fullName">{t.common.fullName}</Label>
                <Input id="fullName" name="fullName" required minLength={2} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="company">{t.common.company}</Label>
                <Input id="company" name="company" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">{t.common.email}</Label>
                <Input id="email" name="email" type="email" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="whatsapp">{t.common.whatsapp}</Label>
                <Input id="whatsapp" name="whatsapp" className="mt-1.5" placeholder="+58 414 000 0000" />
              </div>
              <div>
                <Label htmlFor="message">{t.common.message}</Label>
                <Textarea id="message" name="message" rows={4} className="mt-1.5" />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep disabled:opacity-60"
              >
                {sending ? t.common.sending : t.common.send}
              </button>
            </form>

            <a
              href={whatsappLink(
                `Hola, ${SITE.shortName}. Deseo información sobre ${product.name} (${product.code}).`,
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-primary px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              <MessageCircle className="size-4" aria-hidden />
              {t.catalog.whatsappCta}
            </a>
          </Reveal>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-border bg-surface py-16">
          <div className="container-page">
            <h2 className="text-xl font-bold text-foreground">{t.catalog.relatedTitle}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to="/catalogo/$slug"
                  params={{ slug: item.slug }}
                  className="rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {item.code}
                  </p>
                  <h3 className="mt-2 font-semibold text-foreground">{item.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.short[locale]}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
