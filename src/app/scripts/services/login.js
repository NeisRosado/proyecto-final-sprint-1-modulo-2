import axios from "axios";
import Swal from "sweetalert";
import { form_login, chatRight, chatLeft, imgProfileUserLogged, searchForm } from "../UI/domElements.js";
import { endpoints } from "./data.js";
import { showChatView } from "../UI/showViews.js";
import { DateTime } from "luxon";
import { showSearchSideBar } from "../main.js";
import { searchContacts } from "./search.js";


// Funcion para obtener y pintar chats de la izquierda y la derecha

const printChats = async (idOtherUser, divMessages) => {
  let userData = await axios.get(`${endpoints.urlUsers}/${idOtherUser}`)
  userData = userData.data;
  chatRight.innerHTML = `
          <div class="chat__right__header">
          <div class="chat__right__info">
              <div class="chat__figure">
                  <img class="chat__figure__img"
                      src="${userData.profile_pic_url}"
                      alt="">
              </div>
              <div class="chat__right__name">
                  <p>${userData.name}</p>
                  <smal>en linea</smal>
              </div>
          </div>

          <div id="searchMessageBtn">
              <img class="chat__icons"src="https://cdn-icons-png.flaticon.com/512/54/54481.png" alt="">
          </div>
      </div>

      <div class="chat__right__main">
            ${divMessages}
      </div>

      <div class="chat__right__write">
          <img class="chat__icons" src="https://cdn-icons-png.flaticon.com/512/3404/3404134.png" alt="">
          <img class="chat__icons" src="   https://cdn-icons-png.flaticon.com/512/876/876210.png " alt="">
          <form class="chat__search" id="formChat">
              <input class="chat__right__write__input" type="" placeholder="Escribe un mensaje" name="message">
              <button id="sendMessage" type="submit"></button>
          </form>
          <img class="chat__icons" src="   https://cdn-icons-png.flaticon.com/512/709/709950.png " alt="">
      </div>`;

      // Funcion para enviar mensajes

      const searchMessageBtn = document.getElementById('searchMessageBtn');
      searchMessageBtn.addEventListener('click', showSearchSideBar);

      const formChat = document.getElementById('formChat');
      formChat.addEventListener("submit", async (event) => {
        event.preventDefault();
        const { message } = event.target;
        const idUser2ForSend = localStorage.getItem("idUser2");
        const idMyIdForSend = localStorage.getItem("loggedInUserId");
        let messagesChat = await axios.get(
          `${endpoints.urlMessages}?idUser1=${idMyIdForSend}&idUser2=${idUser2ForSend}`
        );
        if (messagesChat.data.length === 0) {
          messagesChat = await axios.get(
            `${endpoints.urlMessages}?idUser2=${idMyIdForSend}&idUser1=${idUser2ForSend}`
          );
        }
        messagesChat = messagesChat.data[0]
        const currentDateTime = DateTime.local();
        const currentTimestamp = currentDateTime.toSeconds();
        messagesChat.conversations.push({
          "id": messagesChat.conversations.length+1,
          "sendBy": Number(idMyIdForSend),
          "dateTime": String(parseInt(currentTimestamp)),
          "message": message.value,
          "flag": true
        })
        const idMessage = messagesChat.id;
        const responseSendMessage = await axios.put(`${endpoints.urlMessages}/${idMessage}`, messagesChat);
        let divMessagesGeneral = document.querySelector('.chat__right__main');
        divMessagesGeneral.innerHTML +=`
          <div class="chat__contact">
            <span>${message.value}</span>
            <span>${String(parseInt(currentTimestamp))}</span>
          </div>
          `;
          formChat.reset();
      })
}

