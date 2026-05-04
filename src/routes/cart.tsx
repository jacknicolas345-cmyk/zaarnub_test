import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import { formatToman } from "@/lib/format";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { items, remove, setQty, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">سبد خرید شما خالی است</h1>
        <Link to="/products"><Button className="bg-gradient-gold text-primary-foreground">مشاهده محصولات</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-3xl font-bold mb-4">سبد خرید</h1>
        {items.map((item) => (
          <div key={item.id} className="bg-card rounded-xl p-4 shadow-card flex gap-4 items-center">
            <div className="w-20 h-20 rounded-lg bg-secondary overflow-hidden shrink-0">
              {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-1">{item.name}</h3>
              <p className="text-gold font-bold">{formatToman(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" onClick={() => setQty(item.id, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button size="icon" variant="outline" onClick={() => setQty(item.id, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
            </div>
            <Button size="icon" variant="ghost" onClick={() => remove(item.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
          </div>
        ))}
      </div>
      <div className="bg-card rounded-2xl p-6 shadow-luxe h-fit space-y-4">
        <h2 className="font-bold text-lg">خلاصه سفارش</h2>
        <div className="flex justify-between text-sm"><span>جمع جزء</span><span>{formatToman(total)}</span></div>
        <div className="flex justify-between text-sm"><span>هزینه ارسال</span><span className="text-gold">رایگان</span></div>
        <div className="border-t border-border pt-4 flex justify-between font-bold"><span>مبلغ نهایی</span><span className="text-gold">{formatToman(total)}</span></div>
        <Link to="/checkout" className="block">
          <Button className="w-full bg-gradient-gold text-primary-foreground hover:opacity-90" size="lg">ادامه و پرداخت</Button>
        </Link>
      </div>
    </div>
  );
}
