import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const group = control.parent;
    if (!group) {
      return {};
    }

    const password = group.get('password')?.value;
    const repeatPassword = group.get('repeatPassword')?.value;

    if (password === repeatPassword) {
      return {};
    }

    return { noMatch: true };
  };
}
