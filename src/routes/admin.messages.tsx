import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, MailOpen } from "lucide-react";
import { toast } from "sonner";

type Msg = { id: string; full_name: string; email: string; phone: string | null; subject: string | null; message: string; is_read: boolean; created_at: string };

export const Route = createFileRoute("/admin/messages")({ component: AdminMessages });

function AdminMessages() {
  const [msgs, setMsgs] = useState<Msg[]>([]);

  const load = () => supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).then(({ data }) => setMsgs(data ?? []));
  useEffect(() => { load(); }, []);

  const toggleRead = async (m: Msg) => {
    await supabase.from("contact_messages").update({ is_read: !m.is_read }).eq("id", m.id);
    load();
  };
  const del = async (id: string) => {
    if (!confirm("حذف شود؟")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("حذف شد"); load(); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">پیام‌های تماس</h1>
      <div className="space-y-3">
        {msgs.map((m) => (
          <div key={m.id} className={`bg-card rounded-xl p-5 shadow-card ${!m.is_read ? "border-r-4 border-gold" : ""}`}>
            <div className="flex flex-wrap justify-between items-start gap-3 mb-2">
              <div>
                <p className="font-bold">{m.full_name} <span className="text-sm text-muted-foreground font-normal">— {m.email}</span></p>
                {m.phone && <p className="text-sm text-muted-foreground">{m.phone}</p>}
                {m.subject && <p className="text-sm font-medium mt-1">موضوع: {m.subject}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString("fa-IR")}</span>
                <Button size="icon" variant="ghost" onClick={() => toggleRead(m)} title={m.is_read ? "خوانده‌نشده" : "خوانده‌شده"}>
                  {m.is_read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4 text-gold" />}
                </Button>
                <Button size="icon" variant="ghost" onClick={() => del(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </div>
            <p className="text-sm leading-7 whitespace-pre-wrap">{m.message}</p>
          </div>
        ))}
        {msgs.length === 0 && <p className="text-center text-muted-foreground py-12">پیامی وجود ندارد</p>}
      </div>
    </div>
  );
}
