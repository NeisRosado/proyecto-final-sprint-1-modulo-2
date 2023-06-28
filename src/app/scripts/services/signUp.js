import Swal from 'sweetalert';
import { getFormValues, clearForm } from '../UI/domElements.js'; 
import { endpoints } from "./data.js";
import axios from 'axios';
import { registrationFormContainer } from '../UI/domElements.js';

export const handleSignUp = async (event) => {
  event.preventDefault();

  // Obteniene los valores de los campos del formulario
  const { name, phoneNumber, password, profilePicUrl, about } = getFormValues();

  // Valida que todos los campos sean obligatorios
  if ([name, phoneNumber, password, profilePicUrl, about].some(field => field === '')) {
    Swal('Todos los campos son obligatorios');
    return;
  }

  // Verifica si el número de celular ya existe en la lista de usuarios
  const response = await axios.get(endpoints.urlUsers);
  const users = response.data;
  const existingUser = users.find(user => user.phone_number === phoneNumber);
  if (existingUser) {
    Swal('El número de celular ingresado ya está registrado');
    return;
  }

  // Crea el objeto de usuario
  const newUser = {
    id: generateUserId(users), // Genera el ID secuencialmente
    name,
    phone_number: phoneNumber,
    password,
    profile_pic_url: profilePicUrl,
    is_online: false,
    about,
    last_time: new Date().toISOString()
  };

  // Realiza la petición POST para crear el nuevo usuario

  try {
    await axios.post(endpoints.urlUsers, newUser);
    Swal('El nuevo usuario fue creado exitosamente').then(() => {
      clearForm(); // Limpiar el formulario después de mostrar la alerta
      window.location.href = 'index.html'; // Redirige a la página de inicio de sesión
    });
  } catch (error) {
    Swal('Ocurrió un error al crear el usuario');
  }
};

// Genera el ID secuencialmente
const generateUserId = (users) => {
  let maxId = 0;
  users.forEach(user => {
    const userId = parseInt(user.id);
    if (userId > maxId) {
      maxId = userId;
    }
  });
  return (maxId + 1).toString();
};

// click para registrar 
registrationFormContainer.addEventListener('submit', handleSignUp);