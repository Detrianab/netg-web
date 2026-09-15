import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { PageHero } from "@/components/PageHero";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SITE, whatsappLink } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n";
import {
  addBlockedSlot,
  deleteAppointment,
  getMyAccess,
  listAppointments,
  listBlockedSlots,
  listInquiries,
  removeBlockedSlot,
  setAppointmentStatus,
} from "@/lib/admin.functions";
import { WORKING_HOURS } from "@/lib/public.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Panel administrativo | Next G Solutions Telecom" },
      { name: "description", content: "Gestión de citas, disponibilidad y solicitudes." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Panel administrativo" },
      { property: "og:description", content: "Área privada de gestión." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const access = useQuery({ queryKey: ["admin-access"], queryFn: () => getMyAccess() });
  const isAdmin = access.data?.isAdmin === true;

  const appointments = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: () => listAppointments(),
    enabled: isAdmin,
  });
  const inquiries = useQuery({
    queryKey: ["admin-inquiries"],
    queryFn: () => listInquiries(),
    enabled: isAdmin,
  });
  const blocked = useQuery({
    queryKey: ["admin-blocked"],
    queryFn: () => listBlockedSlots(),
    enabled: isAdmin,
  });

  const [allDay, setAllDay] = useState(true);

  async function handleBlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      await addBlockedSlot({
        data: {
          date: String(data.get("date") ?? ""),
          time: allDay ? null : String(data.get("time") ?? "08:00"),
          reason: String(data.get("reason") ?? ""),
        },
      });
      await queryClient.invalidateQueries({ queryKey: ["admin-blocked"] });
      form.reset();
    } catch {
      toast.error(t.booking.error);
    }
  }

  async function refreshAppointments() {
    await queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
  }

  if (access.isLoading) {
    return (
      <div className="container-page py-24 text-center text-muted-foreground">{t.common.loading}</div>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <PageHero title={t.admin.title} subtitle={t.admin.noAccess} />
        <div className="container-page py-16">
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
            className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary"
          >
            {t.auth.signOut}
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero title={t.admin.title} subtitle={t.admin.subtitle}>
        <button
          type="button"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
          className="mt-8 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary"
        >
          {t.auth.signOut}
        </button>
      </PageHero>

      <section className="py-14">
        <div className="container-page">
          <Tabs defaultValue="appointments">
            <TabsList>
              <TabsTrigger value="appointments">{t.admin.tabsAppointments}</TabsTrigger>
              <TabsTrigger value="blocked">{t.admin.tabsBlocked}</TabsTrigger>
              <TabsTrigger value="inquiries">{t.admin.tabsInquiries}</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="mt-8">
              {(appointments.data ?? []).length === 0 ? (
                <p className="text-sm text-muted-foreground">{t.admin.empty}</p>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3">{t.admin.date}</th>
                        <th className="px-4 py-3">{t.admin.time}</th>
                        <th className="px-4 py-3">{t.admin.client}</th>
                        <th className="px-4 py-3">{t.admin.contact}</th>
                        <th className="px-4 py-3">{t.admin.status}</th>
                        <th className="px-4 py-3">{t.admin.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {(appointments.data ?? []).map((row) => (
                        <tr key={row.id}>
                          <td className="px-4 py-3 whitespace-nowrap">{row.appointment_date}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {String(row.appointment_time).slice(0, 5)}
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-foreground">{row.full_name}</p>
                            <p className="text-xs text-muted-foreground">{row.company ?? "—"}</p>
                            {row.topic ? (
                              <p className="mt-1 text-xs text-muted-foreground">{row.topic}</p>
                            ) : null}
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <p>{row.email}</p>
                            <p>{row.whatsapp}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                "rounded-sm px-2 py-1 text-xs font-semibold",
                                row.status === "confirmed" && "bg-primary/10 text-primary",
                                row.status === "pending" && "bg-secondary text-secondary-foreground",
                                row.status === "cancelled" && "bg-destructive/10 text-destructive",
                              )}
                            >
                              {row.status === "confirmed"
                                ? t.admin.statusConfirmed
                                : row.status === "cancelled"
                                  ? t.admin.statusCancelled
                                  : t.admin.statusPending}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-2 text-xs font-semibold">
                              <button
                                type="button"
                                className="text-primary hover:underline"
                                onClick={async () => {
                                  await setAppointmentStatus({
                                    data: { id: row.id, status: "confirmed" },
                                  });
                                  await refreshAppointments();
                                }}
                              >
                                {t.admin.confirm}
                              </button>
                              <button
                                type="button"
                                className="text-muted-foreground hover:underline"
                                onClick={async () => {
                                  await setAppointmentStatus({
                                    data: { id: row.id, status: "cancelled" },
                                  });
                                  await refreshAppointments();
                                }}
                              >
                                {t.admin.cancel}
                              </button>
                              <a
                                className="text-primary hover:underline"
                                target="_blank"
                                rel="noreferrer"
                                href={whatsappLink(
                                  `Hola ${row.full_name}, le confirmamos su cita en ${SITE.shortName} el ${row.appointment_date} a las ${String(row.appointment_time).slice(0, 5)}.`,
                                )}
                              >
                                {t.admin.resend}
                              </a>
                              <button
                                type="button"
                                className="text-destructive hover:underline"
                                onClick={async () => {
                                  await deleteAppointment({ data: { id: row.id } });
                                  await refreshAppointments();
                                }}
                              >
                                {t.admin.delete}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="blocked" className="mt-8 grid gap-10 lg:grid-cols-2">
              <form onSubmit={handleBlock} className="rounded-lg border border-border bg-surface p-6">
                <h2 className="text-base font-semibold text-foreground">{t.admin.blockTitle}</h2>
                <div className="mt-4">
                  <Label htmlFor="bl-date">{t.admin.date}</Label>
                  <Input id="bl-date" name="date" type="date" required className="mt-1.5" />
                </div>
                <label className="mt-4 flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={allDay}
                    onChange={(event) => setAllDay(event.target.checked)}
                    className="size-4 accent-[var(--color-primary)]"
                  />
                  {t.admin.blockAllDay}
                </label>
                {!allDay ? (
                  <div className="mt-4">
                    <Label htmlFor="bl-time">{t.admin.time}</Label>
                    <select
                      id="bl-time"
                      name="time"
                      className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                      {WORKING_HOURS.map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
                <div className="mt-4">
                  <Label htmlFor="bl-reason">{t.common.message}</Label>
                  <Input id="bl-reason" name="reason" className="mt-1.5" />
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-deep"
                >
                  {t.admin.blockAdd}
                </button>
              </form>

              <div>
                <h2 className="text-base font-semibold text-foreground">{t.admin.blockedList}</h2>
                {(blocked.data ?? []).length === 0 ? (
                  <p className="mt-4 text-sm text-muted-foreground">{t.admin.empty}</p>
                ) : (
                  <ul className="mt-4 divide-y divide-border rounded-lg border border-border">
                    {(blocked.data ?? []).map((row) => (
                      <li key={row.id} className="flex items-center justify-between gap-4 p-4 text-sm">
                        <span>
                          <span className="font-medium text-foreground">{row.slot_date}</span>{" "}
                          <span className="text-muted-foreground">
                            {row.slot_time ? String(row.slot_time).slice(0, 5) : t.admin.blockAllDay}
                          </span>
                          {row.reason ? (
                            <span className="block text-xs text-muted-foreground">{row.reason}</span>
                          ) : null}
                        </span>
                        <button
                          type="button"
                          aria-label={t.admin.delete}
                          className="text-destructive"
                          onClick={async () => {
                            await removeBlockedSlot({ data: { id: row.id } });
                            await queryClient.invalidateQueries({ queryKey: ["admin-blocked"] });
                          }}
                        >
                          <Trash2 className="size-4" aria-hidden />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </TabsContent>

            <TabsContent value="inquiries" className="mt-8">
              {(inquiries.data ?? []).length === 0 ? (
                <p className="text-sm text-muted-foreground">{t.admin.empty}</p>
              ) : (
                <ul className="grid gap-4 md:grid-cols-2">
                  {(inquiries.data ?? []).map((row) => (
                    <li key={row.id} className="rounded-lg border border-border bg-card p-5 text-sm">
                      <p className="font-semibold text-foreground">{row.full_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {row.company ?? "—"} · {row.email} · {row.whatsapp ?? "—"}
                      </p>
                      {row.product_name ? (
                        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-primary">
                          {row.product_name}
                        </p>
                      ) : null}
                      {row.message ? (
                        <p className="mt-2 text-muted-foreground">{row.message}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
