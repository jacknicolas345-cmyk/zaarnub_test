import { Link } from "@tanstack/react-router";
import { formatToman } from "@/lib/format";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image_url: string | null;
  material: string | null;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-luxe transition-all duration-500"
    >
      <div className="aspect-square overflow-hidden bg-secondary/50">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">بدون تصویر</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-1 line-clamp-1">{product.name}</h3>
        {product.material && <p className="text-xs text-muted-foreground mb-2">{product.material}</p>}
        <p className="text-gold font-bold">{formatToman(product.price)}</p>
      </div>
    </Link>
  );
}
