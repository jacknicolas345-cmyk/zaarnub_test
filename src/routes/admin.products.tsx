import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus, X, Layers } from "lucide-react";
import { formatToman } from "@/lib/format";
import { toast } from "sonner";

type Product = {
  id: string; name: string; slug: string; description: string | null;
  price: number; category_id: string | null; material: string | null;
  weight: number | null; stock: number; image_url: string | null; featured: boolean;
  images: string[];
};
type Cat = { id: string; name: string };
type Variant = { id?: string; name: string; price: number; stock: number; weight: number | null };

export const Route = createFileRoute("/admin/products")({ component: AdminProducts });

const empty: Omit<Product, "id"> = {
  name: "", slug: "", description: "", price: 0, category_id: null,
  material: "", weight: null, stock: 0, image_url: "", featured: false, images: [],
};

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(empty);
  const [imageInput, setImageInput] = useState("");

  // variants dialog state
  const [varOpen, setVarOpen] = useState(false);
  const [varProduct, setVarProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);

  const load = () => supabase.from("products").select("*").order("created_at", { ascending: false }).then(({ data }) => setProducts((data as Product[]) ?? []));

  useEffect(() => {
    load();
    supabase.from("categories").select("id,name").then(({ data }) => setCats(data ?? []));
  }, []);

  const openNew = () => { setEditing(null); setForm(empty); setImageInput(""); setOpen(true); };
  const openEdit = (p: Product) => { setEditing(p); const { id, ...rest } = p; void id; setForm({ ...rest, images: rest.images ?? [] }); setImageInput(""); setOpen(true); };

  const addImage = () => {
    const url = imageInput.trim();
    if (!url) return;
    setForm({ ...form, images: [...form.images, url] });
    setImageInput("");
  };
  const removeImage = (i: number) => setForm({ ...form, images: form.images.filter((_, idx) => idx !== i) });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-") };
    const { error } = editing
      ? await supabase.from("products").update(payload).eq("id", editing.id)
      : await supabase.from("products").insert(payload);
    if (error) toast.error(error.message); else { toast.success("ذخیره شد"); setOpen(false); load(); }
  };

  const del = async (id: string) => {
    if (!confirm("حذف شود؟")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("حذف شد"); load(); }
  };

  const openVariants = async (p: Product) => {
    setVarProduct(p);
    const { data } = await supabase.from("product_variants").select("*").eq("product_id", p.id).order("created_at");
    setVariants((data as Variant[]) ?? []);
    setVarOpen(true);
  };
  const addVariant = () => setVariants([...variants, { name: "", price: varProduct?.price ?? 0, stock: 0, weight: null }]);
  const updateVariant = (i: number, patch: Partial<Variant>) => setVariants(variants.map((v, idx) => idx === i ? { ...v, ...patch } : v));
  const removeVariant = async (i: number) => {
    const v = variants[i];
    if (v.id) await supabase.from("product_variants").delete().eq("id", v.id);
    setVariants(variants.filter((_, idx) => idx !== i));
  };
  const saveVariants = async () => {
    if (!varProduct) return;
    for (const v of variants) {
      if (!v.name) continue;
      if (v.id) {
        await supabase.from("product_variants").update({ name: v.name, price: v.price, stock: v.stock, weight: v.weight }).eq("id", v.id);
      } else {
        await supabase.from("product_variants").insert({ product_id: varProduct.id, name: v.name, price: v.price, stock: v.stock, weight: v.weight });
      }
    }
    toast.success("نسخه‌ها ذخیره شد");
    setVarOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">محصولات</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button onClick={openNew} className="bg-gradient-gold text-primary-foreground"><Plus className="ml-1 h-4 w-4" /> محصول جدید</Button></DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
            <DialogHeader><DialogTitle>{editing ? "ویرایش" : "محصول جدید"}</DialogTitle></DialogHeader>
            <form onSubmit={save} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>نام</Label><Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required /></div>
                <div><Label>شناسه (slug)</Label><Input value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} /></div>
                <div><Label>قیمت (تومان)</Label><Input type="number" value={form.price} onChange={(e) => setForm({...form, price: Number(e.target.value)})} required /></div>
                <div><Label>موجودی</Label><Input type="number" value={form.stock} onChange={(e) => setForm({...form, stock: Number(e.target.value)})} /></div>
                <div><Label>جنس</Label><Input value={form.material ?? ""} onChange={(e) => setForm({...form, material: e.target.value})} /></div>
                <div><Label>وزن (گرم)</Label><Input type="number" step="0.01" value={form.weight ?? ""} onChange={(e) => setForm({...form, weight: e.target.value ? Number(e.target.value) : null})} /></div>
                <div className="col-span-2"><Label>دسته‌بندی</Label>
                  <Select value={form.category_id ?? ""} onValueChange={(v) => setForm({...form, category_id: v || null})}>
                    <SelectTrigger><SelectValue placeholder="انتخاب کنید" /></SelectTrigger>
                    <SelectContent>{cats.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="col-span-2"><Label>تصویر اصلی (URL)</Label><Input value={form.image_url ?? ""} onChange={(e) => setForm({...form, image_url: e.target.value})} /></div>

                <div className="col-span-2">
                  <Label>گالری تصاویر اضافی</Label>
                  <div className="flex gap-2 mt-1">
                    <Input value={imageInput} onChange={(e) => setImageInput(e.target.value)} placeholder="https://..." />
                    <Button type="button" variant="outline" onClick={addImage}><Plus className="h-4 w-4" /></Button>
                  </div>
                  {form.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      {form.images.map((url, i) => (
                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-secondary group">
                          <img src={url} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeImage(i)}
                            className="absolute top-1 left-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="col-span-2"><Label>توضیحات</Label><Textarea value={form.description ?? ""} onChange={(e) => setForm({...form, description: e.target.value})} rows={3} /></div>
                <div className="col-span-2 flex items-center gap-2">
                  <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({...form, featured: e.target.checked})} />
                  <Label htmlFor="featured">محصول ویژه</Label>
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-gold text-primary-foreground">ذخیره</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50">
            <tr><th className="p-3 text-right">نام</th><th className="p-3 text-right">قیمت</th><th className="p-3 text-right">موجودی</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-3">{p.name}</td>
                <td className="p-3 text-gold">{formatToman(p.price)}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 flex gap-2 justify-end">
                  <Button size="icon" variant="ghost" onClick={() => openVariants(p)} title="نسخه‌ها"><Layers className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => del(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Variants dialog */}
      <Dialog open={varOpen} onOpenChange={setVarOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader><DialogTitle>نسخه‌های {varProduct?.name}</DialogTitle></DialogHeader>
          <div className="space-y-2">
            {variants.map((v, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-end bg-secondary/30 p-3 rounded-lg">
                <div className="col-span-4"><Label>نام نسخه</Label><Input value={v.name} onChange={(e) => updateVariant(i, { name: e.target.value })} placeholder="مثلاً سایز ۵۲" /></div>
                <div className="col-span-3"><Label>قیمت</Label><Input type="number" value={v.price} onChange={(e) => updateVariant(i, { price: Number(e.target.value) })} /></div>
                <div className="col-span-2"><Label>موجودی</Label><Input type="number" value={v.stock} onChange={(e) => updateVariant(i, { stock: Number(e.target.value) })} /></div>
                <div className="col-span-2"><Label>وزن</Label><Input type="number" step="0.01" value={v.weight ?? ""} onChange={(e) => updateVariant(i, { weight: e.target.value ? Number(e.target.value) : null })} /></div>
                <div className="col-span-1"><Button size="icon" variant="ghost" onClick={() => removeVariant(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button></div>
              </div>
            ))}
            {variants.length === 0 && <p className="text-center text-muted-foreground py-6 text-sm">نسخه‌ای ثبت نشده</p>}
            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" onClick={addVariant}><Plus className="ml-1 h-4 w-4" /> افزودن نسخه</Button>
              <Button type="button" onClick={saveVariants} className="bg-gradient-gold text-primary-foreground">ذخیره همه</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
