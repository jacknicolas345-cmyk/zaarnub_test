import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-C0sVlGP2.js";
import { u as useAuth, d as useCart, b as useNavigate, s as supabase, B as Button, f as formatToman, t as toast } from "./router-CWCw5y9L.js";
import { L as Label, I as Input } from "./label-BZyq7TrP.js";
import { T as Textarea } from "./textarea-Qa37E-KD.js";
import { o as objectType, s as stringType } from "./types-DGfzljZx.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const schema = objectType({
  full_name: stringType().trim().min(2, "نام را وارد کنید").max(100),
  phone: stringType().trim().min(10, "شماره معتبر").max(15),
  address: stringType().trim().min(10, "آدرس کامل").max(500),
  notes: stringType().max(500).optional()
});
function Checkout() {
  const {
    user,
    loading: authLoading
  } = useAuth();
  const {
    items,
    total,
    clear
  } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState({
    full_name: "",
    phone: "",
    address: "",
    notes: ""
  });
  const [submitting, setSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!authLoading && !user) navigate({
      to: "/auth",
      search: {
        redirect: "/checkout"
      }
    });
  }, [authLoading, user, navigate]);
  reactExports.useEffect(() => {
    if (user) {
      supabase.from("profiles").select("full_name,phone,address").eq("id", user.id).maybeSingle().then(({
        data
      }) => {
        if (data) setForm((f) => ({
          ...f,
          full_name: data.full_name || "",
          phone: data.phone || "",
          address: data.address || ""
        }));
      });
    }
  }, [user]);
  const submit = async (e) => {
    e.preventDefault();
    if (!user || items.length === 0) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const {
      data: order,
      error
    } = await supabase.from("orders").insert({
      user_id: user.id,
      full_name: parsed.data.full_name,
      phone: parsed.data.phone,
      address: parsed.data.address,
      notes: parsed.data.notes,
      total,
      status: "pending"
    }).select().single();
    if (error || !order) {
      toast.error("خطا در ثبت سفارش");
      setSubmitting(false);
      return;
    }
    const itemsPayload = items.map((i) => ({
      order_id: order.id,
      product_id: i.id,
      product_name: i.name,
      price: i.price,
      quantity: i.quantity
    }));
    await supabase.from("order_items").insert(itemsPayload);
    clear();
    toast.success("سفارش شما با موفقیت ثبت شد");
    navigate({
      to: "/orders"
    });
  };
  if (authLoading || !user) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20 text-center", children: "در حال بارگذاری..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "md:col-span-2 bg-card rounded-2xl p-8 shadow-card space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-4", children: "اطلاعات تحویل و پرداخت" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "نام و نام خانوادگی" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.full_name, onChange: (e) => setForm({
          ...form,
          full_name: e.target.value
        }), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "شماره موبایل" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.phone, onChange: (e) => setForm({
          ...form,
          phone: e.target.value
        }), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "آدرس کامل" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.address, onChange: (e) => setForm({
          ...form,
          address: e.target.value
        }), required: true, rows: 3 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "یادداشت (اختیاری)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.notes, onChange: (e) => setForm({
          ...form,
          notes: e.target.value
        }), rows: 2 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-secondary/50 rounded-lg p-4 text-sm text-muted-foreground", children: "💳 درگاه پرداخت آنلاین به‌زودی فعال می‌شود. در حال حاضر سفارش شما به صورت پرداخت در محل ثبت می‌شود و تیم ما برای هماهنگی تماس خواهد گرفت." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: submitting, size: "lg", className: "w-full bg-gradient-gold text-primary-foreground hover:opacity-90", children: submitting ? "در حال ثبت..." : "ثبت سفارش" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-6 shadow-luxe h-fit", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold mb-4", children: "خلاصه سفارش" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          i.name,
          " × ",
          i.quantity
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatToman(i.price * i.quantity) })
      ] }, i.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4 flex justify-between font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مبلغ نهایی" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: formatToman(total) })
      ] })
    ] })
  ] });
}
export {
  Checkout as component
};
