import "../styles/styles.scss";
import "./services/login.js"
import "./services/signUp";
import "./UI/showViews";
import "./UI/showSidebars"
import axios from "axios";
import { outBtnRegister, signUpbtn, viewRegister, viewChat, viewLogin, outBtn,} from "./UI/domElements";
import { showLoginView, showRegisterView} from "./UI/showViews";
import { endpoints } from "./services/data";
import { DateTime } from "luxon";

const currentView = localStorage.getItem('currentView');

//Check the current view and show only that
if (currentView === 'loginView'){
    viewChat.classList.remove('active');
    viewRegister.classList.remove('active');
    viewLogin.classList.add('active');
}
else if (currentView === 'registerView'){
    viewChat.classList.remove('active');
    viewLogin.classList.remove('active');
    viewRegister.classList.add('active');
}
else if (currentView === 'chatView'){
    viewLogin.classList.remove('active');
    viewRegister.classList.remove('active');
    viewChat.classList.add('active');
}

outBtn.addEventListener("click", showLoginView)
signUpbtn.addEventListener("click", showRegisterView);
outBtnRegister.addEventListener("click", showLoginView)



// Mostrar y esconder sidebar de buscar mensajes

const closeSearch = document.getElementById('closeSearch')
const searchMessageBtn = document.getElementById('searchMessageBtn')
const sidebar = document.getElementById('sidebar')


export const showSearchSideBar = () => {
    sidebar.classList.remove('sidebar__active');
  };

  export const closeSearchSideBar = () => {
    sidebar.classList.add('sidebar__active');
  };

  searchMessageBtn.addEventListener('click', showSearchSideBar)
  closeSearch.addEventListener('click', closeSearchSideBar)

//   Mostrar y esconder sidebar de editar perfil

const sidebarProfile = document.getElementById('sidebar__profile')
const showEditProfile = document.getElementById('showEditProfile')
const closeEditProfile = document.getElementById('btnBack')


  export const showProfileSidebar = () => {
    sidebarProfile.classList.remove('profile__active');
  };
  export const closeProfileSidebar = () => {
    sidebarProfile.classList.add('profile__active');
  };

  showEditProfile.addEventListener('click', showProfileSidebar);
  closeEditProfile.addEventListener('click', closeProfileSidebar);


  // Funcion para obtener imagen de perfil del usuario que inicia sesion


  // const imgProfile = document.querySelector('.chat__figure')

  // const printImgProfile = (users, imgProfile) => {
  //   imgProfile.innerHTML = "";
  //   users.forEach((user) => {
  //     imgProfile.innerHTML += `
  //     <img class="chat__figure__img" id="showEditProfile"
  //     src="${user.profile_pic_url}" alt="">
  //     `;
  //   });
  // };































