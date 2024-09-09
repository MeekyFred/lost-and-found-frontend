import * as Yup from "yup";

import { emailRegEx, strongPasswordRegEx } from "./regex";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().matches(emailRegEx, "Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().matches(emailRegEx, "Invalid email").required("Required"),
  phoneNumber: Yup.string().required(),
  password: Yup.string()
    .min(6)
    .matches(strongPasswordRegEx, "Enter a valid password")
    .required("Required"),
});
