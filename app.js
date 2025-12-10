const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

async function sendData() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const status = document.getElementById("status");

    if (!name || !phone) {
        status.textContent = "Ma'lumot to‘liq emas!";
        return;
    }

    if (!tg.initDataUnsafe || !tg.initDataUnsafe.user) {
        status.textContent = "Mini App Telegram ichida ochilishi kerak!";
        return;
    }

    const backendURL = "https://miniapp-backend-ejgl.onrender.com/save";

    const body = {
        user_id: tg.initDataUnsafe.user.id,
        name,
        phone
    };

    try {
        const response = await fetch(backendURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const result = await response.json();
        console.log(result);

        status.textContent = "Muvaffaqiyatli yuborildi!";
        tg.close();

    } catch (error) {
        console.error(error);
        status.textContent = "Xatolik!";
    }
}
