import "../styles/styles.scss";
import "./services/login.js"
import "./services/signUp";
import "./UI/printSignUp";
import "./UI/showViews";

import { registerBtn, outBtnRegister, signUpbtn, viewRegister, viewChat, viewLogin, viewProfile, outBtn,imgProfile, btnBack} from "./UI/domElements";
import { showChatView, showLoginView, showProfileView, showRegisterView} from "./UI/showViews";

const currentView = localStorage.getItem('currentView');

//Check the current view and show only that
if (currentView === 'loginView'){
    viewChat.classList.remove('active');
    viewProfile.classList.remove('active');
    viewRegister.classList.remove('active');
    viewLogin.classList.add('active');
}
else if (currentView === 'registerView'){
    viewChat.classList.remove('active');
    viewProfile.classList.remove('active');
    viewLogin.classList.remove('active');
    viewRegister.classList.add('active');
}
else if (currentView === 'chatView'){
    viewLogin.classList.remove('active');
    viewProfile.classList.remove('active');
    viewRegister.classList.remove('active');
    viewChat.classList.add('active');
}
else if (currentView === 'profileView'){
    viewLogin.classList.remove('active');
    viewChat.classList.remove('active');
    viewRegister.classList.remove('active');
    viewProfile.classList.add('active');
}

outBtn.addEventListener("click", showLoginView)
imgProfile.addEventListener("click", showProfileView)
btnBack.addEventListener("click", showChatView)
signUpbtn.addEventListener("click", showRegisterView);
outBtnRegister.addEventListener("click", showLoginView)
// registerBtn.addEventListener("click", )



















