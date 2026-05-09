import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-C0sVlGP2.js";
import { u as useAuth, b as useNavigate, s as supabase, L as Link, f as formatToman, B as Button } from "./router-CWCw5y9L.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-BRvg6AP1.js";
import { C as Check } from "./check-P9yooXAD.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const STATUS = {
  pending: "در انتظار",
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
  cancelled: "لغو شده"
};
const STEPS = ["pending", "processing", "shipped", "delivered"];
function OrdersPage() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = reactExports.useState([]);
  const [open, setOpen] = reactExports.useState(null);
  const [history, setHistory] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/auth",
      search: {
        redirect: "/orders"
      }
    });
  }, [loading, user, navigate]);
  reactExports.useEffect(() => {
    if (user) supabase.from("orders").select("id,total,status,created_at,full_name").order("created_at", {
      ascending: false
    }).then(({
      data
    }) => setOrders(data ?? []));
  }, [user]);
  const toggle = async (id) => {
    if (open === id) {
      setOpen(null);
      return;
    }
    setOpen(id);
    if (!history[id]) {
      const {
        data
      } = await supabase.from("order_status_history").select("id,status,note,created_at").eq("order_id", id).order("created_at", {
        ascending: false
      });
      setHistory((h) => ({
        ...h,
        [id]: data ?? []
      }));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-8", children: "سفارش‌های من" }),
    orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
      "هنوز سفارشی ثبت نکرده‌اید. ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "text-gold hover:underline", children: "شروع خرید" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: orders.map((o) => {
      const cancelled = o.status === "cancelled";
      const stepIdx = STEPS.indexOf(o.status);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl p-5 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-between items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "سفارش #",
              o.id.slice(0, 8)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: new Date(o.created_at).toLocaleDateString("fa-IR") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full bg-gold-soft/40 text-sm", children: STATUS[o.status] ?? o.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gold font-bold", children: formatToman(o.total) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => toggle(o.id), children: [
            open === o.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4 ml-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 ml-1" }),
            " جزئیات"
          ] })
        ] }),
        open === o.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 border-t border-border pt-5 space-y-5", children: [
          !cancelled && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: STEPS.map((s, i) => {
            const done = i <= stepIdx;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-8 w-8 rounded-full flex items-center justify-center border-2 ${done ? "bg-gradient-gold text-primary-foreground border-gold" : "border-border bg-secondary text-muted-foreground"}`, children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: i + 1 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs mt-2 ${done ? "text-foreground" : "text-muted-foreground"}`, children: STATUS[s] }),
              i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute top-4 right-1/2 left-[-50%] h-0.5 ${i < stepIdx ? "bg-gold" : "bg-border"}`, style: {
                zIndex: -1
              } })
            ] }, s);
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-2", children: "تاریخچه" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (history[o.id] ?? []).map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/40 rounded-lg p-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gold", children: STATUS[h.status] ?? h.status }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(h.created_at).toLocaleString("fa-IR") })
              ] }),
              h.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: h.note })
            ] }, h.id)) })
          ] })
        ] })
      ] }, o.id);
    }) })
  ] });
}
export {
  OrdersPage as component
};
