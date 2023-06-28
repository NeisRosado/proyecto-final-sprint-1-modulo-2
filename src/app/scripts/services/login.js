import axios from "axios";
import Swal from 'sweetalert';
import { URL_USERS, form_login } from "../UI/domElements.js"


export const login = async (event) => {
    event.preventDefault();
    const {number, password} = event.target;
    if(number.value.length === 0 ) {
        Swal('El campo del número está vacío')
    };
    if(password.value.length === 0) {
        Swal('El campo de la contraseña está vacío')
    }
    if(password.value.length === 0 && number.value.length === 0) {
        Swal('Todos los campos son obligatorios')
    }
    const response = await axios.get(URL_USERS);
    const users = response.data;
    users.forEach(user => {
        if(user.phone_number === number.value && user.password === password.value){
            Swal(`Bienvenido ${user.name}`);
        }
        if(user.phone_number !== number.value)
        {
            Swal('El número ingresado es incorrecto')
        }
        if(user.password !== password.value)
        {
            Swal('La contraseña ingresada es incorrecta')
        }
    });
}

form_login.addEventListener('submit', login);
