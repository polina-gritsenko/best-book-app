import { AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export function dateFormatValidator(control: AbstractControl): ValidationErrors | null {
  const dateString = control.value;

  const regEx = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

  const matchResult = dateString.match(regEx);

  if (matchResult === null) {
    return { invalidFormat: true };
  }
  return null;
}


