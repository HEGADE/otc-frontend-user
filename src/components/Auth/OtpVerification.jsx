import { useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { API } from "../../utils/config/api-end-points.config";
import axios from "../../lib/http-request";
import { verifyPhoneNumberSchema } from "../../utils/validation/auth.validation";
import { useUserStore } from "../../store/user.store";

export const OtpVerification = () => {
  const navigate = useNavigate();

  const accessToken = useUserStore((state) => state.accessToken);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // let { state } = useLocation();

  let state = {
    phoneNumber: user.phoneNumber,
    userId: user.id,
  };

  const { phoneNumber, userId } = state;

  // Define a base schema
  const baseSchema = verifyPhoneNumberSchema;

  // Modify the schema based on conditions
  const modifySchema = (schema, isPhoneVerified) => {
    if (isPhoneVerified) {
      schema = schema.omit("phoneVerificationToken");
    }
    return schema;
  };

  const [verificationStatus, setVerificationStatus] = useState({
    isPhoneNumberVerified: user.isPhoneNumberVerified,
  });

  console.log("🟣 verificationStatus: ", verificationStatus);

  // if (isLoading) return <h1>Loading</h1>;
  // return (
  //   <>
  //     <Container.Auth>
  //       <QRCode value={data?.data?.data} />
  //     </Container.Auth>
  //   </>
  // );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      modifySchema(baseSchema, verificationStatus.isPhoneVerified)
    ),
  });

  const sendOtpForPhoneNumVerification = async (
    phoneNumber,
    reason = "login"
  ) => {
    try {
      const res = await axios({
        method: "POST",
        url: API.sendOtpForPhoneNumVerification,
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        data: { phoneNumber, reason },
      });
      console.log("sendOtpForPhoneNumVerification: res: ", res);
      if (res.status == 200) {
        toast.success(res?.data?.message);
      }
    } catch (err) {
      console.error("Error: ", err);
      toast.error(err?.response?.data?.message || "Some error encountered");
    }
  };

  const verifyPhoneNumber = async (phoneNumber, otp, reason = "login") => {
    try {
      const res = await axios({
        method: "POST",
        url: API.verifyPhoneNumber,
        data: { phoneNumber, otp, reason },
      });
      setVerificationStatus({
        ...verificationStatus,
        isPhoneNumberVerified: true,
      });
      return res;
    } catch (err) {
      console.error("Error: verifyPhoneNumber: ", err);
      toast.error(err?.response?.data?.message || "Some error encountered");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!user.isPhoneNumberVerified) {
        const phoneVerificationToken = data?.phoneVerificationToken?.trim();
        const phoneVerificationRes = await verifyPhoneNumber(
          phoneNumber,
          phoneVerificationToken
        );
        console.log(
          "🟠 First Case: phoneVerificationRes: ",
          phoneVerificationRes
        );
        if (phoneVerificationRes.data.success) {
          console.log("🟠🟢🟡🔶🔷 Phone Number is verified");
          toast.success("Phone Number is verified!");
          setUser(phoneVerificationRes.data.data);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("🔴 Error occurred during verification:", error);
    }
  };

  const handleResendOtpLink = async () => {
    console.log("handleResendOtpLink!");
    await sendOtpForPhoneNumVerification(phoneNumber);
  };

  const maskPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";
    const visibleDigits = 4; 
    const maskedPart = "X".repeat(phoneNumber.length - visibleDigits);
    const visiblePart = phoneNumber.slice(-visibleDigits); 
    return maskedPart + visiblePart;
  };
  

  return (
    <>
      <Toaster />
      {/* <div className="preloader">
        <img
          src="assets/images/btc-logo.svg"
          alt="preloader icon"
          style={{ height: "90px" }}
        />
      </div> */}
      {!user.isPhoneNumberVerified && (
        <section className="account padding-top--style2 padding-bottom-style2 sec-bg-color2">
          <div className="container">
            <div className="account__wrapper">
              <div className="account__inner">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="account__thumb">
                      <img
                        src="/assets/images/otp.jpg"
                        alt="account-image"
                        className="dark"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="account__content account__content--style2">
                      <div className="ugf-content pt340">
                        <form
                          action="account-category.html"
                          id="verificationForm"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          {!user.isPhoneNumberVerified && (
                            <div>
                              <div className="input-block">
                                <h4>Verify Phone Number</h4>
                              </div>
                              <p>
                                A verification code has been sent to your phone:{" "}
                                <strong>{user? maskPhoneNumber(user?.phoneNumber) : "XXXXXX7848"}</strong>.
                                <br />
                                Please enter the code below to verify your
                                account.
                              </p>
                              <div className="form-flex email-verification-form">
                                <input
                                  name="phoneVerificationToekn"
                                  {...register("phoneVerificationToken", {
                                    required: true,
                                  })}
                                  type="text"
                                  className="form-control"
                                  id="account-email"
                                  placeholder="Enter OTP"
                                  required=""
                                />
                              </div>
                              {/* <div className="form-flex email-verification-form">
                          <div className="form-group">
                            <input
                              type="text"
                              name="phoneNumVerificationOtpInput1"
                              {...register("phoneNumVerificationOtpInput1", {
                                required: true,
                              })}
                              placeholder="0"
                              className="form-control"
                              maxLength="1"
                              required=""
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              name="phoneNumVerificationOtpInput2"
                              {...register("phoneNumVerificationOtpInput2", {
                                required: true,
                              })}
                              placeholder="0"
                              className="form-control"
                              maxLength="1"
                              required=""
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              name="phoneNumVerificationOtpInput3"
                              {...register("phoneNumVerificationOtpInput3", {
                                required: true,
                              })}
                              placeholder="0"
                              className="form-control"
                              maxLength="1"
                              required=""
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              name="phoneNumVerificationOtpInput4"
                              {...register("phoneNumVerificationOtpInput4", {
                                required: true,
                              })}
                              placeholder="0"
                              className="form-control"
                              maxLength="1"
                              required=""
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              name="phoneNumVerificationOtpInput5"
                              {...register("phoneNumVerificationOtpInput5", {
                                required: true,
                              })}
                              placeholder="0"
                              className="form-control"
                              maxLength="1"
                              required=""
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              name="phoneNumVerificationOtpInput6"
                              {...register("phoneNumVerificationOtpInput6", {
                                required: true,
                              })}
                              placeholder="0"
                              className="form-control"
                              maxLength="1"
                              required=""
                            />
                          </div>
                        </div> */}
                              <p className="resend-code">
                                Don't get?
                                {/* <a href="#">Resend code</a> */}
                                <span onClick={handleResendOtpLink}>
                                  Resend code
                                </span>
                              </p>
                            </div>
                          )}
                          <button
                            type="submit"
                            className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
                          >
                            Submit
                          </button>
                        </form>
                        <div className="account__switch">
                          <p>
                            <a className="style2">
                              <i className="fa-solid fa-arrow-left-long"></i>
                              Back to Previous
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
