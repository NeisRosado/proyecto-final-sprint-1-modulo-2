import "../styles/styles.scss";
import "./services/login.js"
import "./services/signUp";
import "./UI/printSignUp";
import { viewChat, viewLogin, viewProfile } from "./UI/domElements";
const currentView = localStorage.getItem('currentView');

//Check the current view and show only that
if (currentView === 'loginView'){
    viewChat.classList.remove('active');
    viewProfile.classList.remove('active');
    viewLogin.classList.add('active');
}
else if (currentView === 'chatView'){
    viewLogin.classList.remove('active');
    viewProfile.classList.remove('active');
    viewChat.classList.add('active');
}
else if (currentView === 'profileView'){
    viewLogin.classList.remove('active');
    viewChat.classList.remove('active');
    viewProfile.classList.add('active');
}









