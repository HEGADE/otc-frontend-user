import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const setAuthToken = useUserStore((state) => state.setAuthToken);
  const onSubmit = (data) => {
    const { email, password } = data;

    return axios.post(API.login, {
      email,
      password,
    });
  };

  const {
    mutate,
    isSuccess,
  } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: (data) => onSubmit(data),
    onSuccess: async (res) => {
      let data = res?.data?.data;
      console.log("🟢 data: ", data);
      await setUser(data?.user);
      await setAuthToken(data?.tokens);
      if (!data?.user?.isEmailVerified || !data?.user?.isPhoneNumberVerified) {
        console.log(
          "🟢 Cond: ",
          !data?.user?.isEmailVerified || !data?.user?.isPhoneNumberVerified
        );
        navigate("/two-step-auth");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      console.log(error, "error login");
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const GoogleSignInButton = () => {
    const handleSignIn = () => {
      window.location.href = 'http://localhost:3000/v1/auth/google/callback';
    };
  
    return (
      <div className="account__social">
        <a className="account__social-btn" onClick={handleSignIn}>
          <span>
            <img src="assets/images/google.svg" alt="google icon" />
          </span>
          Continue with Google
        </a>
      </div>
  
    );
  }

  const verifyGoogleToken = async (idToken) => {
    setLoading(true);
    console.log("hi");
    try {
      const res = await axios.post('http://localhost:3000/v1/auth/verify-google-token', {
        token: idToken,
      });
      let data = res?.data?.data;
      console.log("🟢 data: ", data);
      await setUser(data?.user);
      await setAuthToken(data?.tokens);
      console.log(!data?.user?.phoneNumber);
      if (!data?.user?.phoneNumber) {
        navigate("/phone");
      }
      else if (!data?.user?.isEmailVerified  ||  data?.user?.phoneNumber && !data?.user?.isPhoneNumberVerified) {
        // console.log(
        //   "🟢 Cond: ",
        //   !data?.user?.isEmailVerified || !data?.user?.isPhoneNumberVerified
        // );
        navigate("/two-step-auth");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error, "error login");
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const idToken = urlParams.get('idToken');
  console.log('ID Token:', idToken);

  if (idToken) {
    verifyGoogleToken(idToken);
  }
}, [window.location.search]);


  return (
    <>
      <Toaster />
      <div
        className="row align-items-center"
        style={{
          backgroundColor: "#eef3f9",
          border: "45px solid #eef3f9",
          borderRadius: "5px",
        }}
      >
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
                <div className="account__check-forgot">
                  <Link to="/forgot-password">Forgot Password?</Link>
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
            <div className="account__divider account__divider--style1">
              <span>or</span>
            </div>
            <GoogleSignInButton />
            <div className="account__switch">
              <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};