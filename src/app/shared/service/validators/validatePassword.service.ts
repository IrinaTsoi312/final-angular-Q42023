import { AbstractControl, ValidatorFn } from "@angular/forms";

export function customPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
    const password = control.value;
    const errors: { [key: string]: string } = {};

    if (!password) {
      return null;
    }
    if (password.length < 8) {
      errors['minlength'] = 'Password must be at least 8 characters long.';
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      errors['uppercaseLowercase'] = 'Password must contain a mixture of uppercase and lowercase characters.';
    }
    if (!/[!@#$%^&*_]/.test(password)) {
      errors['specialCharacter'] = 'Password must contain at least one special character (!@#$%^&*_).';
    }
    return Object.keys(errors).length ? errors : null;
  };
}