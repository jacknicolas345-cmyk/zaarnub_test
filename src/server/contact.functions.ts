import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const phoneSchema = z.string().trim().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست");

export const requestContactOtp = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ phone: phoneSchema }).parse(input))
  .handler(async ({ data }) => {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    // expire any existing unused codes for this phone
    await supabaseAdmin.from("contact_otps").delete().eq("phone", data.phone).eq("verified", false);
    const { error } = await supabaseAdmin.from("contact_otps").insert({ phone: data.phone, code });
    if (error) throw new Error(error.message);
    // NOTE: SMS sending stub. In production wire Twilio here.
    // Returning code for demo/dev so the user can complete the flow without external SMS.
    return { ok: true, devCode: code };
  });

export const verifyContactOtp = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ phone: phoneSchema, code: z.string().trim().length(6) }).parse(input))
  .handler(async ({ data }) => {
    const { data: rows, error } = await supabaseAdmin
      .from("contact_otps")
      .select("id,expires_at,verified")
      .eq("phone", data.phone).eq("code", data.code)
      .order("created_at", { ascending: false }).limit(1);
    if (error) throw new Error(error.message);
    const row = rows?.[0];
    if (!row) return { ok: false, error: "کد نادرست است" };
    if (row.verified) return { ok: false, error: "این کد قبلاً استفاده شده" };
    if (new Date(row.expires_at).getTime() < Date.now()) return { ok: false, error: "کد منقضی شده" };
    await supabaseAdmin.from("contact_otps").update({ verified: true }).eq("id", row.id);
    return { ok: true };
  });

const contactSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: phoneSchema,
  subject: z.string().trim().max(150).optional().nullable(),
  message: z.string().trim().min(5).max(2000),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    // Require a verified OTP for this phone within the last 30 minutes
    const { data: rows } = await supabaseAdmin
      .from("contact_otps").select("id,created_at")
      .eq("phone", data.phone).eq("verified", true)
      .order("created_at", { ascending: false }).limit(1);
    const verified = rows?.[0];
    if (!verified || Date.now() - new Date(verified.created_at).getTime() > 30 * 60 * 1000) {
      throw new Error("ابتدا شماره موبایل خود را تأیید کنید");
    }
    const { error } = await supabaseAdmin.from("contact_messages").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
