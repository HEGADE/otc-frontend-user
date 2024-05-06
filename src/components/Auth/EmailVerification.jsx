import { useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { API } from "../../utils/config/api-end-points.config";
import axios from "../../lib/http-request";
import { verifyEmailSchema } from "../../utils/validation/auth.validation";
import { useUserStore } from "../../store/user.store";

export const EmailVerification = () => {
  const navigate = useNavigate();

  const accessToken = useUserStore((state) => state.accessToken);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // let { state } = useLocation();

  let state = {
    email: user.email,
    userId: user.id,
  };

  const { email, userId } = state;

  // Define a base schema
  const baseSchema = verifyEmailSchema;

  // Modify the schema based on conditions
  const modifySchema = (schema, isEmailVerified) => {
    if (isEmailVerified) {
      schema = schema.omit("emailVerificationToken");
    }
    return schema;
  };

  const [verificationStatus, setVerificationStatus] = useState({
    isEmailVerified: user.isEmailVerified,
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
      modifySchema(baseSchema, verificationStatus.isEmailVerified)
    ),
  });

  const sendTokenForEmailVerification = async (email) => {
    try {
      const res = await axios({
        method: "POST",
        url: API.sendTokenForEmailVerification,
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        data: { user },
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

  const verifyEmail = async (token) => {
    try {
      const res = await axios({
        method: "POST",
        url: API.verifyEmail,
        params: {
          token,
        },
      });
      return res;
    } catch (err) {
      console.error("Error: verifyEmail: ", err);
      toast.error(err?.response?.data?.message || "Some error encountered");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!user.isEmailVerified) {
        const emailVerificationToken = data?.emailVerificationToken?.trim();
        const emailVerificationRes = await verifyEmail(emailVerificationToken);

        console.log(
          "🟠 First Case: emailVerificationRes: ",
          emailVerificationRes
        );

        if (emailVerificationRes?.data?.success) {
          console.log("🟠🟢🟡🔶🔷 Email verified");
          toast.success("Email verified");
          setUser(emailVerificationRes?.data?.data);
          setVerificationStatus({
            isEmailVerified: true,
          });
          if (!user?.isPhoneNumberVerified) {
            navigate("/verify");
          } else {
            navigate("/login");
          }
        }
      }
    } catch (error) {
      console.error("🔴 Error occurred during verification:", error);
    }
  };

  const handleResendEmailVerificationLink = async () => {
    console.log("handleResendEmailVerificationLink!");
    await sendTokenForEmailVerification(user);
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
      {!user.isEmailVerified && (
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
