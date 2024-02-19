const strings = {
  fontFamily: 'PTSerif-Regular',
  travelogue: 'TRAVELOGUE',
  travelMess: 'Travel around the world',
  email: 'Email',
  emailHint: 'Enter Email',
  password: 'Password',
  passwordHint: 'Enter Password',
  signup: 'Signup',
  signupMess: 'To travel around the world',
  login: 'Login',

  firstName: 'FirstName',
  firstNameMsg: 'Enter First Name',
  createAccountMsg: "Don't have an account?",
  lastName: 'LastName',
  lastNameMsg: 'Enter Last Name',
  dob: 'Date of Birth',
  dobMsg: 'Select Date',
  contact: 'Contact',
  contactMsg: 'Enter Contact',
  emailUserID: 'Email (User Id)',
  emailUidMsg: 'Enter Email',
  confirmPass: 'Confirm Password',
  confirmPassMsg: 'Re-enter Password',
  alreadyHaveAccount: 'Already have an account?',

  errors: {
    emailEmpty: 'Email is required',
    passEmpty: 'Password is required',
    invalidEmail: 'Invalid Email',
    passUppCaseErr: 'Password should contain atleast one upperCase',
    passLowerCaseErr: 'Password should contain atleast one lowerCase',
    passSpecialErr: 'Password should contain atleast one specialCharacter',
    passDigitErr: 'Password should contain atleast one digit',
    passLengthErr: 'Password must be at least of 8 length',
    firstNameErr:'FirstName is required',
    lastNameErr:'LastName is required',
    contactErr:'Contact is required',
    

    

  },

  regex: {
    emailRegex:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    passLowerCase: '.*[a-z].*',
    passUpperCase: '.*[A-Z].*',
    passDigit: '.*\\d.*',
    passSpecial: /[-’`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g,
    mobileRegex: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  },
};

export  {strings};
