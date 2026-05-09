import { r as reactExports, U as jsxRuntimeExports, $ as Outlet } from "./worker-entry-Bk7_Ycu0.js";
import { c as createLucideIcon, u as useAuth, b as useNavigate, L as Link, g as LayoutDashboard, S as ShoppingBag } from "./router-Y6i6w5uK.js";
import { P as Package } from "./package-BUCKLndf.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ]
];
const MessageSquare = createLucideIcon("message-square", __iconNode);
function AdminLayout() {
  const {
    user,
    isAdmin,
    loading
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!loading) {
      if (!user) navigate({
        to: "/auth",
        search: {
          redirect: "/admin"
        }
      });
      else if (!isAdmin) navigate({
        to: "/"
      });
    }
  }, [loading, user, isAdmin, navigate]);
  if (loading || !user || !isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20 text-center", children: loading ? "..." : "دسترسی مجاز نیست" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 grid md:grid-cols-[220px_1fr] gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "bg-card rounded-2xl p-4 shadow-card h-fit space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold mb-3 px-3", children: "پنل مدیریت" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", activeOptions: {
        exact: true
      }, activeProps: {
        className: "bg-gold-soft/40 text-gold"
      }, className: "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4" }),
        " داشبورد"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/products", activeProps: {
        className: "bg-gold-soft/40 text-gold"
      }, className: "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }),
        " محصولات"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/orders", activeProps: {
        className: "bg-gold-soft/40 text-gold"
      }, className: "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
        " سفارش‌ها"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/messages", activeProps: {
        className: "bg-gold-soft/40 text-gold"
      }, className: "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
        " پیام‌ها"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  AdminLayout as component
};
