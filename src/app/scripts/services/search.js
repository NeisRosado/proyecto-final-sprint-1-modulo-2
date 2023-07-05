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


