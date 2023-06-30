// import { chatRight, chatRightHeader, chatRightInfo, chatFigure, chatFigureImgRight, chatRightName } from "../UI/domElements.js";
// import { chatRightMain, chatUser, chatContact } from "../UI/domElements.js";
// import { getMessagesFromLocalStorage } from "./chat.js";

// // Obtener los mensajes almacenados en el localStorage
// const messages = getMessagesFromLocalStorage();

// // Obtener el primer chat del lado izquierdo
// const firstConversation = messages[0];
// if (firstConversation) {
//   const { user_1_name, user_1_profile_url, chat } = firstConversation;

//   // Actualizar elementos del lado derecho (header)
//   chatRightName[0].innerHTML = `<p>${user_1_name}</p>`;
//   chatFigureImgRight[0].src = user_1_profile_url;

//   // Vaciar contenido actual de los mensajes en el lado derecho
//   chatUser[0].innerHTML = '';
//   chatContact[0].innerHTML = '';

//   // Mostrar todos los mensajes del chat en el lado derecho
//   chat.forEach(message => {
//     const { message, hour } = message;
//     chatUser[0].innerHTML += `<span>${message}</span><span>${hour}</span>`;
//     chatContact[0].innerHTML += `<span>${message}</span><span>${hour}</span>`;
//   });
// }

