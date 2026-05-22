const login_modal = document.querySelector("#login-modal");
const signup_modal = document.querySelector("#signup-modal");
const background = document.querySelector(".modal-background");
const close_modal_button = document.querySelector(".modal-close");
const signup = document.querySelector("#signup-button");
const login = document.querySelector("#login-button");

close_modal_button.onclick = closeModal;

background.onclick = function (e) {
    if (e.target === background) {
        closeModal();
    }
};

signup.onclick = openSignupModal;
login.onclick = openLoginModal;

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
}

function openLoginModal()
{
    background.classList.remove('hidden');
    login_modal.classList.remove('hidden');
}