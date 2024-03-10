import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "../../lib/http-request";
import { API } from "../../utils/config/api-end-points.config";
import { ValidationError } from "../UI/Errors";
import ButtonWithLoading from "../UI/Button";
import toast, { Toaster } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validation/auth.validation";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
    } = data;

    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    const finalName = `${firstName} ${lastName}`;
    setLoading(true);
    try {
      const res = await axios.post(API.register, {
        name: finalName,
        email,
        password,
        phoneNumber,
      });
      console.log("res: ", res);
      if (res?.data?.success) {
        // navigate("/two-step-auth");
        navigate("/two-step-auth", { state: { phoneNumber } });
        // navigate("/login");
      }
    } catch (err) {
      let message = err?.response?.data?.msg || err?.response?.data?.message;
      toast.error(message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
              <h2>Create Your Account</h2>
              <p className="mb-0">
                Hey there! Ready to join the party? We just need a few details
                from you to get started. Let's do this!
              </p>
            </div>
            <div className="account__social">
              <a className="account__social-btn" href="/signup">
                <span>
                  <img src="assets/images/google.svg" alt="google icon" />
                </span>
                Continue with google
              </a>
            </div>
            <div className="account__divider account__divider--style1">
              <span>or</span>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="account__form needs-validation"
            >
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div>
                    <label htmlFor="first-name" className="form-label">
                      First name
                    </label>
                    <input
                      name="firstName"
                      {...register("firstName", { required: true })}
                      className="form-control"
                      type="text"
                      id="first-name"
                      placeholder="Ex. Jhon"
                    />
                    <ValidationError err={errors.firstName} />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div>
                    <label htmlFor="last-name" className="form-label">
                      Last name
                    </label>
                    <input
                      name="lastName"
                      {...register("lastName", { required: true })}
                      className="form-control"
                      type="text"
                      id="last-name"
                      placeholder="Ex. Doe"
                    />
                    <ValidationError err={errors.lastName} />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div>
                    <label htmlFor="account-email" className="form-label">
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
                <div className="col-12 col-md-6">
                  <div>
                    <label htmlFor="account-phone" className="form-label">
                      Phone
                    </label>
                    <input
                      name="phoneNumber"
                      {...register("phoneNumber", { required: true })}
                      type="text"
                      className="form-control"
                      id="account-phone"
                      placeholder="Enter your Phone number"
                      required=""
                    />
                    <ValidationError err={errors.phoneNumber} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-pass">
                    <label htmlFor="account-pass" className="form-label">
                      Password
                    </label>
                    <input
                      name="password"
                      {...register("password", { required: true })}
                      type="password"
                      className="form-control showhide-pass"
                      id="account-pass"
                      placeholder="Password"
                      required=""
                    />
                    <ValidationError err={errors.password} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-pass">
                    <label htmlFor="account-cpass" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      name="confirmPassword"
                      {...register("confirmPassword", { required: true })}
                      type="password"
                      className="form-control showhide-pass"
                      id="account-cpass"
                      placeholder="Re-type password"
                      required=""
                    />
                    <ValidationError err={errors.confirmPassword} />
                  </div>
                </div>
              </div>
              <ButtonWithLoading
                type="submit"
                className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
                isLoading={loading}
                loaderColor="blue"
                text="Register"
              />
            </form>
            <div className="account__switch">
              {/* <p>
                Don’t have an account yet? <a href="login.html">Login</a>
              </p> */}
              <p>
                Don’t have an account yet? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Register };
