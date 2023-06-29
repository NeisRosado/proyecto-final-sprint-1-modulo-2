import { chat_container, signInbtn, loginForm } from "./domElements";

export const showChatView = () => {
  signInbtn.addEventListener('click', () => {
    localStorage.setItem("chatVisible", "true");
  });
  const chatVisible = localStorage.getItem("chatVisible");
  if (chatVisible) {
    loginForm.style.display = "none";
    chat_container.removeAttribute("id");
  }
};







