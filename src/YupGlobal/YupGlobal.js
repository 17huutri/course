import * as yup from "yup";

const PASSWORD_RE =
  /^(?=.*\d)(?=(.*\W){1})(?=.*[A-Z]{1})(?=.*[a-zA-Z])(?!.*\s).{1,32}$/;
const EMAIL_RE = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PHONENUMBER_RE = /^(\+84|0)+(3|5|7|8|9)+([0-9]{8})$/;

yup.addMethod(yup.string, "password", function (message) {
  return this.matches(PASSWORD_RE, {
    message:
      "Password must be have at least 1 digit and 1 special character and 1 capital letter",
    excludeEmptyString: true,
  });
});

yup.addMethod(yup.string, "email", function validateEmail(message) {
  return this.matches(EMAIL_RE, {
    message: "Misformatted email",
    name: "email",
    excludeEmptyString: true,
  });
});

yup.addMethod(yup.string, "phoneNumber", function validateNumberPhone(message) {
  return this.matches(PHONENUMBER_RE, {
    message: "Misformatted Phone Number",
    name: "phoneNumber",
    excludeEmptyString: true,
  });
});

export default yup;
