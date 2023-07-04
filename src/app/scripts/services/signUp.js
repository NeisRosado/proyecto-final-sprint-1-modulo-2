import Swal from 'sweetalert';
import { newUserForm } from '../UI/domElements.js';
import { endpoints } from "./data.js";
import axios from 'axios';


const createUser = async (user) => {
  try {
    const headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(endpoints.urlUsers, user, { headers });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Oops, hubo un error al crear el usuario');
  }
};

const checkPhoneNumberExists = async (phoneNumber) => {
  try {
    const response = await axios.get(`${endpoints.urlUsers}?phone_number=${phoneNumber}`);
    return response.data.length > 0;
  } catch (error) {
    console.error(error);
    throw new Error('Oops, hubo un error al verificar el número de teléfono');
  }
};

newUserForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { name, phone_number, password, profile_pic_url, about } = event.target;

  const newUser = {
    name: name.value,
    phone_number: phone_number.value,
    password: password.value,
    profile_pic_url: profile_pic_url.value,
    about: about.value
  };

  try {
    const phoneNumberExists = await checkPhoneNumberExists(newUser.phone_number);

    if (phoneNumberExists) {
      Swal('El número de celular ya existe');
    } else {
      const response = await createUser(newUser);
      if (response && response.status === 201) {
        Swal('Usuario creado correctamente');
      } else {
        console.log('Oops, hubo un error al crear el usuario');
      }
    }
  } catch (error) {
    console.error(error);
    console.log('Oops, hubo un error al crear el usuario');
  }

  newUserForm.reset();
});

