import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appLetterNumberMinLength]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: LetterNumberMinLengthDirective,
      multi: true,
    },
  ],
})
export class LetterNumberMinLengthDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    if (value.length > 0 && value.length < 3) {
      return { minlength: { requiredLength: 3, actualLength: value.length } };
    }
    const alphanumericRegex = /^[a-zA-Z0-9\s]*$/;
    if (!alphanumericRegex.test(value)) {
      return { alphanumeric: { value: value } };
    }
    return null;
  }
}
