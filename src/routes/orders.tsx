import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatToman } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

type Order = { id: string; total: number; status: string; created_at: string; full_name: string };
type HistoryRow = { id: string; status: string; note: string | null; created_at: string };

export const Route = createFileRoute("/orders")({ component: OrdersPage });

const STATUS: Record<string, string> = { pending: "در انتظار", processing: "در حال پردازش", shipped: "ارسال شده", delivered: "تحویل شده", cancelled: "لغو شده" };
const STEPS = ["pending", "processing", "shipped", "delivered"];

function OrdersPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [history, setHistory] = useState<Record<string, HistoryRow[]>>({});

  useEffect(() => { if (!loading && !user) navigate({ to: "/auth", search: { redirect: "/orders" } }); }, [loading, user, navigate]);

  useEffect(() => {
    if (user) supabase.from("orders").select("id,total,status,created_at,full_name").order("created_at", { ascending: false })
      .then(({ data }) => setOrders(data ?? []));
  }, [user]);

  const toggle = async (id: string) => {
    if (open === id) { setOpen(null); return; }
    setOpen(id);
    if (!history[id]) {
      const { data } = await supabase.from("order_status_history").select("id,status,note,created_at").eq("order_id", id).order("created_at", { ascending: false });
      setHistory((h) => ({ ...h, [id]: (data ?? []) as HistoryRow[] }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">سفارش‌های من</h1>
      {orders.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          هنوز سفارشی ثبت نکرده‌اید. <Link to="/products" className="text-gold hover:underline">شروع خرید</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => {
            const cancelled = o.status === "cancelled";
            const stepIdx = STEPS.indexOf(o.status);
            return (
              <div key={o.id} className="bg-card rounded-xl p-5 shadow-card">
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">سفارش #{o.id.slice(0, 8)}</p>
                    <p className="font-medium">{new Date(o.created_at).toLocaleDateString("fa-IR")}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-gold-soft/40 text-sm">{STATUS[o.status] ?? o.status}</span>
                  <p className="text-gold font-bold">{formatToman(o.total)}</p>
                  <Button variant="ghost" size="sm" onClick={() => toggle(o.id)}>
                    {open === o.id ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />} جزئیات
                  </Button>
                </div>

                {open === o.id && (
                  <div className="mt-5 border-t border-border pt-5 space-y-5">
                    {!cancelled && (
                      <div className="flex items-center justify-between">
                        {STEPS.map((s, i) => {
                          const done = i <= stepIdx;
                          return (
                            <div key={s} className="flex-1 flex flex-col items-center relative">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${done ? "bg-gradient-gold text-primary-foreground border-gold" : "border-border bg-secondary text-muted-foreground"}`}>
                                {done ? <Check className="h-4 w-4" /> : <span className="text-xs">{i + 1}</span>}
                              </div>
                              <span className={`text-xs mt-2 ${done ? "text-foreground" : "text-muted-foreground"}`}>{STATUS[s]}</span>
                              {i < STEPS.length - 1 && (
                                <div className={`absolute top-4 right-1/2 left-[-50%] h-0.5 ${i < stepIdx ? "bg-gold" : "bg-border"}`} style={{ zIndex: -1 }} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium mb-2">تاریخچه</p>
                      <div className="space-y-2">
                        {(history[o.id] ?? []).map((h) => (
                          <div key={h.id} className="bg-secondary/40 rounded-lg p-3 text-sm">
                            <div className="flex justify-between">
                              <span className="font-medium text-gold">{STATUS[h.status] ?? h.status}</span>
                              <span className="text-xs text-muted-foreground">{new Date(h.created_at).toLocaleString("fa-IR")}</span>
                            </div>
                            {h.note && <p className="text-muted-foreground mt-1">{h.note}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
