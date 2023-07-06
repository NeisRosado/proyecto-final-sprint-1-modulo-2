import { viewChat, viewLogin, viewRegister} from "./domElements";

export const showChatView = () => {
  localStorage.setItem('currentView', 'chatView');
  viewLogin.classList.remove('active');
  viewRegister.classList.remove('active');
  viewChat.classList.add('active');
};

export const showLoginView = () => {
  localStorage.setItem('currentView', 'loginView');
  viewChat.classList.remove('active');
  viewRegister.classList.remove('active');
  viewLogin.classList.add('active');
  location.reload();
};


export const showRegisterView = () => {
  localStorage.setItem('currentView', 'registerView');
  viewLogin.classList.remove('active');
  viewChat.classList.remove('active');
  viewRegister.classList.add('active');
};





















