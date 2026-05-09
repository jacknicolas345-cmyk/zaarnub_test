import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-C0sVlGP2.js";
import { c as createLucideIcon, s as supabase, h as Sparkles, L as Link, B as Button } from "./router-CWCw5y9L.js";
import { P as ProductCard } from "./ProductCard-Oy4bUICf.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M10.5 3 8 9l4 13 4-13-2.5-6", key: "b3dvk1" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z",
      key: "7w4byz"
    }
  ],
  ["path", { d: "M2 9h20", key: "16fsjt" }]
];
const Gem = createLucideIcon("gem", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const heroImg = "/zaarnub_test/assets/hero-jewelry-ILdvfrvy.jpg";
function Home() {
  const [featured, setFeatured] = reactExports.useState([]);
  const [cats, setCats] = reactExports.useState([]);
  reactExports.useEffect(() => {
    supabase.from("products").select("id,name,slug,price,image_url,material").eq("featured", true).limit(4).then(({
      data
    }) => setFeatured(data ?? []));
    supabase.from("categories").select("id,name,slug").then(({
      data
    }) => setCats(data ?? []));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden bg-gradient-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-soft/40 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-gold" }),
          " گالری زرناب"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-6xl font-bold leading-tight", children: [
          "زیبایی ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "طلایی" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "برای لحظه‌های ماندگار"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-8", children: "مجموعه‌ای از زیباترین انگشترها، گردنبندها و دستبندهای طلا و نقره با طراحی منحصر به فرد و کیفیت بی‌نظیر." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "bg-gradient-gold text-primary-foreground hover:opacity-90", children: [
            "مشاهده محصولات ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", children: "درباره زرناب" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "گالری جواهرات", width: 1920, height: 1080, className: "rounded-2xl shadow-luxe" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto px-4 py-16 grid md:grid-cols-3 gap-6", children: [{
      icon: ShieldCheck,
      title: "ضمانت اصالت",
      desc: "تمامی محصولات با گواهی اصالت ارسال می‌شوند"
    }, {
      icon: Truck,
      title: "ارسال رایگان",
      desc: "ارسال رایگان به سراسر کشور برای خریدهای بالای ۵ میلیون"
    }, {
      icon: Gem,
      title: "طراحی اختصاصی",
      desc: "امکان سفارش طراحی اختصاصی برای مناسبت‌های خاص"
    }].map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-6 shadow-card text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex p-3 rounded-full bg-gold-soft/40 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-6 w-6 text-gold" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-2", children: f.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: f.desc })
    ] }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "دسته‌بندی‌ها" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", search: {
        category: c.slug
      }, className: "bg-gradient-cream border border-border rounded-xl p-8 text-center hover:shadow-luxe transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Gem, { className: "h-8 w-8 text-gold mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: c.name })
      ] }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold", children: "محصولات ویژه" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "text-gold hover:underline text-sm", children: "مشاهده همه ←" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: featured.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
    ] })
  ] });
}
export {
  Home as component
};
