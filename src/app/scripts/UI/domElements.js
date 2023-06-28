export const form_login = document.getElementById('form_login')
export const signUpbtn= document.getElementById("signUpbtn"); 
export const registrationFormContainer = document.getElementById('registration-form-container');
export const getFormValues = () => ({
    name: getFormValue('name'),
    phoneNumber: getFormValue('phone_number'),
    password: getFormValue('password'),
    profilePicUrl: getFormValue('profile_pic_url'),
    about: getFormValue('phrase')
  });
  
export const getFormValue = (fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) {
      return field.value.trim();
    }
    return '';
  };
  
  export const clearForm = () => {
    const form = document.querySelector('.form');
    if (form) {
      form.reset();
    }
  };
  