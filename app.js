// frontend/app.js
const BACKEND = "https://miniapp-backend-ejgl.onrender.com"; // <-- shu URLni o'zgartiring agar boshqacha bo'lsa
const tg = window.Telegram?.WebApp;
if (tg) tg.expand();

async function post(path, body) {
  const res = await fetch(BACKEND + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json();
}
