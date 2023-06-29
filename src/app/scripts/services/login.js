import axios from "axios";
import Swal from 'sweetalert';
import { form_login } from "../UI/domElements.js"
import { endpoints } from "./data.js";
import { showChatView } from "../UI/showChatView.js";


export const login = async (event) => {
    event.preventDefault();
    const {number, password} = event.target;
    if(password.value.length === 0 && number.value.length === 0) {
        Swal('Todos los campos son obligatorios');
        return;
    } else {
        if(number.value.length === 0 ) {
            Swal('El campo del número está vacío');
            return;
        };
        if(password.value.length === 0) {
            Swal('El campo de la contraseña está vacío');
            return;
        }
    }

    const response = await axios.get(endpoints.urlUsers);
    const users = response.data;
    let numberExist = false;
    users.forEach(user => {
        if(user.phone_number === number.value)
        {
            numberExist = true;
            if(user.password === password.value)
            {
                Swal(`Bienvenido ${user.name}`);
                localStorage.setItem('currentView', 'chat');
                showChatView();
                return;
            } else{
                Swal('La contraseña ingresada es incorrecta');
                return;
            }
        }
    });
    if(numberExist === false){
        Swal('El número no existe');
    }
}

form_login.addEventListener('submit', login);


