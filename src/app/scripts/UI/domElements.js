export const form_login = document.getElementById('form_login')
export const signUpbtn= document.getElementById("signUpbtn"); 
export const registrationFormContainer = document.getElementById('registration-form-container');
export const initialFormLogin = document.getElementById("form_login");
export const chatUserImage = document.getElementById('chatUserImage');
export const getFormValues = () => ({
  name: getFormValue('name'), phoneNumber: getFormValue('phone_number'), password: getFormValue('password'), profilePicUrl: getFormValue('profile_pic_url'), about: getFormValue('phrase')
}); // valida los inputs del form
export const getFormValue = (fieldId) => (fieldId && document.getElementById(fieldId)) ? document.getElementById(fieldId).value.trim() : ''; // valida los campos vacíos
export const clearForm = () => document.querySelector('.form') ? document.querySelector('.form').reset() : null; // limpia el form

