const tg = window.Telegram.WebApp;
tg.expand();

async function sendData() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const status = document.getElementById("status");

    if (!name || !phone) {
        status.textContent = "Ma'lumot to‘liq emas!";
        return;
    }

    const backendURL = "https://miniapp-backend-ejgl.onrender.com/save";

    const body = {
        user_id: tg.initDataUnsafe?.user?.id,
        name: name,
        phone: phone
    };

    try {
        const response = await fetch(backendURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            status.textContent = "Muvaffaqiyatli yuborildi!";
            tg.close();
        } else {
            status.textContent = "Xatolik (Backend javob qaytarmadi)";
        }
    } catch (err) {
        status.textContent = "Serverga ulanishda xatolik!";
        console.error(err);
    }
}
