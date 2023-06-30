// referenciada en login.js 
export const form_login = document.getElementById('form_login');

// referenciadas en PrintSignUp.js
export const signUpbtn= document.getElementById("signUpbtn"); 
export const initialFormLogin = document.getElementById("form_login");

// referenciadas en SignUp: funciones de validación e inputs y limpieza de formulario
export const getFormValues = () => ({
  name: getFormValue('name'), phoneNumber: getFormValue('phone_number'), password: getFormValue('password'), profilePicUrl: getFormValue('profile_pic_url'), about: getFormValue('phrase')
}); // valida los inputs del form
export const getFormValue = (fieldId) => (fieldId && document.getElementById(fieldId)) ? document.getElementById(fieldId).value.trim() : ''; // valida los campos vacíos
export const clearForm = () => document.querySelector('.form') ? document.querySelector('.form').reset() : null; // limpia el form
export const signInbtn = document.getElementById('signInbtn');
export const viewLogin = document.getElementById('view-login');
export const viewChat = document.getElementById("view-chat");
export const viewProfile = document.getElementById("view-profile");
export const viewRegister = document.getElementById("view-register");
export const signInbtn = document.getElementById('signInbtn');
export const outBtn = document.querySelector(".chat__out")
export const outBtnRegister = document.querySelector(".chat__registerback")
export const registerBtn = document.getElementById('registerBtn');
export const sidebarProfile = document.getElementById('sidebar__profile')
export const showEditProfile = document.getElementById('showEditProfile') // es del click del form edit en el chat
export const closeEditProfile = document.getElementById('btnBack')
export const closeSearch = document.getElementById('closeSearch')
export const searchMessageBtn = document.getElementById('searchMessageBtn')
export const sidebar = document.getElementById('sidebar')







// Chat lado izquierdo header
export const chatUserImage = document.querySelector(".avatarUserLeft");
export const chatSearchLeft = document.querySelector("#chatLeftSearch");

// Chats lado izquierdo
export const chatContainer = document.querySelector('.chat__left__main');
export const imgUsersLeft = document.querySelector(".imgUsersLeft");
export const avatarName = document.querySelector(".avatarName");
export const avatarHour = document.querySelector(".avatarHour"); 
export const chatHistoryparagraph = document.querySelector(".chat__history__paragraph");

// referencias del chat de la derecha header
export const chatRight = document.querySelectorAll('.chat__right');
export const chatRightHeader = document.querySelectorAll('.chat__right__header');
export const chatRightInfo = document.querySelectorAll('.chat__right__info');
export const chatFigure = document.querySelectorAll('.chat__figure');
export const chatFigureImgRight = document.querySelectorAll('.chat__figure__img');
export const chatRightName = document.querySelectorAll('.chat__right__name');

// lado derecho mensajes
export const chatRightMain = document.querySelectorAll('.chat__right__main');
export const chatUser = document.querySelectorAll('.chat__user');
export const chatContact = document.querySelectorAll('.chat__contact');






