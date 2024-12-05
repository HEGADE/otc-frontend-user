import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(
      /^[A-Za-zÀ-ÿ\s'-]{2,50}$/,
      "First name must be 2-50 characters long and can include letters, spaces, hyphens, and apostrophes"
    )
    .matches(/^[a-zA-Z]+$/gi, "Only letters are allowed"),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z]+$/gi, "Only letters are allowed")
    .optional(),

  phoneNumber: yup
    .string()
    .matches(/^\+91\s?[6-9]\d{9}$/gi, "Invalid Phone (Add +91)")
    .required("Phone is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be no more than 64 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Password must contain at least one letter and one number"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be no more than 64 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Password must contain at least one letter and one number"
    )
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

export const googleLoginPhoneSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^\+91\s?[6-9]\d{9}$/gi, "Invalid Phone (Add +91)")
    .required("Phone is required"),
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

export const verifyEmailSchema = yup.object().shape({
  emailVerificationToken: yup.string().required("Token is required"),
});

export const verifyPhoneNumberSchema = yup.object().shape({
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
    accountHolderName: yup
      .string()
      .required("Account Holder Name is required")
      .matches(
        /^[a-zA-ZÀ-ÿ\s.'-]+$/u,
        "Only letters, spaces, and basic punctuation allowed"
      )
      .min(2, "Minimum 2 characters")
      .max(50, "Maximum 50 characters"),
    bankName: yup
      .string()
      .required("Bank Name is required")
      .min(2, "Bank Name must be at least 2 characters")
      .max(50, "Bank Name must not exceed 50 characters"),
    accountNumber: yup
      .string()
      .required("Account Number is required")
      .matches(
        /^[a-zA-Z0-9]{5,20}$/,
        "Account Number must be between 5 and 20 alphanumeric characters"
      ),
    branch: yup
      .string()
      .required("Branch is required")
      .min(2, "Branch must be at least 2 characters")
      .max(50, "Branch must not exceed 50 characters"),
    ifsCode: yup
      .string()
      .required("IFSC Code is required")
      .length(11, "IFSC Code must be exactly 11 characters")
      .matches(
        /^[A-Z0-9]+$/,
        "Only alphanumeric allowed"
      ),
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
