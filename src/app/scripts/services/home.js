import { chat_home, homeSection } from "../UI/domElements";
import { endpoints } from "./data";
import axios from "axios";
import { showSection } from "./viewPages";

// remplazar datos del contendeor home
export const updateChatHome = async (event) => {
  //  event.preventDefault();
  
    try {
      const response = await axios.get(endpoints.urlUsers);
      const users = response.data;
  
      const chatHistoryElements = document.querySelectorAll(".chat__history");
  
      users.forEach((user, index) => {
        const chatHistory = chatHistoryElements[index];
        const chatFigure = chatHistory.querySelector(".chat__figure__img");
        const userName = chatHistory.querySelector(".chat__history__hour p");
        const userLastTime = chatHistory.querySelector(".chat__history__hour small");
        const chatHistoryParagraph = chatHistory.querySelector(".chat__history__paragraph");
  
        chatFigure.src = user.profile_pic_url;
        chatFigure.alt = user.name;
        userName.textContent = user.name;
        userLastTime.textContent = user.last_time;
        chatHistoryParagraph.textContent = user.about;
      });
    } catch (error) {
      console.error("Error al obtener los datos de los usuarios:", error);
    }
  };
  
