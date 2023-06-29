import { viewChat, viewLogin, viewProfile } from "./domElements";

export const showChatView = () => {
  localStorage.setItem('currentView', 'chatView');
  viewLogin.classList.remove('active');
  viewProfile.classList.remove('active');
  viewChat.classList.add('active');
};

export const showLoginView = () => {
  localStorage.setItem('currentView', 'loginView');
  viewChat.classList.remove('active');
  viewProfile.classList.remove('active');
  viewLogin.classList.add('active');
};

export const showProfileView = () => {
  localStorage.setItem('currentView', 'profileView');
  viewLogin.classList.remove('active');
  viewChat.classList.remove('active');
  viewProfile.classList.add('active');
};












