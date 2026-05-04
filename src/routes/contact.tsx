import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { requestContactOtp, verifyContactOtp, submitContactMessage } from "@/server/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "تماس با زرناب" }, { name: "description", content: "تماس با فروشگاه طلا و جواهر زرناب" }] }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", subject: "", message: "" });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [devCode, setDevCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!/^09\d{9}$/.test(form.phone)) { toast.error("شماره موبایل ۱۱ رقمی با ۰۹ وارد کنید"); return; }
    setLoading(true);
    try {
      const res = await requestContactOtp({ data: { phone: form.phone } });
      setOtpSent(true);
      setDevCode(res.devCode ?? null);
      toast.success("کد تأیید ارسال شد");
    } catch (e) {
      toast.error((e as Error).message);
    } finally { setLoading(false); }
  };

  const verify = async () => {
    if (otp.length !== 6) { toast.error("کد ۶ رقمی"); return; }
    setLoading(true);
    try {
      const res = await verifyContactOtp({ data: { phone: form.phone, code: otp } });
      if (res.ok) { setOtpVerified(true); toast.success("شماره تأیید شد"); }
      else toast.error(res.error ?? "کد نادرست");
    } catch (e) {
      toast.error((e as Error).message);
    } finally { setLoading(false); }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) { toast.error("ابتدا شماره موبایل را تأیید کنید"); return; }
    setLoading(true);
    try {
      await submitContactMessage({ data: {
        full_name: form.full_name, email: form.email, phone: form.phone,
        subject: form.subject || null, message: form.message,
      } });
      toast.success("پیام شما ارسال شد");
      setForm({ full_name: "", email: "", phone: "", subject: "", message: "" });
      setOtp(""); setOtpSent(false); setOtpVerified(false); setDevCode(null);
    } catch (e) { toast.error((e as Error).message); }
    finally { setLoading(false); }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8">تماس با ما</h1>
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {[
          { icon: Phone, title: "تلفن", value: "۰۲۱-۸۸۸۸۸۸۸۸" },
          { icon: Mail, title: "ایمیل", value: "info@zarnab.shop" },
          { icon: MapPin, title: "آدرس", value: "تهران، خیابان فرشته" },
        ].map((c, i) => (
          <div key={i} className="bg-card rounded-xl p-6 shadow-card text-center">
            <c.icon className="h-8 w-8 text-gold mx-auto mb-3" />
            <h3 className="font-bold mb-1">{c.title}</h3>
            <p className="text-sm text-muted-foreground">{c.value}</p>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="bg-card rounded-2xl p-6 md:p-8 shadow-luxe space-y-4">
        <h2 className="text-xl font-bold mb-2">ارسال پیام</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>نام و نام خانوادگی *</Label><Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} maxLength={100} required /></div>
          <div><Label>ایمیل *</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} required /></div>
          <div className="md:col-span-2">
            <Label>موبایل * (مثلاً 09120000000)</Label>
            <div className="flex gap-2">
              <Input value={form.phone} disabled={otpVerified} onChange={(e) => { setForm({ ...form, phone: e.target.value }); setOtpSent(false); setOtpVerified(false); }} maxLength={11} required />
              {!otpVerified && (
                <Button type="button" variant="outline" disabled={loading} onClick={sendOtp}>{otpSent ? "ارسال مجدد" : "دریافت کد"}</Button>
              )}
              {otpVerified && <span className="flex items-center gap-1 text-sm text-gold px-3"><ShieldCheck className="h-4 w-4" /> تأیید شد</span>}
            </div>
            {otpSent && !otpVerified && (
              <div className="mt-3 flex gap-2 items-end">
                <div className="flex-1">
                  <Label>کد تأیید (۶ رقم)</Label>
                  <Input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} maxLength={6} />
                </div>
                <Button type="button" disabled={loading} onClick={verify}>تأیید</Button>
              </div>
            )}
            {devCode && !otpVerified && (
              <p className="text-xs text-muted-foreground mt-2">حالت توسعه: کد ارسال‌شده <span className="font-mono text-gold">{devCode}</span></p>
            )}
          </div>
          <div className="md:col-span-2"><Label>موضوع</Label><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} maxLength={150} /></div>
        </div>
        <div><Label>پیام *</Label><Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={2000} required /></div>
        <Button type="submit" disabled={loading || !otpVerified} className="bg-gradient-gold text-primary-foreground hover:opacity-90">
          <Send className="ml-2 h-4 w-4" /> {loading ? "در حال ارسال..." : "ارسال پیام"}
        </Button>
      </form>
    </div>
  );
}
