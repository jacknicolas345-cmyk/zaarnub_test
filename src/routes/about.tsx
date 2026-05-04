import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "درباره زرناب" }, { name: "description", content: "گالری آنلاین جواهرات زرناب" }] }),
  component: () => (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">درباره زرناب</h1>
      <div className="prose prose-lg space-y-4 text-muted-foreground leading-8">
        <p>زرناب با بیش از یک دهه تجربه در طراحی و ساخت جواهرات، با هدف ارائه زیباترین و باکیفیت‌ترین قطعات طلا و نقره به مشتریان عزیز فعالیت می‌کند.</p>
        <p>تمامی محصولات ما دارای گواهی اصالت بوده و توسط استادکاران مجرب ساخته می‌شوند. ما به اصالت، ظرافت و طراحی منحصر به فرد می‌بالیم.</p>
        <p>هدف ما این است که هر قطعه جواهر، روایتگر یک لحظه ماندگار در زندگی شما باشد.</p>
      </div>
    </div>
  ),
});
