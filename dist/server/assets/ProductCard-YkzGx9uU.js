import { U as jsxRuntimeExports } from "./worker-entry-Bk7_Ycu0.js";
import { L as Link, f as formatToman } from "./router-Y6i6w5uK.js";
function ProductCard({ product }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/products/$slug",
      params: { slug: product.slug },
      className: "group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-luxe transition-all duration-500",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-secondary/50", children: product.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: product.image_url,
            alt: product.name,
            loading: "lazy",
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-muted-foreground", children: "بدون تصویر" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium mb-1 line-clamp-1", children: product.name }),
          product.material && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: product.material }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gold font-bold", children: formatToman(product.price) })
        ] })
      ]
    }
  );
}
export {
  ProductCard as P
};
