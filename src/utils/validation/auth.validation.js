import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[a-zA-Z]+$/gi, "Only letters are allowed in name"),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z]+$/gi, "Only letters are allowed in name")
    .optional(),

  phoneNumber: yup
    .string()
    .matches(/^\+91\s?[6-9]\d{9}$/gi, "Invalid Phone")
    .required("Phone is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});
