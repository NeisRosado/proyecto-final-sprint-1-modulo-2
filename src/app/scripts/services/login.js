import axios from "axios";
import Swal from 'sweetalert';
import { form_login } from "../UI/domElements.js"
import { endpoints } from "./data.js";
import { showChatView } from "../UI/showViews.js";
import { DateTime } from "luxon";

  // Funcion para obtener y pintar chats de la izquierda


  const chatLeft = document.querySelector('.chat__left__main');

  const printUsers = async (users, chatLeft) => {
    const myId = localStorage.getItem('loggedInUserId')
    chatLeft.innerHTML = "";
    users.forEach( async (user) => {
      let responseMessages = await axios.get(`${endpoints.urlMessages}?idUser1=${myId}&idUser2=${user.id}`);
      if (responseMessages.data.length === 0) {
        responseMessages = await axios.get(`${endpoints.urlMessages}?idUser2=${myId}&idUser1=${user.id}`); 
      }
      if (responseMessages.data.length > 0){
        const conversationsLength = responseMessages.data[0].conversations.length;
        const lastMessage = responseMessages.data[0].conversations[conversationsLength-1].message ;
        const timestampLastMessage = responseMessages.data[0].conversations[conversationsLength-1].dateTime ;
        const timeLastMessage = DateTime.fromMillis(Number(timestampLastMessage));
        const formattedTime = timeLastMessage.toFormat("HH:mm:ss");
        chatLeft.innerHTML += `
        <div class="chat__history">
          <img class="chat__figure__img" src="${user.profile_pic_url}" alt="">
          <div class="chat__history__all">
            <div class="chat__history__hour">
              <p>${user.name}</p>
              <small>${formattedTime}</small>
            </div>
            <small class="chat__history__paragraph"> ${lastMessage}</small>
          </div>
          </div>
        `;
      }
    });
  };
  
  const getUsers = async () => {
    try {
      const responseUsers = await axios.get(endpoints.urlUsers);
      await printUsers(responseUsers.data, chatLeft);
    } catch (error) {
      console.log(error);
    }
  };
  
  getUsers();


  // Funcion para loguearse


export const login = async (event) => {
    event.preventDefault();
    const { number, password } = event.target;
    if (password.value.length === 0 && number.value.length === 0) {
      Swal('Todos los campos son obligatorios');
      return;
    } else {
      if (number.value.length === 0) {
        Swal('El campo del número está vacío');
        return;
      };
      if (password.value.length === 0) {
        Swal('El campo de la contraseña está vacío');
        return;
      }
    }
  
    try {
      const response = await axios.get(endpoints.urlUsers);
      const users = response.data;
      let numberExist = false;
      users.forEach(user => {
        if (user.phone_number === number.value) {
          numberExist = true;
          if (user.password === password.value) {
            localStorage.setItem('loggedInUserId', user.id);
            localStorage.setItem('loggedInUserProfilePicUrl', user.profile_pic_url);
            localStorage.setItem('loggedInUserName', user.name);
            getUsers();
            Swal(`Bienvenido ${user.name}`);
            // displayProfilePicture();
            showChatView();
          } else {
            Swal('La contraseña ingresada es incorrecta');
          }
        }
      });
  
      if (!numberExist) {
        Swal('El número no existe');
      }
    } catch (error) {
      console.error("Error al obtener los datos de los usuarios:", error);
    }
  }
  
  form_login.addEventListener('submit', login);
  
  


