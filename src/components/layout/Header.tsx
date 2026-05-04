import { Link } from "@tanstack/react-router";
import { User, Sparkles, LayoutDashboard, LogOut, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";

export function Header() {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Sparkles className="h-5 w-5 text-gold" />
          <span>زرناب</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-gold" }} className="hover:text-gold transition-colors">خانه</Link>
          <Link to="/products" activeProps={{ className: "text-gold" }} className="hover:text-gold transition-colors">محصولات</Link>
          <Link to="/about" activeProps={{ className: "text-gold" }} className="hover:text-gold transition-colors">درباره ما</Link>
          <Link to="/contact" activeProps={{ className: "text-gold" }} className="hover:text-gold transition-colors">تماس</Link>
        </nav>
        <div className="flex items-center gap-1">
          {isAdmin && (
            <Link to="/admin">
              <Button variant="ghost" size="icon" title="پنل مدیریت">
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </Link>
          )}
          {user && (
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" title="علاقه‌مندی‌ها">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
          )}
          {user ? (
            <Button variant="ghost" size="icon" title="خروج" onClick={signOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Link to="/auth"><Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button></Link>
          )}
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
