import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatToman } from "@/lib/format";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export function CartDrawer() {
  const { items, count, total, setQty, remove } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goCheckout = () => { setOpen(false); navigate({ to: "/checkout" }); };
  const goCart = () => { setOpen(false); navigate({ to: "/cart" }); };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-gold text-primary-foreground text-[10px] font-bold flex items-center justify-center">
              {count}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-md flex flex-col" dir="rtl">
        <SheetHeader>
          <SheetTitle>سبد خرید ({count})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">سبد شما خالی است</p>
            <Link to="/products" onClick={() => setOpen(false)}>
              <Button className="bg-gradient-gold text-primary-foreground">مشاهده محصولات</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {items.map((it) => (
                <div key={it.id} className="flex gap-3 bg-secondary/30 rounded-lg p-3">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-secondary shrink-0">
                    {it.image_url && <img src={it.image_url} alt={it.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2">{it.name}</p>
                    <p className="text-gold text-sm font-bold mt-1">{formatToman(it.price)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => setQty(it.id, it.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                        <span className="w-7 text-center text-sm">{it.quantity}</span>
                        <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => setQty(it.id, it.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                      </div>
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => remove(it.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between font-bold">
                <span>جمع کل</span>
                <span className="text-gold">{formatToman(total)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={goCart}>مشاهده سبد</Button>
                <Button className="bg-gradient-gold text-primary-foreground" onClick={goCheckout}>تسویه حساب</Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
