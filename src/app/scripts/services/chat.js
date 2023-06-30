import { endpoints } from "./data.js";
import axios from 'axios';
import { chatContainer, chatRightName, chatFigureImgRight, chatUser, chatContact } from "../UI/domElements.js"

// Obtener los mensajes almacenados en el localStorage
export const getMessagesFromLocalStorage = () => {
  const messagesJson = localStorage.getItem('messages');
  return messagesJson ? JSON.parse(messagesJson) : [];
};

// Generar el HTML del historial de mensajes en el lado izquierdo
const generateConversationHTML = (conversation) => {
  const { user_1_name, user_2_name, user_1_profile_url, user_2_profile_url, chat } = conversation;
  const lastMessage = chat[chat.length - 1];

  const formattedHour = new Date(`${lastMessage.date} ${lastMessage.hour}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  
  const html = `
    <div class="chat__left__main">
      <div class="chat__history">
        <img class="chat__figure__img" src="${user_2_profile_url}" alt="">
        <div class="chat__history__all">
          <div class="chat__history__hour">
            <p>${user_2_name}</p>
            <small>${formattedHour}</small>
          </div>
          <small class="chat__history__paragraph">${lastMessage.message}</small>
        </div>
      </div>
    </div>
  `;

  return html;
};
// Actualizar elementos del lado derecho con la información del chat seleccionado
const updateRightChat = (conversation) => {
  const { user_1_name, user_1_profile_url, chat } = conversation;

  // Actualizar elementos del lado derecho (header)
  chatRightName[0].innerHTML = `<p>${user_1_name}</p>`;
  chatFigureImgRight[0].src = user_1_profile_url;

// Actualizar elementos del lado derecho (mensajes)
const chatRightMain = document.querySelector('.chat__right__main');
chatRightMain.innerHTML = '';

chat.forEach((message) => {
  const { message: messageText, hour } = message;
  const html = `
    <div class="chat__user">
      <span>${messageText}</span>
      <span>${hour}</span>
    </div>
  `;
  chatRightMain.innerHTML += html;
});
};

// Mostrar todas las conversaciones del lado izquierdo
const displayAllConversations = () => {
  const messages = getMessagesFromLocalStorage();
  chatContainer.innerHTML = '';
  messages.forEach((conversation) => {
    const conversationHTML = generateConversationHTML(conversation);
    chatContainer.innerHTML += conversationHTML;
  });
};

// Función para obtener los mensajes del endpoint y guardarlos en el localStorage
export const fetchMessagesFromEndpoint = async () => {
  try {
    const response = await axios.get(endpoints.urlMessages);
    const messages = response.data;
    saveMessagesToLocalStorage(messages);
    displayAllConversations();

    // Mostrar el primer chat en el lado derecho
    if (messages.length > 0) {
      const firstConversation = messages[0];
      updateRightChat(firstConversation);
    }

  } catch (error) {
    console.error('Error al obtener los mensajes del endpoint', error);
  }
};

const saveMessagesToLocalStorage = (messages) => {
  localStorage.setItem('messages', JSON.stringify(messages));
};

displayAllConversations();

