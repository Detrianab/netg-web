import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const WORKING_HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
] as const;

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const appointmentSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  company: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().email().max(160),
  whatsapp: z.string().trim().min(7).max(30),
  date: dateSchema,
  time: z.string().regex(/^\d{2}:\d{2}$/),
  topic: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().max(1200).optional().default(""),
  locale: z.string().trim().max(5).default("es"),
});

const inquirySchema = z.object({
  productSlug: z.string().trim().max(80).optional().default(""),
  productName: z.string().trim().max(160).optional().default(""),
  fullName: z.string().trim().min(2).max(120),
  company: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().email().max(160),
  whatsapp: z.string().trim().max(30).optional().default(""),
  message: z.string().trim().max(1200).optional().default(""),
  locale: z.string().trim().max(5).default("es"),
});

export const getAvailability = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ date: dateSchema }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [{ data: booked }, { data: blocked }] = await Promise.all([
      supabaseAdmin
        .from("appointments")
        .select("appointment_time")
        .eq("appointment_date", data.date)
        .neq("status", "cancelled"),
      supabaseAdmin.from("blocked_slots").select("slot_time").eq("slot_date", data.date),
    ]);

    const dayBlocked = (blocked ?? []).some((row) => !row.slot_time);
    const takenTimes = new Set(
      [
        ...(booked ?? []).map((row) => row.appointment_time),
        ...(blocked ?? []).map((row) => row.slot_time),
      ]
        .filter(Boolean)
        .map((value) => String(value).slice(0, 5)),
    );

    return {
      dayBlocked,
      slots: WORKING_HOURS.map((time) => ({
        time,
        available: !dayBlocked && !takenTimes.has(time),
      })),
    };
  });

export const createAppointment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => appointmentSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: blocked } = await supabaseAdmin
      .from("blocked_slots")
      .select("id, slot_time")
      .eq("slot_date", data.date);

    const isBlocked = (blocked ?? []).some(
      (row) => !row.slot_time || String(row.slot_time).slice(0, 5) === data.time,
    );
    if (isBlocked) return { ok: false as const, reason: "taken" as const };

    const { data: inserted, error } = await supabaseAdmin
      .from("appointments")
      .insert({
        full_name: data.fullName,
        company: data.company || null,
        email: data.email,
        whatsapp: data.whatsapp,
        appointment_date: data.date,
        appointment_time: data.time,
        topic: data.topic || null,
        message: data.message || null,
        locale: data.locale,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") return { ok: false as const, reason: "taken" as const };
      console.error("createAppointment failed", error);
      return { ok: false as const, reason: "error" as const };
    }

    return { ok: true as const, id: inserted.id };
  });

export const createInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("product_inquiries").insert({
      product_slug: data.productSlug || null,
      product_name: data.productName || null,
      full_name: data.fullName,
      company: data.company || null,
      email: data.email,
      whatsapp: data.whatsapp || null,
      message: data.message || null,
      locale: data.locale,
    });

    if (error) {
      console.error("createInquiry failed", error);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
