import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { formatToman } from "@/lib/format";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, customers: 0 });

  useEffect(() => {
    (async () => {
      const [p, o, oData, prof] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("total"),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
      ]);
      setStats({
        products: p.count ?? 0,
        orders: o.count ?? 0,
        revenue: (oData.data ?? []).reduce((s: number, r: { total: number }) => s + Number(r.total), 0),
        customers: prof.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "محصولات", value: stats.products, icon: Package },
    { label: "سفارش‌ها", value: stats.orders, icon: ShoppingBag },
    { label: "مشتریان", value: stats.customers, icon: Users },
    { label: "درآمد", value: formatToman(stats.revenue), icon: TrendingUp },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">داشبورد</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-card rounded-2xl p-5 shadow-card">
            <c.icon className="h-6 w-6 text-gold mb-2" />
            <p className="text-xs text-muted-foreground">{c.label}</p>
            <p className="text-xl font-bold mt-1">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
