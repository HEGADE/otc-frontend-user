/* eslint-disable react/no-unescaped-entities */

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import axios from "../../lib/http-request";
import { API } from "../../utils/config/api-end-points.config";
import { ValidationError } from "../UI/Errors";
import ButtonWithLoading from "../UI/Button";
import { useUserStore } from "../../store/user.store";
import { loginSchema } from "../../utils/validation/auth.validation";

const mutationKey = ["login"];

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const setUser = useUserStore((state) => state.setUser);
  const setAuthToken = useUserStore((state) => state.setAuthToken);
  const onSubmit = (data) => {
    const { email, password } = data;

    return axios.post(API.login, {
      email,
      password,
    });
  };

  const { mutate, isPending: loading } = useMutation({
    mutationKey,
    mutationFn: (data) => {
      return onSubmit(data);
    },
    onSuccess: (data) => {
      // navigate to dash board
      console.log(data.data.user, "data");
      setUser(data?.data?.user);
      setAuthToken(data?.data?.tokens);
      toast.success("Logged in");
      navigate("two-step-auth");
    },
    onError: (error) => {
      console.log(error, "error login");
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  return (
    <>
      <Toaster />
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
              <h2>Welcome back!</h2>
              <p>
                Hey there! Ready to log in? Just enter your username and
                password below and you'll be back in action in no time. Let's
                go!
              </p>
            </div>
            <form
              className="account__form needs-validation"
              onSubmit={handleSubmit((data) => mutate(data))}
            >
              <div className="row g-4">
                <div className="col-12">
                  <div>
                    <label htmlFor="account-email" className="form-label">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      name="email"
                      type="email"
                      className="form-control"
                      id="account-email"
                      placeholder="Enter your email"
                    />
                    <ValidationError err={errors.email} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-pass">
                    <label htmlFor="account-pass" className="form-label">
                      Password
                    </label>
                    <input
                      {...register("password")}
                      name="password"
                      type="password"
                      className="form-control showhide-pass"
                      id="account-pass"
                      placeholder="Password"
                      required=""
                    />
                    <ValidationError err={errors.password} />
                  </div>
                </div>
              </div>
              <div className="account__check">
                <div className="account__check-remember">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    defaultValue=""
                    id="terms-check"
                  />
                  <label htmlFor="terms-check" className="form-check-label">
                    Remember me
                  </label>
                </div>
                <div className="account__check-forgot">
                  <a href="forget-password.html">Forgot Password?</a>
                </div>
              </div>
              <ButtonWithLoading
                type="submit"
                className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
                isLoading={loading}
                loaderColor="blue"
                text="Login"
              />
            </form>
            <div className="account__switch">
              <p>
                Don't have an account? <a href="signup.html">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
