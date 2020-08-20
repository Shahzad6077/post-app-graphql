const userRegisterFields = (
  email = "",
  username = "",
  password = "",
  confirmPassword = ""
) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username should not be empty.";
  }
  if (email.trim() === "") {
    errors.email = "Email should not be empty.";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (password === "") {
    errors.password = "Password should not be empty.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password Must Match.";
  }

  console.log(Object.keys(errors).length);
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
const userLoginFields = (username = "", password = "") => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username should not be empty.";
  }

  if (password === "") {
    errors.password = "Password should not be empty.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports = {
  userLoginFields,
  userRegisterFields
};
