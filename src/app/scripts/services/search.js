import axios from "axios";
import swal from "sweetalert";
import { chatRight, chatLeft, imgProfileUserLogged, searchForm } from "../UI/domElements.js";
import { endpoints } from "./data.js";
import { DateTime } from "luxon";
import { printUsers } from "./login.js";

export const searchContacts = async (searchName) => {
  try {
    if (searchName.trim() === "") {
      swal("Ingrese un término de búsqueda");
      return;
    }

    const response = await axios.get(endpoints.urlUsers);
    const users = response.data;

    const searchNameLower = searchName.toLowerCase();
    const usersFiltered = users.filter((user) => {
      const lowerCaseName = user.name.toLowerCase();
      return lowerCaseName.includes(searchNameLower);
    });

    if (usersFiltered.length === 0) {
      swal("Contacto no encontrado");
      return;
    }

    printUsers(usersFiltered, chatLeft, chatRight, imgProfileUserLogged);
  } catch (error) {
    console.error("Error al buscar contactos:", error);
  }
};

const formatTimestamp = (timestamp) => {
  const dateTime = DateTime.fromMillis(timestamp);
  return dateTime.toFormat("HH:mm");
};

// Búsqueda para la barra de mensajes

export const searchMessages = async (searchTerm) => {
  try {
    if (searchTerm.trim() === "") {
      swal("Ingrese un término de búsqueda");
      return;
    }

    const response = await axios.get(endpoints.urlMessages);
    const messages = response.data;

    const filteredMessages = messages.filter((message) => {
      const messageText = message.text && message.text.toLowerCase();
      return messageText && messageText.includes(searchTerm.toLowerCase());
    });
    

    if (filteredMessages.length === 0) {
      swal("Mensaje no encontrado");
      return;
    }

    displayMessages(filteredMessages);
  } catch (error) {
    console.error("Error al buscar mensajes:", error);
  }
};

const displayMessages = (messages) => {
  const sidebarMessage = document.querySelector(".sidebar__message");
  sidebarMessage.innerHTML = ""; // Limpiar los mensajes anteriores

  if (messages.length === 0) {
    const paragraph = document.createElement("p");
    paragraph.textContent = "";
    sidebarMessage.appendChild(paragraph);
  } else {
    messages.forEach((conversation) => {
      const conversationDiv = document.createElement("div");
      conversationDiv.classList.add("conversation");

      const senderElement = document.createElement("span");
      senderElement.classList.add("sender");
      senderElement.textContent = `ID Usuario 1: ${conversation.idUser1}, ID Usuario 2: ${conversation.idUser2}`;

      conversationDiv.appendChild(senderElement);

      const conversationList = document.createElement("ul");
      conversation.message.forEach((message) => { 
        const listItem = document.createElement("li");
        listItem.classList.add("message");

        const senderElement = document.createElement("span");
        senderElement.classList.add("sender");
        senderElement.textContent = `SendBy: ${message.sendBy}`;

        const textElement = document.createElement("span");
        textElement.classList.add("text");
        textElement.textContent = message.message;

        const timestampElement = document.createElement("span");
        timestampElement.classList.add("timestamp");
        timestampElement.textContent = formatTimestamp(message.dateTime);

        listItem.appendChild(senderElement);
        listItem.appendChild(textElement);
        listItem.appendChild(timestampElement);

        conversationList.appendChild(listItem);
      });

      conversationDiv.appendChild(conversationList);
      sidebarMessage.appendChild(conversationDiv);
    });
  }
};


// Buscar mensajes al presionar Enter
const searchMessageInput = document.getElementById("searchMessageInput");
searchMessageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const searchTerm = searchMessageInput.value.trim();
    searchMessages(searchTerm);
  }
});

