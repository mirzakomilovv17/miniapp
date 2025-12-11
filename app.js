const tg = window.Telegram.WebApp;
tg.expand();

document.getElementById("sendBtn").addEventListener("click", sendData);

async function sendData() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const status = document.getElementById("status");

    if (!name || !phone) {
        status.style.color = "red";
        status.textContent = "Ma'lumot to‘liq emas!";
        return;
    }

    const backendURL = "https://miniapp-backend-ejgl.onrender.com/save";

    const payload = {
        user_id: tg.initDataUnsafe?.user?.id,
        name,
        phone
    };

    console.log("Yuborilayotgan ma'lumot:", payload);

    try {
        const response = await fetch(backendURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log("Backenddan javob:", data);

        if (response.ok) {
            status.style.color = "green";
            status.textContent = "Muvaffaqiyatli yuborildi!";
            tg.close(); // mini appni yopadi
        } else {
            status.style.color = "red";
            status.textContent = "Xatolik yuz berdi!";
        }

    } catch (error) {
        console.error("Fetch error:", error);
        status.style.color = "red";
        status.textContent = "Serverga ulanishda xato!";
    }
}
