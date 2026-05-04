import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Truck, ShieldCheck, Gem } from "lucide-react";
import heroImg from "@/assets/hero-jewelry.jpg";

export const Route = createFileRoute("/")({ component: Home });

type Product = { id: string; name: string; slug: string; price: number; image_url: string | null; material: string | null };
type Cat = { id: string; name: string; slug: string };

function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    supabase.from("products").select("id,name,slug,price,image_url,material").eq("featured", true).limit(4)
      .then(({ data }) => setFeatured(data ?? []));
    supabase.from("categories").select("id,name,slug").then(({ data }) => setCats(data ?? []));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-cream">
        <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-soft/40 text-sm">
              <Sparkles className="h-4 w-4 text-gold" /> گالری زرناب
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              زیبایی <span className="text-gold">طلایی</span><br/>برای لحظه‌های ماندگار
            </h1>
            <p className="text-muted-foreground text-lg leading-8">
              مجموعه‌ای از زیباترین انگشترها، گردنبندها و دستبندهای طلا و نقره با طراحی منحصر به فرد و کیفیت بی‌نظیر.
            </p>
            <div className="flex gap-3">
              <Link to="/products">
                <Button size="lg" className="bg-gradient-gold text-primary-foreground hover:opacity-90">
                  مشاهده محصولات <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline">درباره زرناب</Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src={heroImg} alt="گالری جواهرات" width={1920} height={1080} className="rounded-2xl shadow-luxe" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        {[
          { icon: ShieldCheck, title: "ضمانت اصالت", desc: "تمامی محصولات با گواهی اصالت ارسال می‌شوند" },
          { icon: Truck, title: "ارسال رایگان", desc: "ارسال رایگان به سراسر کشور برای خریدهای بالای ۵ میلیون" },
          { icon: Gem, title: "طراحی اختصاصی", desc: "امکان سفارش طراحی اختصاصی برای مناسبت‌های خاص" },
        ].map((f, i) => (
          <div key={i} className="bg-card rounded-2xl p-6 shadow-card text-center">
            <div className="inline-flex p-3 rounded-full bg-gold-soft/40 mb-3">
              <f.icon className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-bold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">دسته‌بندی‌ها</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cats.map((c) => (
            <Link key={c.id} to="/products" search={{ category: c.slug }}
              className="bg-gradient-cream border border-border rounded-xl p-8 text-center hover:shadow-luxe transition-all">
              <Gem className="h-8 w-8 text-gold mx-auto mb-3" />
              <h3 className="font-bold">{c.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">محصولات ویژه</h2>
          <Link to="/products" className="text-gold hover:underline text-sm">مشاهده همه ←</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
