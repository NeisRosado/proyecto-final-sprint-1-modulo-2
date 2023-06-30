import axios from "axios";
import { endpoints } from "./data.js";
import { imgUsersLeft, avatarName, avatarHour, chatHistoryparagraph } from "../UI/domElements.js";

 const displayChatHistory = (chatHistory) => {
  imgUsersLeft.src = "";
  avatarName.textContent = "";
  avatarHour.textContent = "";
  chatHistoryparagraph.textContent = "";

  if (chatHistory) {
    imgUsersLeft.src = chatHistory.profile_pic_url;
    avatarName.textContent = chatHistory.name;
    avatarHour.textContent = chatHistory.hour;
    chatHistoryparagraph.textContent = chatHistory.message;
  }
 };

export const getChatHistory = async (loggedInUserId) => {
    try {
      const messagesResponse = await axios.get(endpoints.urlMessages);
      const messages = messagesResponse.data;
  
      const chatHistory = messages.filter(message => {
        return (
          message.idUser1 === loggedInUserId ||
          message.idUser2 === loggedInUserId
        );
      });
  
      chatHistory.forEach(async chat => {
        const conversations = chat.conversations;
  
        conversations.forEach(async conversation => {
          const { sendBy, hour, message } = conversation;
  
          // Obtener los datos del remitente desde el endpoint
          const senderResponse = await axios.get(`${endpoints.urlUsers}/${sendBy}`);
          const senderData = senderResponse.data;
  
          // Llamar a la función displayChatHistory con los datos del mensaje
          displayChatHistory({
            profile_pic_url: senderData.profile_pic_url,
            name: senderData.name,
            hour: hour,
            message: message
          });
        });
      });
    } catch (error) {
      console.error("Error al obtener el historial de chat:", error);
    }
  };

