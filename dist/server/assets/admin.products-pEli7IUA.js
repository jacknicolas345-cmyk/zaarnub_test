import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-shQjtIen.js";
import { c as createLucideIcon, j as Root, k as Trigger, l as Portal, C as Content, m as Close, X, n as cn, o as Title, O as Overlay, D as Description, s as supabase, B as Button, P as Plus, f as formatToman, T as Trash2, t as toast } from "./router-D3Y57DKv.js";
import { L as Label, I as Input } from "./label-DpW0_5zL.js";
import { T as Textarea } from "./textarea-Y4iCmba2.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-kff2OOlT.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./chevron-up-BUpuUoJV.js";
import "./check-CL4_ygkS.js";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const empty = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  category_id: null,
  material: "",
  weight: null,
  stock: 0,
  image_url: "",
  featured: false,
  images: []
};
function AdminProducts() {
  const [products, setProducts] = reactExports.useState([]);
  const [cats, setCats] = reactExports.useState([]);
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(empty);
  const [imageInput, setImageInput] = reactExports.useState("");
  const [varOpen, setVarOpen] = reactExports.useState(false);
  const [varProduct, setVarProduct] = reactExports.useState(null);
  const [variants, setVariants] = reactExports.useState([]);
  const load = () => supabase.from("products").select("*").order("created_at", {
    ascending: false
  }).then(({
    data
  }) => setProducts(data ?? []));
  reactExports.useEffect(() => {
    load();
    supabase.from("categories").select("id,name").then(({
      data
    }) => setCats(data ?? []));
  }, []);
  const openNew = () => {
    setEditing(null);
    setForm(empty);
    setImageInput("");
    setOpen(true);
  };
  const openEdit = (p) => {
    setEditing(p);
    const {
      id,
      ...rest
    } = p;
    setForm({
      ...rest,
      images: rest.images ?? []
    });
    setImageInput("");
    setOpen(true);
  };
  const addImage = () => {
    const url = imageInput.trim();
    if (!url) return;
    setForm({
      ...form,
      images: [...form.images, url]
    });
    setImageInput("");
  };
  const removeImage = (i) => setForm({
    ...form,
    images: form.images.filter((_, idx) => idx !== i)
  });
  const save = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-")
    };
    const {
      error
    } = editing ? await supabase.from("products").update(payload).eq("id", editing.id) : await supabase.from("products").insert(payload);
    if (error) toast.error(error.message);
    else {
      toast.success("ذخیره شد");
      setOpen(false);
      load();
    }
  };
  const del = async (id) => {
    if (!confirm("حذف شود؟")) return;
    const {
      error
    } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("حذف شد");
      load();
    }
  };
  const openVariants = async (p) => {
    setVarProduct(p);
    const {
      data
    } = await supabase.from("product_variants").select("*").eq("product_id", p.id).order("created_at");
    setVariants(data ?? []);
    setVarOpen(true);
  };
  const addVariant = () => setVariants([...variants, {
    name: "",
    price: varProduct?.price ?? 0,
    stock: 0,
    weight: null
  }]);
  const updateVariant = (i, patch) => setVariants(variants.map((v, idx) => idx === i ? {
    ...v,
    ...patch
  } : v));
  const removeVariant = async (i) => {
    const v = variants[i];
    if (v.id) await supabase.from("product_variants").delete().eq("id", v.id);
    setVariants(variants.filter((_, idx) => idx !== i));
  };
  const saveVariants = async () => {
    if (!varProduct) return;
    for (const v of variants) {
      if (!v.name) continue;
      if (v.id) {
        await supabase.from("product_variants").update({
          name: v.name,
          price: v.price,
          stock: v.stock,
          weight: v.weight
        }).eq("id", v.id);
      } else {
        await supabase.from("product_variants").insert({
          product_id: varProduct.id,
          name: v.name,
          price: v.price,
          stock: v.stock,
          weight: v.weight
        });
      }
    }
    toast.success("نسخه‌ها ذخیره شد");
    setVarOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "محصولات" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openNew, className: "bg-gradient-gold text-primary-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "ml-1 h-4 w-4" }),
          " محصول جدید"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", dir: "rtl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "ویرایش" : "محصول جدید" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "نام" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.name, onChange: (e) => setForm({
                  ...form,
                  name: e.target.value
                }), required: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "شناسه (slug)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.slug, onChange: (e) => setForm({
                  ...form,
                  slug: e.target.value
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "قیمت (تومان)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.price, onChange: (e) => setForm({
                  ...form,
                  price: Number(e.target.value)
                }), required: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "موجودی" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.stock, onChange: (e) => setForm({
                  ...form,
                  stock: Number(e.target.value)
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "جنس" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.material ?? "", onChange: (e) => setForm({
                  ...form,
                  material: e.target.value
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "وزن (گرم)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", value: form.weight ?? "", onChange: (e) => setForm({
                  ...form,
                  weight: e.target.value ? Number(e.target.value) : null
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "دسته‌بندی" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.category_id ?? "", onValueChange: (v) => setForm({
                  ...form,
                  category_id: v || null
                }), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "انتخاب کنید" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "تصویر اصلی (URL)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.image_url ?? "", onChange: (e) => setForm({
                  ...form,
                  image_url: e.target.value
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "گالری تصاویر اضافی" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: imageInput, onChange: (e) => setImageInput(e.target.value), placeholder: "https://..." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: addImage, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
                ] }),
                form.images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 mt-3", children: form.images.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square rounded-lg overflow-hidden bg-secondary group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", className: "w-full h-full object-cover" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => removeImage(i), className: "absolute top-1 left-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
                ] }, i)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "توضیحات" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.description ?? "", onChange: (e) => setForm({
                  ...form,
                  description: e.target.value
                }), rows: 3 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "featured", checked: form.featured, onChange: (e) => setForm({
                  ...form,
                  featured: e.target.checked
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "featured", children: "محصول ویژه" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full bg-gradient-gold text-primary-foreground", children: "ذخیره" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl shadow-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right", children: "نام" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right", children: "قیمت" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right", children: "موجودی" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-gold", children: formatToman(p.price) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: p.stock }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => openVariants(p), title: "نسخه‌ها", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => openEdit(p), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => del(p.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
        ] })
      ] }, p.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: varOpen, onOpenChange: setVarOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "نسخه‌های ",
        varProduct?.name
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        variants.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-2 items-end bg-secondary/30 p-3 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "نام نسخه" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: v.name, onChange: (e) => updateVariant(i, {
              name: e.target.value
            }), placeholder: "مثلاً سایز ۵۲" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "قیمت" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: v.price, onChange: (e) => updateVariant(i, {
              price: Number(e.target.value)
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "موجودی" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: v.stock, onChange: (e) => updateVariant(i, {
              stock: Number(e.target.value)
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "وزن" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", value: v.weight ?? "", onChange: (e) => updateVariant(i, {
              weight: e.target.value ? Number(e.target.value) : null
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => removeVariant(i), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
        ] }, i)),
        variants.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-6 text-sm", children: "نسخه‌ای ثبت نشده" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", onClick: addVariant, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "ml-1 h-4 w-4" }),
            " افزودن نسخه"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: saveVariants, className: "bg-gradient-gold text-primary-foreground", children: "ذخیره همه" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminProducts as component
};
