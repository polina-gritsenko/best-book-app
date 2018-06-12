import { FormGroup, FormControl, FormArray } from '@angular/forms';

export class Helper {
  public static isControlInvalid(formGroupRef: FormGroup, controlName: string): boolean {
    const control = formGroupRef.get(controlName);
    return control.invalid && control.touched;
  }

  public static validateControls(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched();
    });
  }

  public static validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((arrayControl: FormGroup) => {
          this.validateAllFormFields(arrayControl);
        });
      }
    });
  }
}
