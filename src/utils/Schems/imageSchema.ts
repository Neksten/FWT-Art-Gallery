import * as yup from "yup";

import { checkingBaseUrl } from "@/utils/checkingBaseUrl";

export const imageSchema = () =>
  yup
    .mixed()
    .test("fileType", "This file type is not supported", (value) => {
      if (value instanceof File) {
        const fileName = value.name.toLowerCase().split(".").pop();
        return ["jpg", "jpeg", "png"].includes(fileName || "");
      }

      return checkingBaseUrl(value);
    })
    .test("fileSize", "The file is to large", (value) => {
      if (value instanceof File) {
        return value.size <= 3000000;
      }

      return checkingBaseUrl(value);
    })
    .required("Required");
