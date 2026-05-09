import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-C0sVlGP2.js";
import { c as createLucideIcon, f as formatToman, B as Button, s as supabase, t as toast } from "./router-CWCw5y9L.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Dt6Zaskq.js";
import { T as Textarea } from "./textarea-Qa37E-KD.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-BRvg6AP1.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./check-P9yooXAD.js";
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const STATUSES = [{
  v: "pending",
  l: "در انتظار"
}, {
  v: "processing",
  l: "در حال پردازش"
}, {
  v: "shipped",
  l: "ارسال شده"
}, {
  v: "delivered",
  l: "تحویل شده"
}, {
  v: "cancelled",
  l: "لغو شده"
}];
const statusLabel = (v) => STATUSES.find((s) => s.v === v)?.l ?? v;
function AdminOrders() {
  const [orders, setOrders] = reactExports.useState([]);
  const [open, setOpen] = reactExports.useState(null);
  const [history, setHistory] = reactExports.useState({});
  const [adminNote, setAdminNote] = reactExports.useState({});
  const [statusNote, setStatusNote] = reactExports.useState({});
  const load = () => supabase.from("orders").select("*").order("created_at", {
    ascending: false
  }).then(({
    data
  }) => {
    const list = data ?? [];
    setOrders(list);
    const map = {};
    list.forEach((o) => {
      map[o.id] = o.admin_notes ?? "";
    });
    setAdminNote(map);
  });
  reactExports.useEffect(() => {
    load();
  }, []);
  const loadHistory = async (id) => {
    const {
      data
    } = await supabase.from("order_status_history").select("id,status,note,created_at").eq("order_id", id).order("created_at", {
      ascending: false
    });
    setHistory((h) => ({
      ...h,
      [id]: data ?? []
    }));
  };
  const toggle = (id) => {
    if (open === id) {
      setOpen(null);
      return;
    }
    setOpen(id);
    if (!history[id]) loadHistory(id);
  };
  const updateStatus = async (id, status) => {
    const note = statusNote[id]?.trim() || null;
    const {
      error
    } = await supabase.from("orders").update({
      status
    }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (note) {
      const {
        data: latest
      } = await supabase.from("order_status_history").select("id").eq("order_id", id).order("created_at", {
        ascending: false
      }).limit(1);
      if (latest?.[0]) await supabase.from("order_status_history").update({
        note
      }).eq("id", latest[0].id);
    }
    setStatusNote((m) => ({
      ...m,
      [id]: ""
    }));
    toast.success("به‌روزرسانی شد");
    load();
    if (open === id) loadHistory(id);
  };
  const saveAdminNote = async (id) => {
    const {
      error
    } = await supabase.from("orders").update({
      admin_notes: adminNote[id] || null
    }).eq("id", id);
    if (error) toast.error(error.message);
    else toast.success("یادداشت ذخیره شد");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-6", children: "سفارش‌ها" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl p-5 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-between items-start gap-4 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: o.full_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: o.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: o.address }),
            o.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mt-2", children: [
              "📝 ",
              o.notes
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gold font-bold text-lg", children: formatToman(o.total) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(o.created_at).toLocaleString("fa-IR") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "وضعیت" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: o.status, onValueChange: (v) => updateStatus(o.id, v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.v, children: s.l }, s.v)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[200px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "یادداشت برای تغییر بعدی وضعیت" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 1, value: statusNote[o.id] ?? "", onChange: (e) => setStatusNote((m) => ({
              ...m,
              [o.id]: e.target.value
            })), placeholder: "مثلاً: بسته‌بندی شد، کد رهگیری: ..." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => toggle(o.id), children: [
            open === o.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4 ml-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 ml-1" }),
            "تاریخچه"
          ] })
        ] }),
        open === o.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 border-t border-border pt-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "یادداشت داخلی ادمین" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: adminNote[o.id] ?? "", onChange: (e) => setAdminNote((m) => ({
                ...m,
                [o.id]: e.target.value
              })) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => saveAdminNote(o.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-2", children: "تاریخچه وضعیت" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              (history[o.id] ?? []).map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/40 rounded-lg p-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gold", children: statusLabel(h.status) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(h.created_at).toLocaleString("fa-IR") })
                ] }),
                h.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: h.note })
              ] }, h.id)),
              (history[o.id]?.length ?? 0) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "تاریخچه‌ای موجود نیست" })
            ] })
          ] })
        ] })
      ] }, o.id)),
      orders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-12", children: "سفارشی وجود ندارد" })
    ] })
  ] });
}
export {
  AdminOrders as component
};
