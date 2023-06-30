import axios from "axios";
import Swal from 'sweetalert';
import { form_login } from "../UI/domElements.js"
import { endpoints } from "./data.js";
import { updateUserImage } from "./home.js";
import { showChatView } from "../UI/showViews.js";
import { getChatHistory } from "./chatHistory.js";


export const login = async (event) => {
    event.preventDefault();
    const { number, password } = event.target;
    if (password.value.length === 0 && number.value.length === 0) {
        Swal('Todos los campos son obligatorios');
        return;
    } else {
        if (number.value.length === 0) {
            Swal('El campo del número está vacío');
            return;
        };
        if (password.value.length === 0) {
            Swal('El campo de la contraseña está vacío');
            return;
        }
    }

    try {
        const response = await axios.get(endpoints.urlUsers);
        const users = response.data;
        let numberExist = false;
        let loggedInUserId = null;

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.phone_number === number.value) {
                numberExist = true;
                if (user.password === password.value) {
                    loggedInUserId = user.id;
                    Swal(`Bienvenido ${user.name}`);
                    updateUserImage(loggedInUserId);
                    showChatView();
                    getChatHistory(loggedInUserId);
                    try {
                        const messagesResponse = await axios.get(endpoints.urlMessages);
                        const messages = messagesResponse.data;

                        const chatHistory = messages.filter(message =>
                            (message.idUser1 === loggedInUserId || message.idUser2 === loggedInUserId)
                        );

                        console.log("Historial de chats:", chatHistory);
                    } catch (error) {
                        console.error("Error al obtener los mensajes:", error);
                    } 
                } else {
                    Swal('La contraseña ingresada es incorrecta');
                }
            }
        }

        if (!numberExist) {
            Swal('El número no existe');
        }
    } catch (error) {
        console.error("Error al obtener los datos de los usuarios:", error);
    }
}

form_login.addEventListener('submit', login);
