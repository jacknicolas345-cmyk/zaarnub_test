// import { createFileRoute } from "@tanstack/react-router";
// import { useEffect, useState } from "react";

// // حذف
// // import { supabase } from "@/integrations/supabase/client";

// import { ProductCard } from "@/components/ProductCard";
// import { Button } from "@/components/ui/button";

// type Product = { id: string; name: string; slug: string; price: number; image_url: string | null; material: string | null; category_id: string | null };
// type Cat = { id: string; name: string; slug: string };

// export const Route = createFileRoute("/products")({
//   validateSearch: (s: Record<string, unknown>): { category?: string } => ({ category: (s.category as string) || undefined }),
//   component: Products,
// });

// function Products() {
//   const { category } = Route.useSearch();
//   const navigate = Route.useNavigate();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [cats, setCats] = useState<Cat[]>([]);

//   // حذف
//   // useEffect(() => {
//   //   supabase.from("categories").select("*").then(({ data }) => setCats(data ?? []));
//   // }, []);

//   useEffect(() => {
//     fetch("https://3000-xxxx.github.dev/categories")
//   .then(res => res.json())
//   .then(data => setCats(data));
//   }, []);

//   // حذف
//   // useEffect(() => {
//   //   let q = supabase.from("products").select("*").order("created_at", { ascending: false });
//   //   if (category) {
//   //     const cat = cats.find((c) => c.slug === category);
//   //     if (cat) q = q.eq("category_id", cat.id);
//   //   }
//   //   q.then(({ data }) => setProducts(data ?? []));
//   // }, [category, cats]);

//   useEffect(() => {
//     let url = "https://3000-xxxx.github.dev/products";
//     if (category) {
//       url += `?category=${category}`;
//     }
//     fetch(url)
//       .then(res => res.json())
//       .then(data => setProducts(data));
//   }, [category, cats]);

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold mb-8">محصولات</h1>
//       <div className="flex flex-wrap gap-2 mb-8">
//         <Button variant={!category ? "default" : "outline"} size="sm"
//           onClick={() => navigate({ search: { category: undefined } })}>همه</Button>
//         {cats.map((c) => (
//           <Button key={c.id} variant={category === c.slug ? "default" : "outline"} size="sm"
//             onClick={() => navigate({ search: { category: c.slug } })}>{c.name}</Button>
//         ))}
//       </div>
//       {products.length === 0 ? (
//         <p className="text-center text-muted-foreground py-12">محصولی یافت نشد</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {products.map((p) => <ProductCard key={p.id} product={p} />)}
//         </div>
//       )}
//     </div>
//   );
// }




// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const API = "https://fictional-space-doodle-gxq7pq49796rfw79r-3000.app.github.dev";

type Product = { id: string; name: string; slug: string; price: number; image_url: string | null; material: string | null; category: string | null };
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
    fetch(`${API}/categories`)
      .then(res => res.json())
      .then(data => setCats(data))
      .catch(err => console.error("categories error:", err));
  }, []);

  useEffect(() => {
    let url = `${API}/products`;
    if (category) url += `?category=${category}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("products error:", err));
  }, [category]);

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