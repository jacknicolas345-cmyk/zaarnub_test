import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-shQjtIen.js";
import { c as createLucideIcon, B as Button, t as toast } from "./router-D3Y57DKv.js";
import { L as Label, I as Input } from "./label-DpW0_5zL.js";
import { T as Textarea } from "./textarea-Y4iCmba2.js";
import { M as Mail } from "./mail-DfmuJbiw.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function ContactPage() {
  const [form, setForm] = reactExports.useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = reactExports.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://zaarnub-test.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        toast.success("پیام شما ارسال شد");
        setForm({
          full_name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        toast.error("خطا در ارسال پیام");
      }
    } catch {
      toast.error("خطا در اتصال به سرور");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-8", children: "تماس با ما" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-4 mb-10", children: [{
      icon: Phone,
      title: "تلفن",
      value: "۰۲۱-۸۸۸۸۸۸۸۸"
    }, {
      icon: Mail,
      title: "ایمیل",
      value: "info@zarnab.shop"
    }, {
      icon: MapPin,
      title: "آدرس",
      value: "تهران، خیابان فرشته"
    }].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl p-6 shadow-card text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-8 w-8 text-gold mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-1", children: c.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: c.value })
    ] }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "bg-card rounded-2xl p-6 md:p-8 shadow-luxe space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-2", children: "ارسال پیام" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "نام و نام خانوادگی *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.full_name, onChange: (e) => setForm({
            ...form,
            full_name: e.target.value
          }), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ایمیل *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: form.email, onChange: (e) => setForm({
            ...form,
            email: e.target.value
          }), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "موبایل" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.phone, onChange: (e) => setForm({
            ...form,
            phone: e.target.value
          }), maxLength: 11 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "موضوع" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.subject, onChange: (e) => setForm({
            ...form,
            subject: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "پیام *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 5, value: form.message, onChange: (e) => setForm({
          ...form,
          message: e.target.value
        }), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: loading, className: "bg-gradient-gold text-primary-foreground hover:opacity-90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "ml-2 h-4 w-4" }),
        " ",
        loading ? "در حال ارسال..." : "ارسال پیام"
      ] })
    ] })
  ] });
}
export {
  ContactPage as component
};
