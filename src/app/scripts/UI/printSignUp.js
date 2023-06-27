import { getUsers } from "../services/signUp.js";
import { signUpButtom } from "./domElements.js";
import { registrationFormContainer } from "./domElements.js";
import { initialFormContainer } from "./domElements.js";

// pintar formulario
export const printSignUp = (e) => {
e.preventDefault();
initialFormContainer.style.display = "none";

registrationFormContainer.innerHTML = "";
const formSignUp = document.createElement("form");
formSignUp.innerHTML = `
<form class="form">
<h2>Crear Cuenta</h2>
<input class="form__input" type="text" id="name" placeholder="Nombre"/>
<input class="form__input" type="number" id="number" placeholder="Número de celular"/>
<input class="form__input" type="password" id="password" placeholder="Contraseña"/>
<input class="form__input" type="url" id="image-url" placeholder="URL de la imagen del usuario"/>
<textarea class="form__input" id="phrase" placeholder="Estado"></textarea>
<div form__divButtons> <button class="form__button form__button--signup" id="signup" type="submit">Registrarse</button>
</div>
</form>

`;
registrationFormContainer.appendChild(formSignUp);
}
signUpButtom.addEventListener("click", printSignUp);