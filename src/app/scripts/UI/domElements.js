export const form_login = document.getElementById('form_login');
export const signUpbtn= document.getElementById("signUpbtn"); 
export const registrationFormContainer = document.getElementById('registration-form-container');
export const initialFormLogin = document.getElementById("form_login");
export const chatUserImage = document.querySelector(".chat__figure__img");
export const chatContainer = document.querySelector('.chat__left__main');
export const getFormValues = () => ({
  name: getFormValue('name'), phoneNumber: getFormValue('phone_number'), password: getFormValue('password'), profilePicUrl: getFormValue('profile_pic_url'), about: getFormValue('phrase')
}); // valida los inputs del form
export const getFormValue = (fieldId) => (fieldId && document.getElementById(fieldId)) ? document.getElementById(fieldId).value.trim() : ''; // valida los campos vacíos
export const clearForm = () => document.querySelector('.form') ? document.querySelector('.form').reset() : null; // limpia el form
// export const chat_container = document.getElementById('chat_container');
export const signInbtn = document.getElementById('signInbtn');
export const viewLogin = document.getElementById('view-login');
export const viewChat = document.getElementById("view-chat");
export const viewProfile = document.getElementById("view-profile");
export const outBtn = document.querySelector(".chat__out")
export const imgProfile = document.getElementById("image-profile");
export const btnBack = document.getElementById("btnBack");

// de chat de la derecha header
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






