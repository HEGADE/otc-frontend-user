import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import { API } from "../../utils/config/api-end-points.config";
import { useDataApi } from "../../hooks/useDataApi";
import { QUERYKEY } from "../../utils/config/query-keys.config";
import { Container } from "../../components/UI/Containers";
import { verifyEmailAndPhoneNumberSchema } from "../../utils/validation/auth.validation";

const TwoStepVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState("");

  const { post } = useDataApi();

  // const { data, isLoading, error } = useQuery({
  //   queryKey: [QUERYKEY.twoStepAuthQrCodeGen],
  //   queryFn: () => {
  //     return post(API.generateTwoStepCodeQr);
  //   },
  // });

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
    resolver: yupResolver(verifyEmailAndPhoneNumberSchema),
  });

  // const {
  //   register,
  //   handleSubmit,
  //   setError,
  //   formState: { errors },
  // } = useForm();

  const verifyPhoneNumber = async (phoneNumber) => {
    const response = await axios(API.verifyPhoneNumber, {
      method: "POST",
      body: JSON.stringify({ phoneNumber }),
    });
    return await response.json();

    // Dummy response for illustration
    return { status: "success" };
  };

  const verifyEmail = async (email) => {
    const response = await axios(API.verifyEmail, {
      method: "POST",
      body: JSON.stringify({ email }),
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    });
    return await response.json();

    // Dummy response for illustration
    return { status: "error" };
  };

  const onSubmit = async (data) => {
    // e.preventDefault();

    console.log("🔷 onSubmit: data: ", data);

    try {
      const phoneVerificationResponse = await verifyPhoneNumber(phoneNumber);
      const emailVerificationResponse = await verifyEmail(email);

      if (
        phoneVerificationResponse.status === "success" &&
        emailVerificationResponse.status === "success"
      ) {
        setVerificationStatus("Both phone number and email are verified!");
      } else if (phoneVerificationResponse.status === "success") {
        setVerificationStatus(
          "Phone number is verified, but email verification failed."
        );
      } else if (emailVerificationResponse.status === "success") {
        setVerificationStatus(
          "Email is verified, but phone number verification failed."
        );
      } else {
        setVerificationStatus(
          "Both phone number and email verification failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error occurred during verification:", error);
      setVerificationStatus(
        "Error occurred during verification. Please try again."
      );
    }
  };

  return (
    <>
      {/* <div className="preloader">
        <img
          src="assets/images/btc-logo.svg"
          alt="preloader icon"
          style={{ height: "90px" }}
        />
      </div> */}
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
                      <div className="input-block">
                        <h4>Verify Email Address</h4>
                      </div>
                      <p>
                        Please check you Email <strong>mail@example.com</strong>{" "}
                        <br /> and put the verification code here
                      </p>
                      <form
                        action="account-category.html"
                        // className="form-flex email-verification-form"
                        id="commentForm"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="form-group">
                          {/* <input
                            type="text"
                            name="input1"
                            // placeholder="0"
                            className="form-control"
                            // maxLength="1"
                            required=""
                          /> */}
                          <input
                            name="emailVerificationToken"
                            {...register("emailVerificationToken", {
                              required: true,
                            })}
                            type="text"
                            className="form-control"
                            id="account-email"
                            required=""
                          />
                          {/* <ValidationError err={errors.email} /> */}
                        </div>
                        {/* <div className="form-group">
                          <input
                            type="text"
                            name="input2"
                            placeholder="0"
                            className="form-control"
                            maxLength="1"
                            required=""
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name="input3"
                            placeholder="0"
                            className="form-control"
                            maxLength="1"
                            required=""
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name="input4"
                            placeholder="0"
                            className="form-control"
                            maxLength="1"
                            required=""
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name="input5"
                            placeholder="0"
                            className="form-control"
                            maxLength="1"
                            required=""
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name="input6"
                            placeholder="0"
                            className="form-control"
                            maxLength="1"
                            required=""
                          />
                        </div> */}
                        {/* </form> */}
                        <p className="resend-code">
                          Don't get? <a href="#">Resend code</a>
                        </p>
                        <br />

                        <div className="input-block">
                          <h4>Verify Phone Number</h4>
                        </div>
                        <p>
                          Please check you Phone <strong>XXXXXX7848</strong>{" "}
                          <br /> and put the verification code here
                        </p>
                        {/* <form
                        action="account-category.html"
                        className="form-flex email-verification-form"
                        id="commentForm"
                        // noValidate="noValidate"
                      > */}
                        <div className="form-group">
                          <input
                            type="text"
                            name="phoneNumVerificationOtpInput1"
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
                            placeholder="0"
                            className="form-control"
                            maxLength="1"
                            required=""
                          />
                        </div>
                      </form>
                      <p className="resend-code">
                        Don't get? <a href="#">Resend code</a>
                      </p>
                      <button
                        type="submit"
                        className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
                      >
                        {/* <a href="login.html"> Submit</a> */}
                        Submit
                      </button>
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
    </>
  );
};

export { TwoStepVerification };
