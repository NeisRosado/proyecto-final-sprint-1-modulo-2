import "../styles/styles.scss";
import { login } from "./services/login.js"
import { printSignUp } from "./UI/printSignUp";
import { signUp } from "./services/signUp";
import { signUpbtn } from "./UI/domElements";
import { showChatView  } from "./UI/showChatView";
const chat = document.querySelector('.chat');
const loginForm = document.querySelector('.login');
const currentView = localStorage.getItem('currentView');

console.log(currentView);






