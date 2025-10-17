

// Evitar bucle si ya está logueado
window.addEventListener("load", () => {
    const logged = localStorage.getItem("loggedIn");
    if (logged === "true") {
        window.location.href = "home.html";
    }
});

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    if (!username || !password) {
        message.textContent = "Por favor completa todos los campos.";
        message.style.color = "red";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    const storedPassword = users[username];

    if (storedPassword && storedPassword === password) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("user", username);
        window.location.href = "home.html";
    } else {
        message.textContent = "Usuario o contraseña incorrectos.";
        message.style.color = "red";
    }
}

function register() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    if (!username || !password) {
        message.textContent = "Por favor completa todos los campos.";
        message.style.color = "red";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        message.textContent = "El usuario ya existe.";
        message.style.color = "orange";
        return;
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));

    message.textContent =
        "Usuario registrado correctamente. Ahora inicia sesión.";
    message.style.color = "green";
}
