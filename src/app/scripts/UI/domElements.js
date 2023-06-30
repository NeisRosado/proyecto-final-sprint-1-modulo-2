// referenciada en login.js 
export const form_login = document.getElementById('form_login');

// referenciadas en PrintSignUp.js
export const signUpbtn= document.getElementById("signUpbtn"); 
export const initialFormLogin = document.getElementById("form_login");

// referenciadas en SignUp: funciones de validación e inputs y limpieza de formulario
export const registrationFormContainer = document.getElementById('registration-form-container');
export const getFormValues = () => ({
  name: getFormValue('name'), phoneNumber: getFormValue('phone_number'), password: getFormValue('password'), profilePicUrl: getFormValue('profile_pic_url'), about: getFormValue('phrase')
}); 
export const getFormValue = (fieldId) => (fieldId && document.getElementById(fieldId)) ? document.getElementById(fieldId).value.trim() : ''; 
export const clearForm = () => document.querySelector('.form') ? document.querySelector('.form').reset() : null; 

// referenciadas en showViews y main.js 
export const viewLogin = document.getElementById('view-login');
export const viewChat = document.getElementById("view-chat");
export const viewProfile = document.getElementById("view-profile");
export const signInbtn = document.getElementById('signInbtn');
export const outBtn = document.querySelector(".chat__out")
export const imgProfile = document.getElementById("image-profile"); // es del click del form edit en el chat
export const btnBack = document.getElementById("btnBack");

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






