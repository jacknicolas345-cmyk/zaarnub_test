import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatToman } from "@/lib/format";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Save } from "lucide-react";

type Order = { id: string; full_name: string; phone: string; address: string; total: number; status: string; created_at: string; notes: string | null; admin_notes: string | null };
type HistoryRow = { id: string; status: string; note: string | null; created_at: string };

export const Route = createFileRoute("/admin/orders")({ component: AdminOrders });

const STATUSES = [
  { v: "pending", l: "در انتظار" },
  { v: "processing", l: "در حال پردازش" },
  { v: "shipped", l: "ارسال شده" },
  { v: "delivered", l: "تحویل شده" },
  { v: "cancelled", l: "لغو شده" },
];
const statusLabel = (v: string) => STATUSES.find((s) => s.v === v)?.l ?? v;

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [history, setHistory] = useState<Record<string, HistoryRow[]>>({});
  const [adminNote, setAdminNote] = useState<Record<string, string>>({});
  const [statusNote, setStatusNote] = useState<Record<string, string>>({});

  const load = () => supabase.from("orders").select("*").order("created_at", { ascending: false }).then(({ data }) => {
    const list = (data ?? []) as Order[];
    setOrders(list);
    const map: Record<string, string> = {};
    list.forEach((o) => { map[o.id] = o.admin_notes ?? ""; });
    setAdminNote(map);
  });
  useEffect(() => { load(); }, []);

  const loadHistory = async (id: string) => {
    const { data } = await supabase.from("order_status_history").select("id,status,note,created_at").eq("order_id", id).order("created_at", { ascending: false });
    setHistory((h) => ({ ...h, [id]: (data ?? []) as HistoryRow[] }));
  };

  const toggle = (id: string) => {
    if (open === id) { setOpen(null); return; }
    setOpen(id);
    if (!history[id]) loadHistory(id);
  };

  const updateStatus = async (id: string, status: string) => {
    const note = statusNote[id]?.trim() || null;
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    if (note) {
      // append note to the most recent history row (just inserted by trigger)
      const { data: latest } = await supabase.from("order_status_history").select("id").eq("order_id", id).order("created_at", { ascending: false }).limit(1);
      if (latest?.[0]) await supabase.from("order_status_history").update({ note }).eq("id", latest[0].id);
    }
    setStatusNote((m) => ({ ...m, [id]: "" }));
    toast.success("به‌روزرسانی شد");
    load();
    if (open === id) loadHistory(id);
  };

  const saveAdminNote = async (id: string) => {
    const { error } = await supabase.from("orders").update({ admin_notes: adminNote[id] || null }).eq("id", id);
    if (error) toast.error(error.message); else toast.success("یادداشت ذخیره شد");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">سفارش‌ها</h1>
      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="bg-card rounded-xl p-5 shadow-card">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
              <div>
                <p className="font-bold">{o.full_name}</p>
                <p className="text-sm text-muted-foreground">{o.phone}</p>
                <p className="text-sm text-muted-foreground mt-1">{o.address}</p>
                {o.notes && <p className="text-sm mt-2">📝 {o.notes}</p>}
              </div>
              <div className="text-left">
                <p className="text-gold font-bold text-lg">{formatToman(o.total)}</p>
                <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString("fa-IR")}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-2">
              <div>
                <label className="text-xs text-muted-foreground">وضعیت</label>
                <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v)}>
                  <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                  <SelectContent>{STATUSES.map((s) => <SelectItem key={s.v} value={s.v}>{s.l}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs text-muted-foreground">یادداشت برای تغییر بعدی وضعیت</label>
                <Textarea rows={1} value={statusNote[o.id] ?? ""} onChange={(e) => setStatusNote((m) => ({ ...m, [o.id]: e.target.value }))}
                  placeholder="مثلاً: بسته‌بندی شد، کد رهگیری: ..." />
              </div>
              <Button variant="ghost" size="sm" onClick={() => toggle(o.id)}>
                {open === o.id ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                تاریخچه
              </Button>
            </div>

            {open === o.id && (
              <div className="mt-4 border-t border-border pt-4 space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground">یادداشت داخلی ادمین</label>
                  <div className="flex gap-2">
                    <Textarea rows={2} value={adminNote[o.id] ?? ""} onChange={(e) => setAdminNote((m) => ({ ...m, [o.id]: e.target.value }))} />
                    <Button variant="outline" onClick={() => saveAdminNote(o.id)}><Save className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">تاریخچه وضعیت</p>
                  <div className="space-y-2">
                    {(history[o.id] ?? []).map((h) => (
                      <div key={h.id} className="bg-secondary/40 rounded-lg p-3 text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium text-gold">{statusLabel(h.status)}</span>
                          <span className="text-xs text-muted-foreground">{new Date(h.created_at).toLocaleString("fa-IR")}</span>
                        </div>
                        {h.note && <p className="text-muted-foreground mt-1">{h.note}</p>}
                      </div>
                    ))}
                    {(history[o.id]?.length ?? 0) === 0 && <p className="text-xs text-muted-foreground">تاریخچه‌ای موجود نیست</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {orders.length === 0 && <p className="text-center text-muted-foreground py-12">سفارشی وجود ندارد</p>}
      </div>
    </div>
  );
}
