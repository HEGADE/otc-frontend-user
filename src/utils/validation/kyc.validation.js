import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "image/jpg"];

export const kycDocSchema = (fields, capturedImage) => {
  const schemaFields = {};

  if (fields.includes("panCard")) {
    schemaFields.panCard = Yup.mixed()
      .required("PAN card is required")
      .test(
        "fileFormat",
        "PAN Card must be a PNG, JPEG, or JPG file",
        (value) => value && SUPPORTED_FORMATS.includes(value[0].type)
      );
  }

  if (fields.includes("aadhaarCard")) {
    schemaFields.aadhaarCard = Yup.mixed()
      .required("Aadhaar card is required")
      .test(
        "fileFormat",
        "Aadhaar Card must be a PNG, JPEG, or JPG file",
        (value) => value && SUPPORTED_FORMATS.includes(value[0].type)
      );
  }

  if (fields.includes("faceMatch")) {
    if (!capturedImage) {
      schemaFields.capturedImage = Yup.mixed()
        .required("Face image is required")
        .test(
          "fileFormat",
          "Face Image must be a PNG, JPEG, or JPG file",
          (value) => value && SUPPORTED_FORMATS.includes(value?.type)
        );
    }
  }

  // if (fields.includes("miscellaneousDoc")) {
  //   schemaFields.miscellaneousDoc = Yup.mixed()
  //     .required("Voter ID or Passport is required")
  //     .test(
  //       "fileFormat",
  //       "Voter ID or Passport must be a PNG, JPEG, or JPG file",
  //       (value) => value && SUPPORTED_FORMATS.includes(value[0].type)
  //     );
  // }

  return Yup.object().shape(schemaFields);
};
