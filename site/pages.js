// Necessário possuir o TOAST do Bootstrap no HTML para funcionar!
function mostrarToast(mensagem, bgClass) {
    const toastEl = document.getElementById("liveToast");
    const toastMessage = document.getElementById("toast-message");
    const bsToast = new bootstrap.Toast(toastEl);
    toastMessage.textContent = mensagem;

    // remove classes de cor antigas
    toastEl.classList.remove("bg-success", "bg-danger");
    toastEl.classList.add(bgClass);

    bsToast.show();
}

function atualizar_navbar() {
    const nome = localStorage.getItem("nome_cliente")
    const token = localStorage.getItem("token")

    const btn_user_info = document.getElementById("user-info")

    if(token && nome) {
        btn_user_info.innerText= "Olá, " + nome.split(" ")[0]
    } else {
        btn_user_info.style.display = "none"
    }
}

function logout() {
    localStorage.removeItem("nome_cliente")
    localStorage.removeItem("token")
    window.location.href = "login.html"
}

window.addEventListener("DOMContentLoaded", atualizar_navbar)