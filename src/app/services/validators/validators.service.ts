import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { PhoneNumber, PhoneNumberUtil } from 'google-libphonenumber';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  ValidateOnlyLetters(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let controlValue = control.value;
      const onlyLettersRegex = /^[A-Za-z\s]+$/;

      if (control.value) {
        if (new RegExp(onlyLettersRegex, 'g').test(controlValue)) {
          return null;
        } else {
          return { 'invalidOnlyLetters': true }
        }
      } else {
        return null;
      }

    }
  }

  ValidatePhoneNumber(countryISOCode: string = 'VN'): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneUtil: PhoneNumberUtil = PhoneNumberUtil.getInstance();
      let phoneNumber: PhoneNumber | undefined;

      if (control.value) {
        try {
          phoneNumber = phoneUtil.parseAndKeepRawInput(control.value, countryISOCode);

          if (phoneUtil.isValidNumber(phoneNumber)) {
            return null;
          } else {
            return { invalidPhone: true };
          }
        } catch (err) {
          return { invalidPhone: true };
        }
      } else {
        return null;
      }

    }
  }

  ValidatePassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let controlValue = control.value;
      // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (control.value) {
        if (new RegExp(passwordRegex, 'g').test(controlValue)) {
          return null;
        } else {
          return { invalidPassword: true };
        }
      } else {
        return null;
      }
    }
  }
}
