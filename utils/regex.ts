export const EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEX: RegExp = /^.{6,20}$/;
export const CEDULA_REGEX: RegExp = /^((0[1-9])|(1[0-9])|([2][0-4])|(30))[0-9]{8}$/;
export const CHAR_REGEX: RegExp = /[a-zA-Z@\!#$\+%^&\*\(\)\,;\:\.\<\>\\@\/\-\-\_]/;
export const FLOAT_FIXED_2: RegExp = /^(\d*\.?)(\d{1,2})?/;
