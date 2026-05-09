import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-Bk7_Ycu0.js";
import { u as useAuth, e as Route, b as useNavigate, B as Button, t as toast, s as supabase } from "./router-Y6i6w5uK.js";
import { L as Label, I as Input } from "./label-CSF4seE4.js";
import { s as stringType } from "./types-DGfzljZx.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const emailSchema = stringType().trim().email("ایمیل معتبر وارد کنید").max(255);
const passwordSchema = stringType().min(6, "رمز حداقل ۶ کاراکتر").max(72);
function AuthPage() {
  const {
    user
  } = useAuth();
  const {
    redirect
  } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("signin");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [fullName, setFullName] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (user) navigate({
      to: redirect
    });
  }, [user, redirect, navigate]);
  const submit = async (e) => {
    e.preventDefault();
    const eRes = emailSchema.safeParse(email);
    const pRes = passwordSchema.safeParse(password);
    if (!eRes.success) {
      toast.error(eRes.error.issues[0].message);
      return;
    }
    if (!pRes.success) {
      toast.error(pRes.error.issues[0].message);
      return;
    }
    setBusy(true);
    if (mode === "signup") {
      const {
        error
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName
          }
        }
      });
      if (error) toast.error(error.message);
      else toast.success("ثبت‌نام انجام شد. ایمیل خود را تأیید کنید.");
    } else {
      const {
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) toast.error("ایمیل یا رمز اشتباه است");
      else toast.success("خوش آمدید");
    }
    setBusy(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-16 max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-8 shadow-luxe", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-6 text-center", children: mode === "signin" ? "ورود به حساب" : "ثبت‌نام" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
      mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "نام و نام خانوادگی" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: fullName, onChange: (e) => setFullName(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ایمیل" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "رمز عبور" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy, className: "w-full bg-gradient-gold text-primary-foreground hover:opacity-90", children: busy ? "..." : mode === "signin" ? "ورود" : "ثبت‌نام" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-sm text-gold mt-4 mx-auto block hover:underline", onClick: () => setMode(mode === "signin" ? "signup" : "signin"), children: mode === "signin" ? "حساب ندارید؟ ثبت‌نام کنید" : "حساب دارید؟ وارد شوید" })
  ] }) });
}
export {
  AuthPage as component
};
