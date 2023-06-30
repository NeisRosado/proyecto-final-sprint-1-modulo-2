import { registrationFormContainer, signUpbtn } from "./domElements.js";
import { initialFormLogin} from "./domElements.js";

export const printSignUp = (e) => {
  e.preventDefault();
  const registrationForm = document.createElement("form");
  registrationForm.classList.add("form");
   registrationForm.innerHTML = `
    <h2>Crear Cuenta</h2>
    <input class="form__input" type="text" id="name" placeholder="Nombre" />
    <input class="form__input" type="number" id="phone_number" placeholder="Número de celular" />
    <input class="form__input" type="password" id="password" placeholder="Contraseña" />
    <input class="form__input" type="url" id="profile_pic_url" placeholder="URL de la imagen del usuario" />
    <textarea class="form__input" id="phrase" placeholder="About"></textarea>
    <div class="form__divButtons">
      <button class="form__button form__button--signup" id="signup" type="submit">Registrarse</button>
    </div>
  `;
  initialFormLogin.style.display = "none";
  registrationFormContainer.innerHTML = "";
  registrationFormContainer.appendChild(registrationForm);
};

signUpbtn.addEventListener("click", printSignUp);
