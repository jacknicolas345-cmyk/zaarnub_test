import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-shQjtIen.js";
import { c as createLucideIcon, s as supabase, S as ShoppingBag, f as formatToman } from "./router-D3Y57DKv.js";
import { P as Package } from "./package-D4tMUehE.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function Dashboard() {
  const [stats, setStats] = reactExports.useState({
    products: 0,
    orders: 0,
    revenue: 0,
    customers: 0
  });
  reactExports.useEffect(() => {
    (async () => {
      const [p, o, oData, prof] = await Promise.all([supabase.from("products").select("*", {
        count: "exact",
        head: true
      }), supabase.from("orders").select("*", {
        count: "exact",
        head: true
      }), supabase.from("orders").select("total"), supabase.from("profiles").select("*", {
        count: "exact",
        head: true
      })]);
      setStats({
        products: p.count ?? 0,
        orders: o.count ?? 0,
        revenue: (oData.data ?? []).reduce((s, r) => s + Number(r.total), 0),
        customers: prof.count ?? 0
      });
    })();
  }, []);
  const cards = [{
    label: "محصولات",
    value: stats.products,
    icon: Package
  }, {
    label: "سفارش‌ها",
    value: stats.orders,
    icon: ShoppingBag
  }, {
    label: "مشتریان",
    value: stats.customers,
    icon: Users
  }, {
    label: "درآمد",
    value: formatToman(stats.revenue),
    icon: TrendingUp
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-6", children: "داشبورد" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: cards.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-5 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-6 w-6 text-gold mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: c.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold mt-1", children: c.value })
    ] }, i)) })
  ] });
}
export {
  Dashboard as component
};
