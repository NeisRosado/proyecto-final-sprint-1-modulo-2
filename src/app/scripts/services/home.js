import axios from "axios";
import { endpoints } from "./data.js";
import { chatUserImage } from "../UI/domElements.js";

export const updateUserImage = async () => {
  try {
    const response = await axios.get(endpoints.urlUsers);
    const users = response.data;
    const loggedInUserId = 2; // ID del usuario que inició sesión (actualízalo según tu lógica de inicio de sesión)
    const loggedInUser = users.find(user => user.id === loggedInUserId);
    if (loggedInUser) {
      chatUserImage.src = loggedInUser.profile_pic_url;
    }
  } catch (error) {
    console.error("Error al obtener los datos de los usuarios:", error);
  }
};
