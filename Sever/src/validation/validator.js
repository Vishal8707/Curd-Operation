//======================================= Name Regex Validation ========================================//


const validateName = (name) => {
  // name = name.trim();
    return (/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(name))
  }
  
  
  
  //====================================== Email Regex Validation =======================================//
  
  
  const validateEmail = (emailId) => {
    // emailId = emailId.trim();
    return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(emailId)
  }
  
  
  //===================================== Password Regex Validation ====================================//
  
  
  const validatePassword = (password) => {
    // password = password.trim();
    return (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password));
  }
   //==================================== Number Regex Validation ======================================//
  
  
   const validateMobileNo = (Number) => {
    // Number = Number.trim()
    return ((/^((\+91)?|91)?[6789][0-9]{9}$/g).test(Number));
  }

  module.exports = { validateName, validateEmail, validatePassword, validateMobileNo }