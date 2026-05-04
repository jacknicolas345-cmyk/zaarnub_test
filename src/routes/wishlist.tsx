import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import { Heart } from "lucide-react";

type Product = { id: string; name: string; slug: string; price: number; image_url: string | null; material: string | null };

export const Route = createFileRoute("/wishlist")({ component: Wishlist });

function Wishlist() {
  const { user } = useAuth();
  const { ids } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (ids.size === 0) { setProducts([]); return; }
    supabase.from("products").select("id,name,slug,price,image_url,material").in("id", Array.from(ids))
      .then(({ data }) => setProducts(data ?? []));
  }, [ids]);

  if (!user) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <p className="text-muted-foreground">برای مشاهده علاقه‌مندی‌ها ابتدا <Link to="/auth" className="text-gold">وارد شوید</Link></p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2"><Heart className="h-7 w-7 text-gold fill-gold" /> علاقه‌مندی‌ها</h1>
      {products.length === 0 ? (
        <p className="text-center text-muted-foreground py-20">هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
