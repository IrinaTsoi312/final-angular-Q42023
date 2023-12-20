import { AbstractControl, ValidatorFn } from "@angular/forms";

export function customDateValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: string } | null => {
    const date = control.value;
    const errors: { [key: string]: string } = {};
    const now = new Date();
    const inputDate = new Date(date);

    if (inputDate > now) {
      errors['futureDate'] = 'Date cannot be in the future';
    }

    return Object.keys(errors).length ? errors : null;
  };
}