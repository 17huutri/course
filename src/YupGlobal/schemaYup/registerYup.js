import yup from "../YupGlobal";
const schemaRegister = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  username: yup.string().required("Username is required "),
  phoneNumber: yup.string().phoneNumber().required("Phone Number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be min at 6 characters")
    .max(32, "Password must be max at 32 characters")
    .password(),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be min at 6 characters")
    .max(32, "Password must be max at 32 characters")
    .password()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default schemaRegister;
