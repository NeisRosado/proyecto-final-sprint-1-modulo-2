import axios from "axios";
import { chatUserImage } from "../UI/domElements.js";
import { endpoints } from "./data.js";

export const updateUserImage = async (loggedInUserId) => {
  try {
    const response = await axios.get(endpoints.urlUsers);
    const users = response.data;
    const loggedInUser = users.find(user => user.id === loggedInUserId);
    if (loggedInUser) {
      chatUserImage.src = loggedInUser.profile_pic_url;
    } else {
      console.error("El usuario no ha iniciado sesión correctamente.");
    }
  } catch (error) {
    console.error("Error al obtener los datos de los usuarios:", error);
  }
};
