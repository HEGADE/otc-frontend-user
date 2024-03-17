import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "../../lib/http-request";
import { API } from "../../utils/config/api-end-points.config";
import { ValidationError } from "../UI/Errors";
import { resetPasswordSchema } from "../../utils/validation/auth.validation";
import ButtonWithLoading from "../UI/Button";

const mutationKey = ["resetPassword"];

export const ResetPassword = () => {
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    const { password } = data;
    return await axios({
      method: "POST",
      url: API.resetPassword,
      data: { password },
      params: {
        token,
      },
    });
  };

  const { mutate, isPending: loading } = useMutation({
    mutationKey,
    mutationFn: (data) => {
      return onSubmit(data);
    },
    onSuccess: (data) => {
      navigate("/login");
    },
    onError: (error) => {
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
              <h2>Reset Password</h2>
            </div>
            <form
              className="account__form needs-validation"
              onSubmit={handleSubmit((data) => mutate(data))}
            >
              <div className="row g-4">
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
                      {...register("confirmPassword")}
                      type="password"
                      className="form-control showhide-pass"
                      id="account-cpass"
                      placeholder="Re-type password"
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
                text="Reset"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