export const printUsers = async (
  users,
  chatLeft,
  chatRight,
  imgProfileUserLogged
) => {
  const myId = localStorage.getItem("loggedInUserId");
  const myProfileImg = localStorage.getItem("loggedInUserProfilePicUrl");
  imgProfileUserLogged.innerHTML = "";
  imgProfileUserLogged.innerHTML += `
  <img class="chat__figure__img avatarUserLeft" id="showEditProfile"
    src="${myProfileImg}"
    alt="">
  `;
  chatLeft.innerHTML = "";
  chatRight.innerHTML = "";

  searchForm.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const searchName = searchForm.value.trim();
      searchContacts(searchName);
    }
  });

  users.forEach(async (user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("chat__history");
    userDiv.id = user.id;
    let responseMessages = await axios.get(
      `${endpoints.urlMessages}?idUser1=${myId}&idUser2=${user.id}`
    );
    if (responseMessages.data.length === 0) {
      responseMessages = await axios.get(
        `${endpoints.urlMessages}?idUser2=${myId}&idUser1=${user.id}`
      );
    }

    if (responseMessages.data.length > 0) {
      const conversationsLength = responseMessages.data[0].conversations.length;
      const lastMessage =
        responseMessages.data[0].conversations[conversationsLength - 1].message;
      const timestampLastMessage =
        responseMessages.data[0].conversations[conversationsLength - 1]
          .dateTime;
      const timeLastMessage = DateTime.fromSeconds(
        Number(timestampLastMessage)
      );
      const formattedTime = timeLastMessage.toFormat("hh:mm:ss a");
      const conversations = responseMessages.data[0].conversations;

      let divAllMessages = "";
      conversations.forEach((conver) => {
        const timeMessage = DateTime.fromSeconds(Number(conver.dateTime));
        const timeMessageFormatted = timeMessage.toFormat("hh:mm:ss a");

        if (conver.sendBy == myId) {
          divAllMessages += `
          <div class="chat__contact">
            <span>${conver.message}</span>
            <span class="chat__message__hour">${timeMessageFormatted}</span>
          </div>
          `;
        } else {
          divAllMessages += `
          <div class="chat__user">
            <span>${conver.message}</span>
            <span class="chat__message__hour">${timeMessageFormatted}</span>
          </div>
          `;
        }
      });

      userDiv.innerHTML = `
          <img class="chat__figure__img" src="${user.profile_pic_url}" alt="">
          <div class="chat__history__all">
            <div class="chat__history__hour">
              <p>${user.name}</p>
              <small class="chat__message__hour ">${formattedTime}</small>
            </div>
              <small>${lastMessage}</small>
          </div>
        `;

      userDiv.addEventListener("click", () => {
      localStorage.setItem("idUser2", userDiv.id);
      printChats(userDiv.id, divAllMessages);
      });

      chatLeft.appendChild(userDiv);
      localStorage.setItem("idUser2", userDiv.id);
      printChats(userDiv.id, divAllMessages);
    }  
  });
};


const getUsers = async () => {
  try {
    const responseUsers = await axios.get(endpoints.urlUsers);
    await printUsers(
      responseUsers.data,
      chatLeft,
      chatRight,
      imgProfileUserLogged
    );
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
    Swal("Todos los campos son obligatorios");
    return;
  } else {
    if (number.value.length === 0) {
      Swal("El campo del número está vacío");
      return;
    }
    if (password.value.length === 0) {
      Swal("El campo de la contraseña está vacío");
      return;
    }
  }

  try {
    const response = await axios.get(endpoints.urlUsers);
    const users = response.data;
    let numberExist = false;
    users.forEach((user) => {
      if (user.phone_number === number.value) {
        numberExist = true;
        if (user.password === password.value) {
          localStorage.setItem("loggedInUserId", user.id);
          localStorage.setItem(
            "loggedInUserProfilePicUrl",
            user.profile_pic_url
          );
          localStorage.setItem("loggedInUserName", user.name);
          getUsers();
          Swal(`Bienvenido ${user.name}`);
          showChatView();
        } else {
          Swal("La contraseña ingresada es incorrecta");
        }
      }
    });

    if (!numberExist) {
      Swal("El número no existe");
    }
  } catch (error) {
    console.error("Error al obtener los datos de los usuarios:", error);
  }
};

form_login.addEventListener("submit", login);
