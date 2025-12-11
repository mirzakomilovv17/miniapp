// frontend/app.js
const BACKEND = "https://miniapp-backend-ejgl.onrender.com"; // <-- render URLni to'g'rilab qo'ying
const tg = window.Telegram?.WebApp;
if (tg) tg.expand();

// helper for POST
async function post(path, body) {
  const res = await fetch(BACKEND + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json();
}
