const valueIsUndefined = (value) => typeof value === 'undefined' || value === null;

const emailIsValid = (email) => {
  const regexEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return regexEmail.test(email);
};

module.exports = {
  valueIsUndefined,
  emailIsValid,
};