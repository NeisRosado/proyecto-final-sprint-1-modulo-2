import { endpoints } from "./data.js";
import axios from 'axios';
import { profileEditName, profileCurrentName, profilePicture, chatUserImage } from '../UI/domElements.js';
import { getCurrentUser, setCurrentUser } from "./home.js";

profileEditName.addEventListener('click', () => {
    let username = prompt("Por favor ingrese su nuevo nombre");
    if (username == "" || username == null || username == undefined) {
        alert("No has hecho ninguna modificación en tu nombre");
        return false;
    }
    let currentUser = getCurrentUser()
    let isUpdated = updateUserProfile({...currentUser, name: username})
    alert(isUpdated ? "Se actualizó el perfil" : "No se logró actualizar el perfil") // Fast statement
    updateDataByAttribute("name", username);
    // if (isUpdated) {
    //     alert("Se actualizó el perfil")
    // } else {
    //     alert("No se logró actualizar el perfil")
    // }
});

profilePicture.addEventListener("click", () => {
    let picture = prompt("Ingresa la URL de tu nueva imagen de perfil");
    console.log(picture)
    if (picture == "" || picture == null || picture == undefined) {
        alert("No has hecho ninguna modificación en tu nombre");
        return false;
    }
    let currentUser = getCurrentUser()
    let isUpdated = updateUserProfile({...currentUser, profile_pic_url: picture})
    alert(isUpdated ? "Se actualizó el perfil" : "No se logró actualizar el perfil") // Fast statement
    console.log(picture)
    console.log(isUpdated)
    updateDataByAttribute("url_picture", picture);
})

let updateUserProfile = async (user) => {
    const url = endpoints.urlUsers + "/" + user.id;
    try {
        const response = await axios.put(url, user);
        if (response.status == 200) {
            setCurrentUser(response.data)
        }
        return false;
      } catch (error) {
        console.error('Error al obtener los usuarios del endpoint', error);
        return false;
      }
}

export const updateDataByAttribute = (field, value) => {
    switch (field) {
        case "name":
            profileCurrentName.textContent = value;
        case "url_picture":
            console.log("Valor a actualizar", value)
            chatUserImage.src = value;
    }
}