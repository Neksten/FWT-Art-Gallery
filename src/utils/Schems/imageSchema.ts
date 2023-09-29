import * as yup from "yup";

export const imageSchema = () => {
  return yup
    .mixed()
    .test("fileType", "This file type is not supported", (value) => {
      if (value instanceof File) {
        const fileName = value.name.toLowerCase().split(".").pop();
        return ["jpg", "jpeg", "png"].includes(fileName || "");
      }
      if (value?.toString().includes(process.env.REACT_APP_BASE_URL || "")) {
        return true;
      }
      return false;
    })
    .test("fileSize", "The file is to large", (value) => {
      if (value instanceof File) {
        return value.size <= 3000000;
      }
      if (value?.toString().includes(process.env.REACT_APP_BASE_URL || "")) {
        return true;
      }
      return false;
    })
    .required("Required");
};
