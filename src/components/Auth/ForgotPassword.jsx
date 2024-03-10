import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

import axios from "../../lib/http-request";
import { API } from "../../utils/config/api-end-points.config";
import { forgotPasswordSchema } from "../../utils/validation/auth.validation";
import { ValidationError } from "../UI/Errors";

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  // let resetPassword = async (email) => {
  //   try {
  //     const res = await axios(API.forgotPassword, {
  //       method: "POST",
  //       data: { email },
  //     });
  //     return res;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // const mutation = useMutation({
  //   mutationFn: resetPassword,
  //   onSuccess: (data) => {
  //     console.log("🔶 useMutation: data: ", data);
  //     toast.success(data?.data?.msg); // Access data directly for success message
  //   },
  //   onError: (error) => {
  //     console.log("🔶 data: error: ", error);
  //     toast.error(
  //       error?.response?.data?.message ||
  //         "Something went wrong. Please try again later."
  //     );
  //   },
  // });

  // const onSubmit = async (data) => {
  //   const { email } = data;
  //   try {
  //     mutation.mutate(email);
  //   } catch (error) {
  //     // Handle errors here if needed
  //   }
  // };

  const onSubmit = async (data) => {
    console.log("🔷 data: ", data);

    const { email } = data;

    setLoading(true);
    try {
      const res = await axios.post(API.forgotPassword, {
        email,
      });
      console.log("🔶 res: ", res);
      if (res?.data?.success) {
        toast.success(res.data?.msg);
      }
    } catch (err) {
      console.log("🔺 err: ", err);
      let message = err?.response?.data?.msg || err?.response?.data?.message;
      toast.error(message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <title>Forget Password </title>
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
                    <div className="account__header">
                      <h2>Reset password</h2>
                      <p className="mb-0">
                        Hey there! Forgot your password? No worries! Just click
                        on &quot;Reset password &quot;and follow the steps. Easy
                        as pie!
                      </p>
                    </div>
                    <form
                      className="account__form needs-validation"
                      //   onSubmit={handleSubmit((data) => mutate(data))}
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="row g-4">
                        <div className="col-12">
                          <div>
                            <label
                              htmlFor="account-email"
                              className="form-label"
                            >
                              Email
                            </label>
                            <input
                              name="email"
                              {...register("email", { required: true })}
                              type="email"
                              className="form-control"
                              id="account-email"
                              placeholder="Enter your email"
                              required=""
                            />
                            <ValidationError err={errors.email} />
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
                      >
                        Reset password
                      </button>
                    </form>
                    <div className="account__switch">
                      <p>
                        <Link to="/login">
                          <i className="fa-solid fa-arrow-left-long"></i>
                          Back to <span>Login</span>
                        </Link>
                      </p>
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
