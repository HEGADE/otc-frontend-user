import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import axios from "../../lib/http-request";
import { API } from "../../utils/config/api-end-points.config";
import { forgotPasswordSchema } from "../../utils/validation/auth.validation";
import { ValidationError } from "../UI/Errors";

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  let resetPassword = async (data) => {
    const { email } = data;
    return await axios(API.forgotPassword, {
      method: "POST",
      data: { email },
    });
  };

  const { mutate, isPending: loading } = useMutation({
    mutationFn: (data) => resetPassword(data),
    onSuccess: (res) => {
      console.log("🔶 useMutation: res: ", res);
      toast.success(res?.data?.msg);
    },
    onError: (error) => {
      console.log("🔺 data: error: ", error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    },
  });

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
                      src="/assets/images/register.png"
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
                      onSubmit={handleSubmit((data) => mutate(data))}
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
                              {...register("email")}
                              type="email"
                              className="form-control"
                              id="account-email"
                              placeholder="Enter your email"
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
