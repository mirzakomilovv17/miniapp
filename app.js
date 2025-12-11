const tg = window.Telegram.WebApp;
tg.expand();

function go(page) {
    window.location.href = page;
}

const forms = document.getElementById("forms");
const status = document.getElementById("status");

// SIGNUP BOSILGANDA
document.getElementById("signupBtn").addEventListener("click", () => {
    forms.innerHTML = `
        <h3>Ro'yxatdan o'tish</h3>
        <input id="name" placeholder="Ism"><br>
        <input id="phone" placeholder="Telefon"><br>
        <input id="password" type="password" placeholder="Parol"><br>
        <button id="sendSignup" class="btn">Yuborish</button>
    `;

    document.getElementById("sendSignup").onclick = sendSignup;
});

// LOGIN BOSILGANDA
document.getElementById("loginBtn").addEventListener("click", () => {
    forms.innerHTML = `
        <h3>Kirish</h3>
        <input id="phoneLogin" placeholder="Telefon"><br>
        <input id="passwordLogin" type="password" placeholder="Parol"><br>
        <button id="sendLogin" class="btn">Kirish</button>
    `;

    document.getElementById("sendLogin").onclick = sendLogin;
});


// -------- SIGNUP FUNKSIYA --------
async function sendSignup() {
    const backendURL = "https://miniapp-backend-ejgl.onrender.com/signup";

    const data = {
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        password: document.getElementById("password").value.trim(),
        user_id: tg.initDataUnsafe?.user?.id
    };

    let res = await fetch(backendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    let result = await res.json();
    status.textContent = result.message;
}

// -------- LOGIN FUNKSIYA --------
async function sendLogin() {
    const backendURL = "https://miniapp-backend-ejgl.onrender.com/login";

    const data = {
        phone: document.getElementById("phoneLogin").value.trim(),
        password: document.getElementById("passwordLogin").value.trim()
    };

    let res = await fetch(backendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    let result = await res.json();
    status.textContent = result.message;

    if (result.success) {
        tg.close();
    }
}

