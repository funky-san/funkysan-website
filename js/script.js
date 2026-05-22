const login_modal = document.querySelector("#login-modal");
const signup_modal = document.querySelector("#signup-modal");
const background = document.querySelector(".modal-background");
const close_modal_button1 = document.querySelector("#modal-close1");
const close_modal_button2 = document.querySelector("#modal-close2");
const nav_signup = document.querySelector("#signup-nav");
const nav_login = document.querySelector("#login-nav");
const link_signup = document.querySelector("#signup-link");
const link_login = document.querySelector("#login-link");

close_modal_button1.onclick = closeModal;
close_modal_button2.onclick = closeModal;

background.onclick = function (e) {
    if (e.target === background) {
        closeModal();
    }
};

nav_signup.onclick = openSignupModal;
nav_login.onclick = openLoginModal;
link_signup.onclick = openSignupModal;
link_login.onclick = openLoginModal;

function closeModal()
{
    background.classList.add('hidden');
    login_modal.classList.add('hidden');
    signup_modal.classList.add('hidden');
}

function openSignupModal()
{
    background.classList.remove('hidden');
    signup_modal.classList.remove('hidden');
    login_modal.classList.add('hidden');
}

function openLoginModal()
{
    background.classList.remove('hidden');
    login_modal.classList.remove('hidden');
    signup_modal.classList.add('hidden');
}