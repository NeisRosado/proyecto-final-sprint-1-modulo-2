import axios from "axios";
import { endpoints } from "./data.js";
// import { registrationFormContainer, signUpButtom } from "../UI/domElements.js";
import Swal from 'sweetalert';
import { nameInput, phoneNumberInput, passwordInput, imageUrlInput, phraseInput } from "../UI/domElements.js";

export const handleSignUp = async (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const phoneNumber = phoneNumberInput.value;
  const password = passwordInput.value;
  const imageUrl = imageUrlInput.value;
  const phrase = phraseInput.value;

  // Verificar si el número de celular existe en la lista de usuarios
  const users = await getUsers();
  const userExists = users.some((user) => user.phone_number === phoneNumber);

  if (userExists) {
    Swal({
        icon: 'error',
        title: 'Oops...',
        text: 'El número de celular ingresado ya está registrado.',
      });
  } else {
    // Obtener el último ID utilizado y generar el nuevo ID en secuencia
    const lastUser = users[users.length - 1];
    const lastId = lastUser ? lastUser.id : 0;
    const newId = lastId + 1;

    // Crear nuevo usuario mediante una petición POST
    const newUser = {
      id: newId,
      name,
      phone_number: phoneNumber,
      password,
      profile_pic_url: imageUrl,
      is_online: false,
      about: phrase,
      last_time: new Date().toISOString(),
    };

    try {
      await createUser(newUser);
      swal({
        icon: 'success',
        title: '¡Usuario creado!',
        text: 'El nuevo usuario ha sido creado exitosamente.'
      });
      
      // Restablecer el formulario
      registrationFormContainer.innerHTML = '';
    } catch (error) {
      console.error('Error al crear el nuevo usuario:', error);
    }
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(endpoints.urlUsers);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error);
    return [];
  }
};

export const createUser = async (user) => {
  try {
    await axios.post(endpoints.urlUsers, user);
  } catch (error) {
    console.error('Error al crear el nuevo usuario:', error);
    throw error;
  }
};


