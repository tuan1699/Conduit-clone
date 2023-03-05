export const validateEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  if (password.trim() !== "") {
    return true;
  } else return false;
};
