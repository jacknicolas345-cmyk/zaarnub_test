import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-Bk7_Ycu0.js";
import { c as createLucideIcon, X, i as Route, d as useCart, a as useWishlist, u as useAuth, b as useNavigate, s as supabase, B as Button, H as Heart, f as formatToman, M as Minus, P as Plus, S as ShoppingBag, t as toast } from "./router-Y6i6w5uK.js";
import { C as Check } from "./check-8dQPB01K.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$4 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$4);
const __iconNode$3 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "m15 15 6 6", key: "1s409w" }],
  ["path", { d: "m15 9 6-6", key: "ko1vev" }],
  ["path", { d: "M21 16v5h-5", key: "1ck2sf" }],
  ["path", { d: "M21 8V3h-5", key: "1qoq8a" }],
  ["path", { d: "M3 16v5h5", key: "1t08am" }],
  ["path", { d: "m3 21 6-6", key: "wwnumi" }],
  ["path", { d: "M3 8V3h5", key: "1ln10m" }],
  ["path", { d: "M9 9 3 3", key: "v551iv" }]
];
const Expand = createLucideIcon("expand", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode$1);
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomOut = createLucideIcon("zoom-out", __iconNode);
function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = reactExports.useState(startIndex);
  const [zoom, setZoom] = reactExports.useState(1);
  const [pos, setPos] = reactExports.useState({ x: 0, y: 0 });
  const [drag, setDrag] = reactExports.useState(null);
  const [touchStart, setTouchStart] = reactExports.useState(null);
  const next = reactExports.useCallback(() => {
    setIdx((i) => (i + 1) % images.length);
    setZoom(1);
    setPos({ x: 0, y: 0 });
  }, [images.length]);
  const prev = reactExports.useCallback(() => {
    setIdx((i) => (i - 1 + images.length) % images.length);
    setZoom(1);
    setPos({ x: 0, y: 0 });
  }, [images.length]);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") prev();
      if (e.key === "ArrowLeft") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);
  const onTouchStart = (e) => {
    if (zoom === 1) setTouchStart(e.touches[0].clientX);
  };
  const onTouchEnd = (e) => {
    if (touchStart === null || zoom !== 1) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prev();
      else next();
    }
    setTouchStart(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[100] bg-black/95 flex flex-col", dir: "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
        idx + 1,
        " / ",
        images.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setZoom((z) => Math.max(1, z - 0.5)), className: "p-2 hover:bg-white/10 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomOut, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setZoom((z) => Math.min(4, z + 0.5)), className: "p-2 hover:bg-white/10 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 hover:bg-white/10 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-1 relative overflow-hidden flex items-center justify-center",
        onTouchStart,
        onTouchEnd,
        onMouseDown: (e) => zoom > 1 && setDrag({ x: e.clientX - pos.x, y: e.clientY - pos.y }),
        onMouseMove: (e) => drag && setPos({ x: e.clientX - drag.x, y: e.clientY - drag.y }),
        onMouseUp: () => setDrag(null),
        onMouseLeave: () => setDrag(null),
        children: [
          images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: prev, className: "absolute left-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: next, className: "absolute right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-6 w-6" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: images[idx],
              alt: "",
              draggable: false,
              style: { transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`, cursor: zoom > 1 ? drag ? "grabbing" : "grab" : "zoom-in" },
              onClick: () => zoom === 1 && setZoom(2),
              className: "max-h-full max-w-full object-contain transition-transform duration-200 select-none"
            }
          )
        ]
      }
    ),
    images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 p-4 overflow-x-auto justify-center", children: images.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          setIdx(i);
          setZoom(1);
          setPos({ x: 0, y: 0 });
        },
        className: `w-16 h-16 rounded overflow-hidden shrink-0 border-2 ${i === idx ? "border-gold" : "border-transparent opacity-60"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", className: "w-full h-full object-cover" })
      },
      i
    )) })
  ] });
}
function ProductDetail() {
  const {
    slug
  } = Route.useParams();
  const [product, setProduct] = reactExports.useState(null);
  const [variants, setVariants] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [activeImg, setActiveImg] = reactExports.useState(0);
  const [variantId, setVariantId] = reactExports.useState(null);
  const [qty, setQty] = reactExports.useState(1);
  const [lightbox, setLightbox] = reactExports.useState(false);
  const {
    add
  } = useCart();
  const {
    has,
    toggle
  } = useWishlist();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    setLoading(true);
    supabase.from("products").select("*").eq("slug", slug).maybeSingle().then(async ({
      data
    }) => {
      setProduct(data);
      if (data) {
        const {
          data: vs
        } = await supabase.from("product_variants").select("id,name,price,stock,weight").eq("product_id", data.id).order("price");
        setVariants(vs ?? []);
        if (vs && vs.length) setVariantId(vs[0].id);
      }
      setActiveImg(0);
      setQty(1);
      setLoading(false);
    });
  }, [slug]);
  const gallery = reactExports.useMemo(() => {
    if (!product) return [];
    const arr = [...product.images ?? []];
    if (product.image_url && !arr.includes(product.image_url)) arr.unshift(product.image_url);
    return arr;
  }, [product]);
  const selectedVariant = variants.find((v) => v.id === variantId) ?? null;
  const price = selectedVariant?.price ?? product?.price ?? 0;
  const stock = selectedVariant?.stock ?? product?.stock ?? 0;
  const weight = selectedVariant?.weight ?? product?.weight ?? null;
  const pricePerGram = weight && weight > 0 ? Math.round(price / weight) : null;
  const basePrice = variants.length ? Math.min(...variants.map((v) => v.price)) : product?.price ?? 0;
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20 text-center", children: "در حال بارگذاری..." });
  if (!product) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20 text-center", children: "محصول یافت نشد" });
  const addToCart = () => {
    const cartId = selectedVariant ? `${product.id}:${selectedVariant.id}` : product.id;
    const name = selectedVariant ? `${product.name} — ${selectedVariant.name}` : product.name;
    add({
      id: cartId,
      name,
      price,
      image_url: gallery[0] ?? null
    }, qty);
    toast.success("به سبد خرید اضافه شد");
  };
  const onWishlist = async () => {
    if (!user) {
      toast.error("ابتدا وارد شوید");
      return;
    }
    await toggle(product.id);
    toast.success(has(product.id) ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12 grid md:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square rounded-2xl overflow-hidden bg-secondary/50 shadow-luxe relative group cursor-zoom-in", onClick: () => gallery[activeImg] && setLightbox(true), children: [
          gallery[activeImg] && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: gallery[activeImg], alt: product.name, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 bg-background/80 backdrop-blur rounded-full p-2 opacity-0 group-hover:opacity-100 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Expand, { className: "h-4 w-4" }) })
        ] }),
        gallery.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto", children: gallery.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveImg(i), className: `w-20 h-20 rounded-lg overflow-hidden bg-secondary shrink-0 border-2 ${activeImg === i ? "border-gold" : "border-transparent"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", className: "w-full h-full object-cover" }) }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: onWishlist, title: "علاقه‌مندی", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `h-5 w-5 ${has(product.id) ? "fill-gold text-gold" : ""}` }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl text-gold font-bold", children: formatToman(price) }),
          pricePerGram && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
            "قیمت هر گرم: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: formatToman(pricePerGram) })
          ] })
        ] }),
        variants.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "انتخاب نسخه" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: variants.map((v) => {
            const diff = v.price - basePrice;
            const isActive = variantId === v.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setVariantId(v.id), className: `px-4 py-2 rounded-lg border text-sm transition flex items-center gap-2 ${isActive ? "border-gold bg-gold-soft/30 text-gold" : "border-border hover:border-gold/50"}`, children: [
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: v.name }),
              diff > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs opacity-70", children: [
                "+",
                formatToman(diff)
              ] })
            ] }, v.id);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [
          product.material && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/50 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "جنس" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: product.material })
          ] }),
          weight && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/50 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "وزن" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
              weight,
              " گرم"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/50 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "موجودی" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: stock > 0 ? `${stock} عدد` : "ناموجود" })
          ] })
        ] }),
        product.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-8", children: product.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "تعداد:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "outline", onClick: () => setQty(Math.max(1, qty - 1)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-center font-medium", children: qty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "outline", onClick: () => setQty(Math.min(stock || 99, qty + 1)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", disabled: stock < 1, onClick: addToCart, className: "bg-gradient-gold text-primary-foreground hover:opacity-90 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "ml-2 h-4 w-4" }),
            " افزودن به سبد"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", onClick: () => navigate({
            to: "/cart"
          }), children: "مشاهده سبد" })
        ] })
      ] })
    ] }),
    lightbox && /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbox, { images: gallery, startIndex: activeImg, onClose: () => setLightbox(false) })
  ] });
}
export {
  ProductDetail as component
};
