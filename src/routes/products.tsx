import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

type Product = { id: string; name: string; slug: string; price: number; image_url: string | null; material: string | null; category_id: string | null };
type Cat = { id: string; name: string; slug: string };

export const Route = createFileRoute("/products")({
  validateSearch: (s: Record<string, unknown>): { category?: string } => ({ category: (s.category as string) || undefined }),
  component: Products,
});

function Products() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    supabase.from("categories").select("*").then(({ data }) => setCats(data ?? []));
  }, []);

  useEffect(() => {
    let q = supabase.from("products").select("*").order("created_at", { ascending: false });
    if (category) {
      const cat = cats.find((c) => c.slug === category);
      if (cat) q = q.eq("category_id", cat.id);
    }
    q.then(({ data }) => setProducts(data ?? []));
  }, [category, cats]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">محصولات</h1>
      <div className="flex flex-wrap gap-2 mb-8">
        <Button variant={!category ? "default" : "outline"} size="sm"
          onClick={() => navigate({ search: { category: undefined } })}>همه</Button>
        {cats.map((c) => (
          <Button key={c.id} variant={category === c.slug ? "default" : "outline"} size="sm"
            onClick={() => navigate({ search: { category: c.slug } })}>{c.name}</Button>
        ))}
      </div>
      {products.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">محصولی یافت نشد</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
