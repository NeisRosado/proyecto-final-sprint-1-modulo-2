// import { endpoints } from "./data.js";
// import axios from 'axios';
// import { chatContainer } from "../UI/domElements.js"

// // Obtener los mensajes almacenados en el localStorage
// const getMessagesFromLocalStorage = () => {
//   const messagesJson = localStorage.getItem('messages');
//   return messagesJson ? JSON.parse(messagesJson) : [];
// };

// // Generar el HTML del historial de mensajes
// const generateConversationHTML = (conversation) => {
//   const { user_1_name, user_2_name, user_1_profile_url, user_2_profile_url, chat } = conversation;
//   const lastMessage = chat[chat.length - 1];

//   const { send_by, date, hour, message, viewed } = lastMessage;
//   const senderName = send_by === 1 ? user_1_name : user_2_name;
//   const senderProfileUrl = send_by === 1 ? user_1_profile_url : user_2_profile_url;

// // Formato de hora
//   const formattedHour = new Date(`${date} ${hour}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
//   const html = `         
//   <div class="chat__left__main">
//     <div class="chat__history">
//       <img class="chat__figure__img" src="${senderProfileUrl}" alt="">
//       <div class="chat__history__all">
//         <div class="chat__history__hour">
//           <p>${senderName}</p>
//           <small>${formattedHour}</small>
      
//         </div>
//         <small class="chat__history__paragraph">${message}</small>
//       </div>
//     </div>
//     </div>

//   `;

//   return html;
// };


// // Mostrar todas las conversaciones del lado izquierdo
// const displayAllConversations = () => {
//   const messages = getMessagesFromLocalStorage();
//   chatContainer.innerHTML = '';
//    messages.forEach((conversation) => {
//         const conversationHTML = generateConversationHTML(conversation);
//     chatContainer.innerHTML += conversationHTML;
//   });
// };

// // Función para obtener los mensajes del endpoint y guardarlos en el localStorage
// export const fetchMessagesFromEndpoint = async () => {
//   try {
//     const response = await axios.get(endpoints.urlMessages);
//     const messages = response.data;
//     saveMessagesToLocalStorage(messages);

//   } catch (error) {
//     console.error('Error al obtener los mensajes del endpoint', error);
//   }
// };

// const saveMessagesToLocalStorage = (messages) => {
//   localStorage.setItem('messages', JSON.stringify(messages));
// };

// displayAllConversations();
