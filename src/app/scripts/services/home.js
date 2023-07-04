import axios from "axios";
import { endpoints } from "./data.js";
import { chatUserImage, profileCurrentName } from "../UI/domElements.js";
import { getChatHistory } from "./chatHistory.js";
import { updateDataByAttribute } from "./profile.js";

 export const updateUserImage = async (loggedInUserId) => {
  try {
    const response = await axios.get(endpoints.urlUsers);
    const users = response.data;
    const loggedInUser = users.find(user => user.id === loggedInUserId);
    if (loggedInUser) {
      chatUserImage.src = loggedInUser.profile_pic_url;
    }
  } catch (error) {
    console.error("Error al obtener los datos de los usuarios:", error);
  }
};

export const setCurrentUser = (user) => {
  updateDataByAttribute("name", user.name);
  updateDataByAttribute("url_picture", user.profile_pic_url);
  localStorage.setItem('current_user', JSON.stringify(user))
}

export const getCurrentUser = () => {
  let currentUser = localStorage.getItem('current_user');
  if (currentUser == null || currentUser == undefined || currentUser == "") {
    throw new Error("No hay un usuario asignado");
  }
  return JSON.parse(currentUser);
}

getChatHistory();