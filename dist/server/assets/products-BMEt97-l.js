import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-shQjtIen.js";
import { P as ProductCard } from "./ProductCard-C7z-Q_2j.js";
import { R as Route, B as Button } from "./router-D3Y57DKv.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const API = "https://zaarnub-test.onrender.com/";
function Products() {
  const {
    category
  } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [products, setProducts] = reactExports.useState([]);
  const [cats, setCats] = reactExports.useState([]);
  reactExports.useEffect(() => {
    fetch(`${API}/categories`).then((res) => res.json()).then((data) => setCats(data)).catch((err) => console.error("categories error:", err));
  }, []);
  reactExports.useEffect(() => {
    let url = `${API}/products`;
    if (category) url += `?category=${category}`;
    fetch(url).then((res) => res.json()).then((data) => setProducts(data)).catch((err) => console.error("products error:", err));
  }, [category]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-8", children: "محصولات" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: !category ? "default" : "outline", size: "sm", onClick: () => navigate({
        search: {
          category: void 0
        }
      }), children: "همه" }),
      cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: category === c.slug ? "default" : "outline", size: "sm", onClick: () => navigate({
        search: {
          category: c.slug
        }
      }), children: c.name }, c.id))
    ] }),
    products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-12", children: "محصولی یافت نشد" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
  ] });
}
export {
  Products as component
};
