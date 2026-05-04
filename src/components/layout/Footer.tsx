import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg mb-3">
            <Sparkles className="h-5 w-5 text-gold" /> زرناب
          </div>
          <p className="text-sm text-muted-foreground leading-7">
            گالری آنلاین جواهرات فاخر — انگشتر، گردنبند، دستبند و گوشواره از طلا و نقره با طراحی منحصر به فرد.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">دسترسی سریع</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>محصولات</li><li>درباره ما</li><li>قوانین خرید</li><li>پشتیبانی</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">تماس</h4>
          <p className="text-sm text-muted-foreground leading-7">
            تهران، خیابان فرشته<br/>۰۲۱-۸۸۸۸۸۸۸۸<br/>info@zarnab.shop
          </p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} زرناب — تمامی حقوق محفوظ است
      </div>
    </footer>
  );
}
