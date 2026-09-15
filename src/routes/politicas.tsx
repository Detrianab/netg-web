import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/politicas")({
  head: () => ({
    meta: [
      { title: "Políticas | Next G Solutions Telecom, C.A." },
      {
        name: "description",
        content:
          "Garantía de equipos y servicios, condiciones de cancelación, reembolsos y política de tratamiento de datos personales.",
      },
      { property: "og:title", content: "Políticas | Next G Solutions Telecom" },
      {
        property: "og:description",
        content: "Garantías, cancelaciones, reembolsos y tratamiento de datos.",
      },
    ],
  }),
  component: Policies,
});

function Policies() {
  const { t } = useI18n();

  const sections = [
    { title: t.policies.warrantyTitle, body: t.policies.warranty },
    { title: t.policies.cancellationsTitle, body: t.policies.cancellations },
    { title: t.policies.refundsTitle, body: t.policies.refunds },
    { title: t.policies.dataTitle, body: t.policies.data },
  ];

  return (
    <>
      <PageHero title={t.policies.title} subtitle={t.policies.subtitle} />

      <section className="py-16">
        <div className="container-page max-w-3xl space-y-12">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 70}>
              <h2 className="border-l-4 border-primary pl-4 text-xl font-semibold text-foreground">
                {section.title}
              </h2>
              <div className="mt-5 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="text-sm leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
