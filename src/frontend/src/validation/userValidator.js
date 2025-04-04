export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(password)
}

export function validateName(name) {
  const regex = /^[A-Za-z]{1,50}$/;
  return regex.test(name);
}
