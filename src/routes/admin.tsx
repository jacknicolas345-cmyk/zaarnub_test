import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Package, ShoppingBag, LayoutDashboard, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) navigate({ to: "/auth", search: { redirect: "/admin" } });
      else if (!isAdmin) navigate({ to: "/" });
    }
  }, [loading, user, isAdmin, navigate]);

  if (loading || !user || !isAdmin) {
    return <div className="container mx-auto px-4 py-20 text-center">{loading ? "..." : "دسترسی مجاز نیست"}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-[220px_1fr] gap-6">
      <aside className="bg-card rounded-2xl p-4 shadow-card h-fit space-y-1">
        <h2 className="font-bold mb-3 px-3">پنل مدیریت</h2>
        <Link to="/admin" activeOptions={{ exact: true }} activeProps={{ className: "bg-gold-soft/40 text-gold" }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm">
          <LayoutDashboard className="h-4 w-4" /> داشبورد
        </Link>
        <Link to="/admin/products" activeProps={{ className: "bg-gold-soft/40 text-gold" }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm">
          <Package className="h-4 w-4" /> محصولات
        </Link>
        <Link to="/admin/orders" activeProps={{ className: "bg-gold-soft/40 text-gold" }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm">
          <ShoppingBag className="h-4 w-4" /> سفارش‌ها
        </Link>
        <Link to="/admin/messages" activeProps={{ className: "bg-gold-soft/40 text-gold" }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-sm">
          <MessageSquare className="h-4 w-4" /> پیام‌ها
        </Link>
      </aside>
      <main><Outlet /></main>
    </div>
  );
}
