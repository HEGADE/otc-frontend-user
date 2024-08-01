import axios from "../../../lib/http-request/index"
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../store/user.store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { kycDocSchema } from "../../../utils/validation/kyc.validation";
import { ValidationError } from "../../UI/Errors";
import WebcamCapture from "../WebCamCapture";
import { API } from "../../../utils/config/api-end-points.config";

function KycVerification() {
  // const [selectedDocType, setSelectedDocType] = useState("VOTERID");
  const [isloading, setIsLoading] = useState(false);
  const [kycCurrentStatus, setkycCurrentStatus] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const accessToken = useUserStore((state) => state.accessToken);

  const isPanVerified = kycCurrentStatus.includes("PAN");
  const isAadhaarVerified = kycCurrentStatus.includes("AADHAAR");
  const isImageVerified = kycCurrentStatus.includes("FACE_MATCH");
  // const isMiscellaneousVerified =
  //   kycCurrentStatus.includes("PASSPORT") ||
  //   kycCurrentStatus.includes("VOTERID");

  const fieldsToInclude = [];
  if (!isPanVerified) fieldsToInclude.push("panCard");
  if (!isAadhaarVerified) fieldsToInclude.push("aadhaarCard");
  // if (!isMiscellaneousVerified) fieldsToInclude.push("miscellaneousDoc");
  if (!isImageVerified) fieldsToInclude.push("faceMatch");

  useEffect(() => {
    const fetchKycDetails = async () => {
      try {
        const kycStatus = await axios.get(
          API.getKycDetails,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        setkycCurrentStatus(kycStatus?.data?.data);
        console.log("🟢 KYC Status: ", kycStatus?.data);
      } catch (err) {
        console.error("🔴 Error occurred during fetching KYC Details", err);
      }
    };
    fetchKycDetails();
  }, [user]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(kycDocSchema(fieldsToInclude, capturedImage)),
  });

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("PAN", data?.panCard?.[0]);
    formData.append("AADHAAR", data?.aadhaarCard?.[0]);
    if (capturedImage) {
      const blob = await fetch(capturedImage).then((res) => res.blob());
      formData.append("FACE_MATCH", blob, "face_image.jpg");
    }
    // if (selectedDocType === "VOTERID") {
    //   formData.append("VOTERID", data?.miscellaneousDoc?.[0]);
    // }
    // if (selectedDocType === "PASSPORT") {
    //   formData.append("PASSPORT", data?.miscellaneousDoc?.[0]);
    // }

    try {
      setIsLoading(true);
      const response = await axios.post(
        API.saveKycDetails,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      console.log("🟢 KYC verified successfully: ", response?.data);
      setUser(response?.data?.data);
    } catch (error) {
      console.error("🔴 Error Verifying KYC", error);
      console.log(
        "🟣 KYCStatus after submission: ",
        error.response?.data?.data
      );
      setkycCurrentStatus(error.response?.data?.data);
    } finally {
      setIsLoading(false);
      reset();
    }
  });

  return (
    <div>
      <section
        className="page-header bg--cover"
        style={{ backgroundImage: "url(/assets/images/banner/4.jpg)" }}
      >
        <div className="container">
          <div
            className="page-header__content mt-100 text-center"
            data-aos-duration="1000"
          >
            <h2>KYC Verification</h2>
          </div>
          <div className="page-header__shape">
            <span className="page-header__shape-item page-header__shape-item--1">
              <img src="/assets/images/2.png" alt="shape-icon" />
              <img src="/assets/images/2.png" alt="shape-icon" />
            </span>
          </div>
        </div>
      </section>

      <section className="account padding-top padding-bottom sec-bg-color2">
        <div className="container">
          <div className="row g-4">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <form
                    action="account-category.html"
                    id="verificationForm"
                    onSubmit={onSubmit}
                  >
                    <div>
                      <div className="input-block">
                        <h4>
                          Upload the following details for KYC Verification
                        </h4>
                      </div>
                      {!isPanVerified && (
                        <div className="m-3">
                          <p>
                            Please upload your <strong>PAN card</strong> here
                            for verification
                          </p>
                          <div className="form-flex email-verification-form">
                            <input
                              {...register("panCard")}
                              type="file"
                              className="form-control"
                              id="account-email"
                              placeholder="Enter otp"
                              required
                            />
                            {errors.panCard && (
                              <ValidationError err={errors.panCard} />
                            )}
                          </div>
                        </div>
                      )}
                      {!isAadhaarVerified && (
                        <div className="m-3">
                          <p>
                            Please upload your <strong>AADHAAR card</strong>{" "}
                            here for verification
                          </p>
                          <div className="form-flex email-verification-form">
                            <input
                              {...register("aadhaarCard")}
                              type="file"
                              className="form-control"
                              id="account-email"
                              placeholder="Enter otp"
                              required
                            />
                            {errors.aadhaarCard && (
                              <ValidationError err={errors.aadhaarCard} />
                            )}
                          </div>
                        </div>
                      )}
                      {/* {!isMiscellaneousVerified && (
                        <div className="m-3">
                          <p>
                            Please upload your
                            <strong> VOTER ID card / Passport </strong>
                            here for verification
                          </p>
                          <div className="form-flex email-verification-form">
                            <select
                              className="form-control"
                              onChange={(e) =>
                                setSelectedDocType(e.target.value)
                              }
                              value={selectedDocType}
                            >
                              <option value="VOTERID">Voter ID</option>
                              <option value="PASSPORT">Passport</option>
                            </select>
                          </div>
                          <div className="form-flex email-verification-form mt-3">
                            <input
                              {...register("miscellaneousDoc")}
                              type="file"
                              className="form-control"
                              id="account-email"
                              placeholder="Enter otp"
                              required
                            />
                            {errors.miscellaneousDoc && (
                              <ValidationError err={errors.miscellaneousDoc} />
                            )}
                          </div>
                        </div>
                      )} */}
                      {!isImageVerified && (
                        <div className="m-3">
                          <p>
                            Please capture your <strong>Face Image</strong> for
                            verification
                          </p>
                          <div className="form-flex email-verification-form">
                            <WebcamCapture onCapture={setCapturedImage} />
                            {errors && (
                              <ValidationError err={errors.capturedImage} />
                            )}
                            {capturedImage && (
                              <img
                                src={capturedImage}
                                alt="Captured"
                                style={{ marginTop: "10px", maxWidth: "100%" }}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className={
                        isloading
                          ? `trk-btn trk-btn--border trk-btn--secondary3 d-block mt-4`
                          : `trk-btn trk-btn--border trk-btn--primary d-block mt-4`
                      }
                      disabled={isloading}
                    >
                      {isloading ? "Verifying..." : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="account__shape">
          <span className="account__shape-item account__shape-item--1">
            <img src="/assets/images/2.png" alt="shape-icon" />
            <img src="/assets/images/2.png" alt="shape-icon" />
          </span>
        </div>
      </section>
    </div>
  );
}

export default KycVerification;
