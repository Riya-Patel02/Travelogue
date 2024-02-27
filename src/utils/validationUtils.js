import React, {Component} from 'react';

import {isValidPhoneNumber} from 'react-phone-number-input/core';
import {isValidNumber} from 'react-native-phone-number-input';
import { strings } from './strings';

class ValidationUtils {
  constructor() {
    this.errors = {};
  }

  // Method to set errors
  setErrors(errors) {
    this.errors = {...this.errors, ...errors};
  }

  ///method to clear errors
  clearError = () => (this.errors = {});

  ///function to validate email
  ValidateEmail = ({email}) => {
    const trimmedEmail = email != undefined ? email.trim() : null;

    if (!trimmedEmail) {
      this.setErrors({email: strings.errors.emailEmpty});
      return false;
    } else if (trimmedEmail.match(strings.regex.emailRegex) == null) {
      this.setErrors({email: strings.errors.invalidEmail});
      return false;
    } else {
      this.setErrors({email: null});
      return true;
    }
  };

  ///function to validate first name
  ValidateFName = ({fname}) => {
    console.log(fname);
    if (!fname) {
      this.setErrors({firstName: strings.errors.firstNameErr});
      return false;
    } else {
      this.setErrors({firstName: null});
      return true;
    }
  };

  ///function to validate last name
  ValidateLName = ({lname}) => {
    if (!lname) {
      this.setErrors({lastName: strings.errors.lastNameErr});
      return false;
    } else {
      this.setErrors({lastName: null});
      return true;
    }
  };

  ///function to validate dob
  ValidateDob = ({dob}) => {
    if (!dob) {
      this.setErrors({dob: 'DOB cannot be empty'});
      return false;
    } else {
      this.setErrors({dob: null});
      return true;
    }
  };

  // Function to validate mobile contact
  ValidateContact = ({contact, countryCode}) => {
    console.log(contact);
    if (!contact) {
      this.setErrors({contact: strings.errors.contactErr});
      return false;
    } else if (!isValidNumber(contact, countryCode)) {
      this.setErrors({contact: 'Invalid Contact'});
      return false;
    } else {
      this.setErrors({contact: null});
      return true;
    }
  };

 

  ///function to validate confirm password
  ValidateConfirmPass = ({confirmPass, pass}) => {
    if (!confirmPass) {
      this.setErrors({confirmPass: strings.errors.passEmpty});
      return false;
    } else if (confirmPass.match(strings.regex.passLowerCase) == null) {
      this.setErrors({
        confirmPass: strings.errors.passLowerCaseErr,
      });
      return false;
    } else if (confirmPass.match(strings.regex.passUpperCase) == null) {
      this.setErrors({
        confirmPass: strings.errors.passUppCaseErr,
      });
      return false;
    } else if (confirmPass.match(strings.regex.passDigit) == null) {
      this.setErrors({
        confirmPass: strings.errors.passDigitErr,
      });
      return false;
    } else if (confirmPass.match(strings.regex.passSpecial) == null) {
      this.setErrors({
        confirmPass: strings.errors.passSpecialErr,
      });
      return false;
    } else if (confirmPass.length < 8) {
      this.setErrors({
        confirmPass: strings.errors.passLengthErr,
      });
      return false;
    } else if ((confirmPass == pass) == false) {
      this.setErrors({confirmPass: 'ConfirmPassword is not same as Password'});
      return false;
    } else {
      this.setErrors({confirmPass: null});
      return true;
    }
  };

  ///function to validate password
  ValidatePassword = ({password}) => {
    if (!password) {
      this.setErrors({password: strings.errors.passEmpty});
      return false;
    } else if (password.match(strings.regex.passLowerCase) == null) {
      this.setErrors({
        password: strings.errors.passLowerCaseErr,
      });
      return false;
    } else if (password.match(strings.regex.passUpperCase) == null) {
      this.setErrors({
        password: strings.errors.passUppCaseErr,
      });
      return false;
    } else if (password.match(strings.regex.passDigit) == null) {
      this.setErrors({
        password: strings.errors.passDigitErr,
      });
      return false;
    } else if (password.match(strings.regex.passSpecial) == null) {
      this.setErrors({
        password: strings.errors.passSpecialErr,
      });
      return false;
    } else if (password.length < 8) {
      this.setErrors({
        password: strings.errors.passLengthErr,
      });
      return false;
    } else {
      this.setErrors({password: null});
      return true;
    }
  };
}

export default ValidationUtils;
