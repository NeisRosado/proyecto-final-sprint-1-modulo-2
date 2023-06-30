import axios from "axios";
import Swal from 'sweetalert';
import { form_login } from "../UI/domElements.js"
import { endpoints } from "./data.js";
import { updateUserImage } from "./home.js";
import { showChatView } from "../UI/showViews.js";



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
        let loggedInUserId = null; // Variable para almacenar el ID del usuario que inició sesión
        users.forEach(user => {
            if (user.phone_number === number.value) {
                numberExist = true;
                if (user.password === password.value) {
                    loggedInUserId = user.id; // Almacenar el ID del usuario que inició sesión
                    Swal(`Bienvenido ${user.name}`);
                    // updateUserImage(loggedInUserId);
                    showChatView();
                } else {
                    Swal('La contraseña ingresada es incorrecta');
                }
            }
        });

        if (!numberExist) {
            Swal('El número no existe');
        }
    } catch (error) {
        console.error("Error al obtener los datos de los usuarios:", error);
    }
}

form_login.addEventListener('submit', login);


