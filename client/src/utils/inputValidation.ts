export default function inputValidation(
  firstname: string | null,
  lastname: string | null,
  username: string | null,
  email: string | null,
  currentPassword: string | null,
  newPassword: string | null,
  birthdate: Date | null,
): string {
  if (!firstname && !lastname && !username && !email && !currentPassword && !newPassword && !birthdate) return 'empty';
  if (firstname && !nameValidation(firstname)) return 'firstname';
  if (lastname && !nameValidation(lastname)) return 'lastname';
  if (username && !usernameValidation(username)) return 'username';
  if (email && !emailValidation(email)) return 'email';
  if (birthdate && !birthdateValidation(birthdate.toISOString().split('T')[0])) return 'birthdate';
  if (currentPassword !== newPassword) return 'password';
  if (currentPassword && !passwordValidation(currentPassword)) return 'currentPassword';
  if (newPassword && !passwordValidation(newPassword)) return 'newPassword';
  return 'ok';
};

export function usernameValidation(username: string): boolean {
  const regex = /^[a-zA-Z][a-zA-Z0-9_@]*$/;
  if (username.length < 3 || username.length > 30 || !regex.test(username)) {
    return false;
  }
  return true;
}

export function nameValidation(name: string): boolean {
  const regex = /^[a-zA-Z][a-zA-Z\-' ]*$/;
  if (name.length < 3 || name.length > 30 || !regex.test(name)) {
    return false;
  }
  return true;
}

export function passwordValidation(password: string): boolean {
  const regex = /^[a-zA-Z0-9!?@]*$/;
  if (
    password.length < 8 ||
    password.length > 30 ||
    !regex.test(password) ||
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[!?@]/.test(password)
  ) {
    return false;
  }
  return true;
}

export function emailValidation(email: string): boolean {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
  if (email.length < 6 || !regex.test(email)) {
    return false;
  }
  return true;
}

export function birthdateValidation(birthdate: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(birthdate)) {
    return false;
  }
  const year = new Date().getFullYear();
  const birthdateYear = birthdate.split('-')[0];
  if (year - parseInt(birthdateYear) < 18) return false;
  if (year - parseInt(birthdateYear) > 120) return false;
  return true;
}
