import axios from "axios";
import { endpoints } from "./data.js";
import { chatUserImage } from "../UI/domElements.js";
import { getChatHistory } from "./chatHistory.js";

//  export const updateUserImage = async (loggedInUserId) => {
//   try {
//     const response = await axios.get(endpoints.urlUsers);
//     const users = response.data;
//     const loggedInUser = users.find(user => user.id === loggedInUserId);
//     if (loggedInUser) {
//       chatUserImage.src = loggedInUser.profile_pic_url;
//     }
//   } catch (error) {
//     console.error("Error al obtener los datos de los usuarios:", error);
//   }
// };

getChatHistory();