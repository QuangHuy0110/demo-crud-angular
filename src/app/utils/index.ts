import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as any;
    const password = formGroup.controls['password'].value;
    const repeatPassword = formGroup.controls['repeatPassword'].value;

    if (password === repeatPassword) {
      return null;
    }

    return { noMatch: true };
  };
}
