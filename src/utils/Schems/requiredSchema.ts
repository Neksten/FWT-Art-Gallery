import * as yup from "yup";

export const requiredSchema = () => yup.string().required("Required field");
