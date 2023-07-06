import { endpoints } from "./data.js";
import axios from 'axios';
import { profileEditName, profileCurrentName, profilePicture } from '../UI/domElements.js';
import swal from "sweetalert";

profileEditName.addEventListener('click', async () => {
    let username = prompt("Por favor ingrese su nuevo nombre");
    if (username == "" || username == null || username == undefined) {
        swal("No has hecho ninguna modificación en tu nombre");
        return;
    }
    const idUser = localStorage.getItem("loggedInUserId")
    let currentUser = await axios.get(`${endpoints.urlUsers}/${idUser}`)
    currentUser = currentUser.data;
    localStorage.setItem("loggedInUserName", username);
    try{
        await axios.put(`${endpoints.urlUsers}/${idUser}`, {...currentUser, name: username});
    } catch (error) {
        console.error('No se pudo actualizar el nombre', error);
        return;
    }
    profileCurrentName.textContent = username;
    swal("Se actualizó el nombre")
});

profilePicture.addEventListener("click", async () => {
    let picture = prompt("Ingresa la URL de tu nueva imagen de perfil");
    if (picture == "" || picture == null || picture == undefined) {
        swal("No has hecho ninguna modificación en tu nombre");
        return;
    }
    const idUser = localStorage.getItem("loggedInUserId")
    let currentUser = await axios.get(`${endpoints.urlUsers}/${idUser}`)
    currentUser = currentUser.data;
    localStorage.setItem("loggedInUserProfilePicUrl", picture);
    try{
        await axios.put(`${endpoints.urlUsers}/${idUser}`, {...currentUser, profile_pic_url: picture});
    } catch (error) {
        console.error('No se pudo actualizar la imagen', error);
        return;
    }
    const chatUserImage = document.querySelector(".avatarUserLeft");
    chatUserImage.src = picture;
    swal("Se actualizó tu foto correctamente")

})
