import { useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { API } from "../../utils/config/api-end-points.config";
import axios from "../../lib/http-request";
import { verifyEmailAndPhoneNumberSchema } from "../../utils/validation/auth.validation";
import { useUserStore } from "../../store/user.store";

export const TwoStepVerification = () => {
  const navigate = useNavigate();

  const accessToken = useUserStore((state) => state.accessToken);
  const user = useUserStore((state) => state.user);

  const setUser = useUserStore((state) => state.setUser);

  // let { state } = useLocation();

  let state = {
    email: user.email,
    phoneNumber: user.phoneNumber,
    userId: user.id,
  };

  const { email, phoneNumber, userId } = state;

  // Define a base schema
  const baseSchema = verifyEmailAndPhoneNumberSchema;

  // Modify the schema based on conditions
  const modifySchema = (schema, isEmailVerified, isPhoneVerified) => {
    if (isEmailVerified) {
      schema = schema.omit("emailVerificationToken");
    }
    if (isPhoneVerified) {
      schema = schema.omit("phoneVerificationToken");
    }
    return schema;
  };

  const [verificationStatus, setVerificationStatus] = useState({
    isEmailVerified: user.isEmailVerified,
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
      modifySchema(
        baseSchema,
        verificationStatus.isEmailVerified,
        verificationStatus.isPhoneVerified
      )
    ),
  });

  const fetchUserDetails = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: API.getUserDetails,
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        data: { email },
      });
      console.log("🟢 fetchUserDetails: res: ", res);
      if (res.status == 200) {
        setUser(res?.data?.data?.user);
      }
    } catch (err) {
      console.error("Error: fetchUserDetails: ", err);
    }
  };

  const sendTokenForEmailVerification = async (email) => {
    try {
      const res = await axios({
        method: "POST",
        url: API.sendTokenForEmailVerification,
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        data: { email },
      });
      console.log("sendTokenForEmailVerification: res: ", res);
      if (res.status == 200) {
        toast.success(res?.data?.msg);
      }
    } catch (err) {
      console.error("Error: ", err);
      toast.error(err?.response?.data?.message || "Some error encountered");
    }
  };

  const sendOtpForPhoneNumVerification = async (
    phoneNumber,
    reason = "register"
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
    } catch (err) {
      console.error("Error: ", err);
      toast.error(err?.response?.data?.message || "Some error encountered");
    }
  };

  const verifyPhoneNumber = async (phoneNumber, otp) => {
    try {
      const res = await axios({
        method: "POST",
        url: API.verifyPhoneNumber,
        data: { phoneNumber, otp },
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

  const verifyEmail = async (token) => {
    try {
      const res = await axios({
        method: "POST",
        url: API.verifyEmail,
        params: {
          token,
        },
      });
      setVerificationStatus({
        ...verificationStatus,
        isEmailVerified: true,
      });
      return res;
    } catch (err) {
      console.error("Error: verifyEmail: ", err);
      toast.error(err?.response?.data?.message || "Some error encountered");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (user.isEmailVerified && data.isPhoneNumberVerified) {
        const emailVerificationToken = data?.emailVerificationToken?.trim();
        const phoneVerificationToken = data?.phoneVerificationToken?.trim();
        const [emailVerificationRes, phoneVerificationRes] = await Promise.all([
          verifyEmail(emailVerificationToken),
          verifyPhoneNumber(phoneNumber, phoneVerificationToken),
        ]);
        console.log(
          "🟠 First Case: emailVerificationRes: ",
          emailVerificationRes
        );
        console.log(
          "🔵 First Case: phoneVerificationRes: ",
          phoneVerificationRes
        );
        await fetchUserDetails();
        if (
          emailVerificationRes.data.success &&
          phoneVerificationRes.data.success
        ) {
          console.log("🟠🟢🟡🔶🔷 Both Email and Phone Number are verified");
          toast.success("Email and Phone Number are verified");
          navigate("/login");
        } else if (emailVerificationRes.data.success) {
          console.log("🟠🟢🟡🔶🔷 Email is verified");
          toast.success("Email is verified");
        } else if (phoneVerificationRes.data.success) {
          console.log("🟠🟢🟡🔶🔷 Phone Number is verified");
          toast.success("Phone Number is verified");
        }
      } else if (!user.isEmailVerified) {
        const emailVerificationToken = data?.emailVerificationToken?.trim();
        const emailVerificationRes = await verifyEmail(emailVerificationToken);
        console.log(
          "🟠 Second Case: emailVerificationRes: ",
          emailVerificationRes
        );
        await fetchUserDetails();
        if (emailVerificationRes.data.success) {
          console.log("🟠🟢🟡🔶🔷 Email is verified");
          toast.success("Email is verified!");
          navigate("/login");
        }
      } else if (!user.isPhoneNumberVerified) {
        const phoneVerificationToken = data?.phoneVerificationToken?.trim();
        const phoneVerificationRes = await verifyPhoneNumber(
          phoneNumber,
          phoneVerificationToken
        );
        console.log(
          "🟠 Third Case: phoneVerificationRes: ",
          phoneVerificationRes
        );
        await fetchUserDetails();
        if (phoneVerificationRes.data.success) {
          console.log("🟠🟢🟡🔶🔷 Phone Number is verified");
          toast.success("Phone Number is verified!");
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("🔴 Error occurred during verification:", error);
    }
  };

  const handleResendEmailVerificationLink = async () => {
    console.log("handleResendEmailVerificationLink!");
    await sendTokenForEmailVerification(email);
  };

  const handleResendOtpLink = async () => {
    console.log("handleResendOtpLink!");
    await sendOtpForPhoneNumVerification(phoneNumber);
  };

  if (
    verificationStatus.isEmailVerified &&
    verificationStatus.isPhoneNumberVerified
  ) {
    return navigate("/login");
  }

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
      {(!user.isEmailVerified || !user.isPhoneNumberVerified) && (
        <section className="account padding-top--style2 padding-bottom-style2 sec-bg-color2">
          <div className="container">
            <div className="account__wrapper">
              <div className="account__inner">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="account__thumb">
                      <img
                        src="assets/images/register.png"
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
                          {!user.isEmailVerified && (
                            <div>
                              <div className="input-block">
                                <h4>Verify Email Address</h4>
                              </div>
                              <p>
                                Please check your Email{" "}
                                <strong>mail@example.com</strong> <br /> and put
                                the verification code here
                              </p>
                              <div className="form-group">
                                <input
                                  name="emailVerificationToken"
                                  {...register("emailVerificationToken", {
                                    required: true,
                                  })}
                                  type="text"
                                  className="form-control"
                                  id="account-email"
                                  placeholder="Enter email verification code"
                                  required=""
                                />
                              </div>
                              <p className="resend-code">
                                Don't get?
                                {/* <a href="#">Resend code</a> */}
                                <span
                                  onClick={handleResendEmailVerificationLink}
                                >
                                  Resend code
                                </span>
                              </p>
                            </div>
                          )}
                          {!user.isPhoneNumberVerified && (
                            <div>
                              <div className="input-block">
                                <h4>Verify Phone Number</h4>
                              </div>
                              <p>
                                Please check your Phone{" "}
                                <strong>XXXXXX7848</strong> <br /> and put the
                                verification code here
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
                                  placeholder="Enter otp"
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
                            <a className="style2" href="signup.html">
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
