import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-Bk7_Ycu0.js";
import { u as useAuth, a as useWishlist, s as supabase, L as Link, H as Heart } from "./router-Y6i6w5uK.js";
import { P as ProductCard } from "./ProductCard-YkzGx9uU.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Wishlist() {
  const {
    user
  } = useAuth();
  const {
    ids
  } = useWishlist();
  const [products, setProducts] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (ids.size === 0) {
      setProducts([]);
      return;
    }
    supabase.from("products").select("id,name,slug,price,image_url,material").in("id", Array.from(ids)).then(({
      data
    }) => setProducts(data ?? []));
  }, [ids]);
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
    "برای مشاهده علاقه‌مندی‌ها ابتدا ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "text-gold", children: "وارد شوید" })
  ] }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold mb-8 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-7 w-7 text-gold fill-gold" }),
      " علاقه‌مندی‌ها"
    ] }),
    products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-20", children: "هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
  ] });
}
export {
  Wishlist as component
};
