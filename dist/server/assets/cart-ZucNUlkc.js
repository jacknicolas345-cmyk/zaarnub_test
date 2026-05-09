import { U as jsxRuntimeExports } from "./worker-entry-C0sVlGP2.js";
import { d as useCart, L as Link, B as Button, f as formatToman, M as Minus, P as Plus, T as Trash2 } from "./router-CWCw5y9L.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function CartPage() {
  const {
    items,
    remove,
    setQty,
    total
  } = useCart();
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-4", children: "سبد خرید شما خالی است" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-gradient-gold text-primary-foreground", children: "مشاهده محصولات" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-4", children: "سبد خرید" }),
      items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl p-4 shadow-card flex gap-4 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-lg bg-secondary overflow-hidden shrink-0", children: item.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image_url, alt: item.name, className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium mb-1", children: item.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gold font-bold", children: formatToman(item.price) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "outline", onClick: () => setQty(item.id, item.quantity - 1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center", children: item.quantity }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "outline", onClick: () => setQty(item.id, item.quantity + 1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => remove(item.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
      ] }, item.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-6 shadow-luxe h-fit space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg", children: "خلاصه سفارش" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "جمع جزء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatToman(total) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "هزینه ارسال" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "رایگان" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4 flex justify-between font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مبلغ نهایی" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: formatToman(total) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full bg-gradient-gold text-primary-foreground hover:opacity-90", size: "lg", children: "ادامه و پرداخت" }) })
    ] })
  ] });
}
export {
  CartPage as component
};
