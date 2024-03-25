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
export const loginSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});
export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});
export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
export const verifyEmailAndPhoneNumberSchema = yup.object().shape({
  emailVerificationToken: yup.string().required("Token is required"),
  phoneVerificationToken: yup
    .string()
    .min(6, "OTP must be at least 6 characters")
    .required("OTP is required"),
});
export const userDetailsSchema = yup.object().shape({
  userDetails: yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().required("Email is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
  }),
});
export const bankDetailsSchema = yup.object().shape({
  bankDetails: yup.object().shape({
    accountHolderName: yup.string().required("Account Holder Name is required"),
    bankName: yup.string().required("Bank Name is required"),
    accountNumber: yup.string().required("Account Number is required"),
    branch: yup.string().required("Branch Number is required"),
    ifsCode: yup.string().required("IFSC Code is required"),
  }),
});
export const transactionDetailsSchema = yup.object().shape({
  sendAmount: yup.number().required("Send Amount is required"),
  receivedAmount: yup.number().required("Purchase Amount is required"),
  walletAddress: yup.string().required("Wallet Address is required"),
});
export const transactionAccountDetailsSchema = yup.object().shape({
  primaryTransactionReceipt: yup
    .string()
    .required("Primary Transaction Receipt is required"),
});
