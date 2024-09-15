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

export const CreateItemSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  locationFound: Yup.string().required("Required"),
  dateFound: Yup.string().required("Required"),
  inPossession: Yup.boolean(),
});

export const UpdateClaimSchema = Yup.object().shape({
  status: Yup.string().required("Required"),
});
