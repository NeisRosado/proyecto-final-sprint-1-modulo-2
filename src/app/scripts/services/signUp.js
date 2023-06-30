import Swal from 'sweetalert';
import { getFormValues, clearForm, registrationFormContainer } from '../UI/domElements.js';
import { endpoints } from "./data.js";
import axios from 'axios';

// Función para obtener los usuarios del endpoint y guardarlos en el localStorage
const fetchUsersFromEndpoint = async () => {
  try {
    const response = await axios.get(endpoints.urlUsers);
    const users = response.data;

    // Guarda los usuarios en el localStorage
    saveUsersToLocalStorage(users);
  } catch (error) {
    console.error('Error al obtener los usuarios del endpoint', error);
  }
};
 
// Función para obtener los usuarios almacenados en el localStorage
const getUsersFromLocalStorage = () => {
  const usersJson = localStorage.getItem('users');
  return usersJson ? JSON.parse(usersJson) : [];
};

// Función para guardar los usuarios en el localStorage
const saveUsersToLocalStorage = (users) => {
  const usersJson = JSON.stringify(users);
  localStorage.setItem('users', usersJson);
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

export const handleSignUp = async (event) => {
  event.preventDefault();

  // Obtiene los valores de los campos del formulario
  const { name, phoneNumber, password, profilePicUrl, about } = getFormValues();

  // Valida que todos los campos sean obligatorios
  if ([name, phoneNumber, password, profilePicUrl, about].some(field => field === '')) {
    Swal('Todos los campos son obligatorios');
    return;
  }

  // Verifica si el número de celular ya existe en el localStorage
  const users = getUsersFromLocalStorage();
  const existingUser = users.find(user => user.phone_number === phoneNumber);
  if (existingUser) {
    Swal('El número de celular ingresado ya está registrado');
    return;
  }

  // Crea el objeto de usuario con ID secuencial
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

  try {
    // Realiza la solicitud POST para crear el nuevo usuario en el endpoint
    const response = await axios.post(endpoints.urlUsers, newUser);
    const createdUser = response.data;

    // Agrega el nuevo usuario al array de usuarios en el localStorage
    // users.push(createdUser);
    // saveUsersToLocalStorage(users);

    Swal('El nuevo usuario fue creado exitosamente').then(() => {
     // Limpiar el formulario después de mostrar la alerta
      clearForm(); 
     // Redirige a la página de inicio de sesión
      window.location.href = 'index.html'; 
    });
  } catch (error) {
    Swal('Ocurrió un error al crear el usuario');
  }
};

// Llama a fetchUsersFromEndpoint al iniciar la aplicación
fetchUsersFromEndpoint();

// click para registrar
registrationFormContainer.addEventListener('submit', handleSignUp);
