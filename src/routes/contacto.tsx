import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE, whatsappLink } from "@/data/site";
import { useI18n } from "@/i18n";
import { createInquiry } from "@/lib/public.functions";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | Next G Solutions Telecom, C.A." },
      {
        name: "description",
        content:
          "Escríbanos por correo o WhatsApp, ubique nuestra oficina en el mapa y conozca nuestro horario de atención.",
      },
      { property: "og:title", content: "Contacto | Next G Solutions Telecom" },
      {
        property: "og:description",
        content: "Correo, WhatsApp, ubicación y horario de atención de Next G Solutions Telecom.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t, locale } = useI18n();
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);
    try {
      const result = await createInquiry({
        data: {
          fullName: String(data.get("fullName") ?? ""),
          company: String(data.get("company") ?? ""),
          email: String(data.get("email") ?? ""),
          whatsapp: String(data.get("whatsapp") ?? ""),
          message: String(data.get("message") ?? ""),
          locale,
        },
      });
      if (!result.ok) throw new Error("failed");
      toast.success(t.contact.formSuccess);
      form.reset();
    } catch {
      toast.error(t.booking.error);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageHero title={t.contact.title} subtitle={t.contact.subtitle} />

      <section className="py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <h2 className="text-lg font-semibold text-foreground">{t.contact.officeTitle}</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">{t.common.address}</p>
                  <p className="text-muted-foreground">{SITE.addressLine}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">{t.common.email}</p>
                  <a href={`mailto:${SITE.email}`} className="text-muted-foreground hover:text-primary">
                    {SITE.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">{t.common.whatsapp}</p>
                  <a
                    href={whatsappLink(`Hola, ${SITE.shortName}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {SITE.whatsapp}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">{t.common.hours}</p>
                  <p className="text-muted-foreground">{t.common.hoursValue}</p>
                </div>
              </li>
            </ul>

          </Reveal>

          <Reveal delay={120} className="rounded-lg border border-border bg-surface p-7">
            <h2 className="text-lg font-semibold text-foreground">{t.contact.formTitle}</h2>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <Label htmlFor="c-fullName">{t.common.fullName}</Label>
                <Input id="c-fullName" name="fullName" required minLength={2} className="mt-1.5" />
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="c-company">{t.common.company}</Label>
                <Input id="c-company" name="company" className="mt-1.5" />
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="c-email">{t.common.email}</Label>
                <Input id="c-email" name="email" type="email" required className="mt-1.5" />
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="c-whatsapp">{t.common.whatsapp}</Label>
                <Input id="c-whatsapp" name="whatsapp" className="mt-1.5" placeholder="+58 414 000 0000" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="c-message">{t.common.message}</Label>
                <Textarea id="c-message" name="message" rows={5} required className="mt-1.5" />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="sm:col-span-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep disabled:opacity-60"
              >
                {sending ? t.common.sending : t.common.send}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16">
        <div className="container-page">
          <Reveal>
            <h2 className="text-lg font-semibold text-foreground">{t.contact.mapTitle}</h2>
            <div className="mt-6 overflow-hidden rounded-lg border border-border">
              <iframe
                title={t.contact.mapTitle}
                src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`}
                width="100%"
                height="420"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
