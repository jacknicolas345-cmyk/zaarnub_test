import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { redirect?: string } => ({ redirect: (s.redirect as string) || undefined }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email("ایمیل معتبر وارد کنید").max(255);
const passwordSchema = z.string().min(6, "رمز حداقل ۶ کاراکتر").max(72);

function AuthPage() {
  const { user } = useAuth();
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (user) navigate({ to: redirect }); }, [user, redirect, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eRes = emailSchema.safeParse(email);
    const pRes = passwordSchema.safeParse(password);
    if (!eRes.success) { toast.error(eRes.error.issues[0].message); return; }
    if (!pRes.success) { toast.error(pRes.error.issues[0].message); return; }
    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/`, data: { full_name: fullName } },
      });
      if (error) toast.error(error.message); else toast.success("ثبت‌نام انجام شد. ایمیل خود را تأیید کنید.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error("ایمیل یا رمز اشتباه است"); else toast.success("خوش آمدید");
    }
    setBusy(false);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-card rounded-2xl p-8 shadow-luxe">
        <h1 className="text-2xl font-bold mb-6 text-center">{mode === "signin" ? "ورود به حساب" : "ثبت‌نام"}</h1>
        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && (
            <div><Label>نام و نام خانوادگی</Label><Input value={fullName} onChange={(e) => setFullName(e.target.value)} /></div>
          )}
          <div><Label>ایمیل</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div><Label>رمز عبور</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          <Button type="submit" disabled={busy} className="w-full bg-gradient-gold text-primary-foreground hover:opacity-90">
            {busy ? "..." : mode === "signin" ? "ورود" : "ثبت‌نام"}
          </Button>
        </form>
        <button className="text-sm text-gold mt-4 mx-auto block hover:underline"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
          {mode === "signin" ? "حساب ندارید؟ ثبت‌نام کنید" : "حساب دارید؟ وارد شوید"}
        </button>
      </div>
    </div>
  );
}
