const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// 📦 categories
let categories = [
  { id: "1", name: "Ring", slug: "ring" },
  { id: "2", name: "Necklace", slug: "necklace" }
];

// دیتای تستی (فعلاً جای دیتابیس)
// حذف
// let products = [
//   { id: 1, name: "Ring", price: 100 },
//   { id: 2, name: "Necklace", price: 200 },
// ];

let products = [
  { id: 1, name: "Ring", price: 100, category: "ring" },
  { id: 2, name: "Necklace", price: 200, category: "necklace" },
];

// گرفتن categories
app.get("/categories", (req, res) => {
  res.json(categories);
});

// گرفتن لیست محصولات
// حذف
// app.get("/products", (req, res) => {
//   res.json(products);
// });

// گرفتن لیست محصولات
app.get("/products", (req, res) => {
  const { category } = req.query;
  let result = products;
  if (category) {
    result = products.filter(p => p.category === category);
  }
  res.json(result);
});

// اضافه کردن محصول
app.post("/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.json(newProduct);
});

// اجرای سرور
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});