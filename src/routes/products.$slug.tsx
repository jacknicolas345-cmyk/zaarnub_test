import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatToman } from "@/lib/format";
import { toast } from "sonner";
import { ShoppingBag, Minus, Plus, Check, Heart, Expand } from "lucide-react";
import { Lightbox } from "@/components/Lightbox";

type Product = {
  id: string; name: string; slug: string; description: string | null;
  price: number; image_url: string | null; images: string[] | null;
  material: string | null; weight: number | null; stock: number;
};
type Variant = { id: string; name: string; price: number; stock: number; weight: number | null };

export const Route = createFileRoute("/products/$slug")({ component: ProductDetail });

function ProductDetail() {
  const { slug } = Route.useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [variantId, setVariantId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [lightbox, setLightbox] = useState(false);
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    supabase.from("products").select("*").eq("slug", slug).maybeSingle().then(async ({ data }) => {
      setProduct(data as Product | null);
      if (data) {
        const { data: vs } = await supabase.from("product_variants").select("id,name,price,stock,weight").eq("product_id", data.id).order("price");
        setVariants(vs ?? []);
        if (vs && vs.length) setVariantId(vs[0].id);
      }
      setActiveImg(0); setQty(1);
      setLoading(false);
    });
  }, [slug]);

  const gallery = useMemo(() => {
    if (!product) return [] as string[];
    const arr = [...(product.images ?? [])];
    if (product.image_url && !arr.includes(product.image_url)) arr.unshift(product.image_url);
    return arr;
  }, [product]);

  const selectedVariant = variants.find((v) => v.id === variantId) ?? null;
  const price = selectedVariant?.price ?? product?.price ?? 0;
  const stock = selectedVariant?.stock ?? product?.stock ?? 0;
  const weight = selectedVariant?.weight ?? product?.weight ?? null;
  const pricePerGram = weight && weight > 0 ? Math.round(price / weight) : null;
  const basePrice = variants.length ? Math.min(...variants.map((v) => v.price)) : (product?.price ?? 0);

  if (loading) return <div className="container mx-auto px-4 py-20 text-center">در حال بارگذاری...</div>;
  if (!product) return <div className="container mx-auto px-4 py-20 text-center">محصول یافت نشد</div>;

  const addToCart = () => {
    const cartId = selectedVariant ? `${product.id}:${selectedVariant.id}` : product.id;
    const name = selectedVariant ? `${product.name} — ${selectedVariant.name}` : product.name;
    add({ id: cartId, name, price, image_url: gallery[0] ?? null }, qty);
    toast.success("به سبد خرید اضافه شد");
  };

  const onWishlist = async () => {
    if (!user) { toast.error("ابتدا وارد شوید"); return; }
    await toggle(product.id);
    toast.success(has(product.id) ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد");
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl overflow-hidden bg-secondary/50 shadow-luxe relative group cursor-zoom-in"
            onClick={() => gallery[activeImg] && setLightbox(true)}>
            {gallery[activeImg] && <img src={gallery[activeImg]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />}
            <div className="absolute top-3 left-3 bg-background/80 backdrop-blur rounded-full p-2 opacity-0 group-hover:opacity-100 transition">
              <Expand className="h-4 w-4" />
            </div>
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {gallery.map((url, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden bg-secondary shrink-0 border-2 ${activeImg === i ? "border-gold" : "border-transparent"}`}>
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <Button variant="outline" size="icon" onClick={onWishlist} title="علاقه‌مندی">
              <Heart className={`h-5 w-5 ${has(product.id) ? "fill-gold text-gold" : ""}`} />
            </Button>
          </div>

          <div>
            <p className="text-3xl text-gold font-bold">{formatToman(price)}</p>
            {pricePerGram && (
              <p className="text-sm text-muted-foreground mt-1">قیمت هر گرم: <span className="text-foreground font-medium">{formatToman(pricePerGram)}</span></p>
            )}
          </div>

          {variants.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">انتخاب نسخه</p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => {
                  const diff = v.price - basePrice;
                  const isActive = variantId === v.id;
                  return (
                    <button key={v.id} onClick={() => setVariantId(v.id)}
                      className={`px-4 py-2 rounded-lg border text-sm transition flex items-center gap-2 ${isActive ? "border-gold bg-gold-soft/30 text-gold" : "border-border hover:border-gold/50"}`}>
                      {isActive && <Check className="h-3 w-3" />}
                      <span>{v.name}</span>
                      {diff > 0 && <span className="text-xs opacity-70">+{formatToman(diff)}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            {product.material && <div className="bg-secondary/50 rounded-lg p-3"><div className="text-muted-foreground">جنس</div><div className="font-medium">{product.material}</div></div>}
            {weight && <div className="bg-secondary/50 rounded-lg p-3"><div className="text-muted-foreground">وزن</div><div className="font-medium">{weight} گرم</div></div>}
            <div className="bg-secondary/50 rounded-lg p-3"><div className="text-muted-foreground">موجودی</div><div className="font-medium">{stock > 0 ? `${stock} عدد` : "ناموجود"}</div></div>
          </div>

          {product.description && <p className="text-muted-foreground leading-8">{product.description}</p>}

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">تعداد:</span>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="h-3 w-3" /></Button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <Button size="icon" variant="outline" onClick={() => setQty(Math.min(stock || 99, qty + 1))}><Plus className="h-3 w-3" /></Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button size="lg" disabled={stock < 1} onClick={addToCart}
              className="bg-gradient-gold text-primary-foreground hover:opacity-90 flex-1">
              <ShoppingBag className="ml-2 h-4 w-4" /> افزودن به سبد
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate({ to: "/cart" })}>مشاهده سبد</Button>
          </div>
        </div>
      </div>
      {lightbox && <Lightbox images={gallery} startIndex={activeImg} onClose={() => setLightbox(false)} />}
    </>
  );
}
