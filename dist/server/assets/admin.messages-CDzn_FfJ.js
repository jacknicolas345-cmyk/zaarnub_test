import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-shQjtIen.js";
import { c as createLucideIcon, B as Button, T as Trash2, s as supabase, t as toast } from "./router-D3Y57DKv.js";
import { M as Mail } from "./mail-DfmuJbiw.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  [
    "path",
    {
      d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z",
      key: "1jhwl8"
    }
  ],
  ["path", { d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10", key: "1qfld7" }]
];
const MailOpen = createLucideIcon("mail-open", __iconNode);
function AdminMessages() {
  const [msgs, setMsgs] = reactExports.useState([]);
  const load = () => supabase.from("contact_messages").select("*").order("created_at", {
    ascending: false
  }).then(({
    data
  }) => setMsgs(data ?? []));
  reactExports.useEffect(() => {
    load();
  }, []);
  const toggleRead = async (m) => {
    await supabase.from("contact_messages").update({
      is_read: !m.is_read
    }).eq("id", m.id);
    load();
  };
  const del = async (id) => {
    if (!confirm("حذف شود؟")) return;
    const {
      error
    } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("حذف شد");
      load();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-6", children: "پیام‌های تماس" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      msgs.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-card rounded-xl p-5 shadow-card ${!m.is_read ? "border-r-4 border-gold" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-between items-start gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold", children: [
              m.full_name,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground font-normal", children: [
                "— ",
                m.email
              ] })
            ] }),
            m.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: m.phone }),
            m.subject && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium mt-1", children: [
              "موضوع: ",
              m.subject
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(m.created_at).toLocaleString("fa-IR") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => toggleRead(m), title: m.is_read ? "خوانده‌نشده" : "خوانده‌شده", children: m.is_read ? /* @__PURE__ */ jsxRuntimeExports.jsx(MailOpen, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-gold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => del(m.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-7 whitespace-pre-wrap", children: m.message })
      ] }, m.id)),
      msgs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-12", children: "پیامی وجود ندارد" })
    ] })
  ] });
}
export {
  AdminMessages as component
};
