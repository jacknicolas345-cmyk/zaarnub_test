import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatToman } from "@/lib/format";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/checkout")({ component: Checkout });

const schema = z.object({
  full_name: z.string().trim().min(2, "نام را وارد کنید").max(100),
  phone: z.string().trim().min(10, "شماره معتبر").max(15),
  address: z.string().trim().min(10, "آدرس کامل").max(500),
  notes: z.string().max(500).optional(),
});

function Checkout() {
  const { user, loading: authLoading } = useAuth();
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", phone: "", address: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/auth", search: { redirect: "/checkout" } });
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      supabase.from("profiles").select("full_name,phone,address").eq("id", user.id).maybeSingle()
        .then(({ data }) => {
          if (data) setForm((f) => ({ ...f, full_name: data.full_name || "", phone: data.phone || "", address: data.address || "" }));
        });
    }
  }, [user]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || items.length === 0) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setSubmitting(true);
    const { data: order, error } = await supabase.from("orders").insert({
      user_id: user.id,
      full_name: parsed.data.full_name,
      phone: parsed.data.phone,
      address: parsed.data.address,
      notes: parsed.data.notes,
      total,
      status: "pending",
    }).select().single();
    if (error || !order) { toast.error("خطا در ثبت سفارش"); setSubmitting(false); return; }
    const itemsPayload = items.map((i) => ({
      order_id: order.id, product_id: i.id, product_name: i.name, price: i.price, quantity: i.quantity,
    }));
    await supabase.from("order_items").insert(itemsPayload);
    clear();
    toast.success("سفارش شما با موفقیت ثبت شد");
    navigate({ to: "/orders" });
  };

  if (authLoading || !user) return <div className="container mx-auto px-4 py-20 text-center">در حال بارگذاری...</div>;

  return (
    <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
      <form onSubmit={submit} className="md:col-span-2 bg-card rounded-2xl p-8 shadow-card space-y-4">
        <h1 className="text-2xl font-bold mb-4">اطلاعات تحویل و پرداخت</h1>
        <div><Label>نام و نام خانوادگی</Label><Input value={form.full_name} onChange={(e) => setForm({...form, full_name: e.target.value})} required /></div>
        <div><Label>شماره موبایل</Label><Input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} required /></div>
        <div><Label>آدرس کامل</Label><Textarea value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} required rows={3} /></div>
        <div><Label>یادداشت (اختیاری)</Label><Textarea value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} rows={2} /></div>
        <div className="bg-secondary/50 rounded-lg p-4 text-sm text-muted-foreground">
          💳 درگاه پرداخت آنلاین به‌زودی فعال می‌شود. در حال حاضر سفارش شما به صورت پرداخت در محل ثبت می‌شود و تیم ما برای هماهنگی تماس خواهد گرفت.
        </div>
        <Button type="submit" disabled={submitting} size="lg" className="w-full bg-gradient-gold text-primary-foreground hover:opacity-90">
          {submitting ? "در حال ثبت..." : "ثبت سفارش"}
        </Button>
      </form>
      <div className="bg-card rounded-2xl p-6 shadow-luxe h-fit">
        <h2 className="font-bold mb-4">خلاصه سفارش</h2>
        <div className="space-y-2 mb-4">
          {items.map((i) => (
            <div key={i.id} className="flex justify-between text-sm">
              <span>{i.name} × {i.quantity}</span>
              <span>{formatToman(i.price * i.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-4 flex justify-between font-bold">
          <span>مبلغ نهایی</span><span className="text-gold">{formatToman(total)}</span>
        </div>
      </div>
    </div>
  );
}
