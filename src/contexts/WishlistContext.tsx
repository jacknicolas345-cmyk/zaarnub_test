import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

type WishlistContextType = {
  ids: Set<string>;
  toggle: (productId: string) => Promise<void>;
  has: (productId: string) => boolean;
  loading: boolean;
};

const Ctx = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [ids, setIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { setIds(new Set()); return; }
    setLoading(true);
    supabase.from("wishlist_items").select("product_id").eq("user_id", user.id).then(({ data }) => {
      setIds(new Set((data ?? []).map((r) => r.product_id)));
      setLoading(false);
    });
  }, [user]);

  const toggle = async (productId: string) => {
    if (!user) return;
    const next = new Set(ids);
    if (next.has(productId)) {
      next.delete(productId);
      setIds(next);
      await supabase.from("wishlist_items").delete().eq("user_id", user.id).eq("product_id", productId);
    } else {
      next.add(productId);
      setIds(next);
      await supabase.from("wishlist_items").insert({ user_id: user.id, product_id: productId });
    }
  };

  const has = (id: string) => ids.has(id);

  return <Ctx.Provider value={{ ids, toggle, has, loading }}>{children}</Ctx.Provider>;
}

export const useWishlist = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWishlist must be inside WishlistProvider");
  return ctx;
};
