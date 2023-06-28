import { signUpbtn } from "./domElements.js";
import { registrationFormContainer } from "./domElements.js";

export const printSignUp = (e) => {
  e.preventDefault();
const initialFormLogin = document.getElementById("form_login");
  const registrationForm = document.createElement("form");
  registrationForm.classList.add("form");
   registrationForm.innerHTML = `
    <h2>Crear Cuenta</h2>
    <input class="form__input" type="text" id="name" placeholder="Nombre" />
    <input class="form__input" type="number" id="number" placeholder="Número de celular" />
    <input class="form__input" type="password" id="password" placeholder="Contraseña" />
    <input class="form__input" type="url" id="image-url" placeholder="URL de la imagen del usuario" />
    <textarea class="form__input" id="phrase" placeholder="Estado"></textarea>
    <div class="form__divButtons">
      <button class="form__button form__button--signup" id="signup" type="submit">Registrarse</button>
    </div>
  `;
  initialFormLogin.style.display = "none";
  registrationFormContainer.innerHTML = "";
  registrationFormContainer.appendChild(registrationForm);
};

signUpbtn.addEventListener("click", printSignUp);
