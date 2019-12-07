const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function askForName() {
    greeting.classList.remove(SHOWING_CN);
    form.classList.add(SHOWING_CN);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);        
    }
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function init() {
    loadName();
    form.addEventListener("submit", e => {
        e.preventDefault();
        const currentUser = input.value;
        saveName(currentUser);
        paintGreeting(currentUser);
    });
}

init();