import yup from "../YupGlobal";

const schemaChangePass = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be min at 6 characters")
    .max(32, "Password must be max at 32 characters")
    .password(),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(6, "Password must be min at 6 characters")
    .max(32, "Password must be max at 32 characters")
    .password()
    .notOneOf(
      [yup.ref("currentPassword")],
      "New password must different from current pass"
    ),
  confirmNewPassword: yup
    .string()
    .required("Confirm New Password is required")
    .min(6, "Password must be min at 6 characters")
    .max(32, "Password must be max at 32 characters")
    .password()
    .oneOf([yup.ref("newPassword")], "Passwords must match with New Password"),
});

export default schemaChangePass;
