import axios from "axios";
import Swal from 'sweetalert';
import { registrationFormContainer } from "../UI/domElements.js";
import { endpoints } from "./data.js";

export const handleSignUp = async (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const numberInput = document.getElementById("number");
  const passwordInput = document.getElementById("password");
  const imageUrlInput = document.getElementById("image-url");
  const phraseInput = document.getElementById("phrase");

  const name = nameInput.value;
  const number = numberInput.value;
  const password = passwordInput.value;
  const imageUrl = imageUrlInput.value;
  const phrase = phraseInput.value;

  if (password.length === 0 && number.length === 0) {
    Swal('Todos los campos son obligatorios');
    return;
  } else {
    if (number.length === 0) {
      Swal('El campo del número está vacío');
      return;
    };
    if (password.length === 0) {
      Swal('El campo de la contraseña está vacío');
      return;
    }
  }

  try {
    const response = await axios.get(endpoints.urlUsers);
    const users = response.data;
    const numberExists = users.some(user => user.phone_number === number);

    if (numberExists) {
      Swal('El número de celular ingresado ya está registrado.');
    } else {
      const newUser = {
        name: name,
        phone_number: number,
        password: password,
        image_url: imageUrl,
        phrase: phrase
      };

      await axios.post(endpoints.urlUsers, newUser);
      Swal('El nuevo usuario ha sido creado exitosamente.');
    }
  } catch (error) {
    console.error(error);
    Swal('Ocurrió un error al crear el nuevo usuario. Por favor, intenta nuevamente.');
  }
}

registrationFormContainer.addEventListener('submit', handleSignUp);


