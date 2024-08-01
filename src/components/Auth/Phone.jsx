import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "../../lib/http-request";
import { API } from "../../utils/config/api-end-points.config";
import { ValidationError } from "../UI/Errors";
import ButtonWithLoading from "../UI/Button";
import toast, { Toaster } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserStore } from "../../store/user.store";
import { registerSchema } from "../../utils/validation/auth.validation";


const Phone = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const setAuthToken = useUserStore((state) => state.setAuthToken);
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);
  const accessToken = useUserStore((state) => state.accessToken);
  const {
    register,
    handleSubmit,
  } = useForm({
    
  });

  console.log(accessToken);
  const onSubmit = async (data) => {
    const {
      phoneNumber,
    } = data;
    setLoading(true);
    try {
      const res = await axios.patch(`users/${user.id}`, { phoneNumber }, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      console.log("res: ", res);
      let data = res?.data?.data;
      console.log("🟢 data: ", data);
      await setUser(data?.user);
      await setAuthToken(data?.tokens);
      console.log(data);
      if (res?.data?.success) {
        navigate("/login");
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
              src="/assets/images/signup.jpg"
              alt="account-image"
              className="dark"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="account__content account__content--style2">
            <div className="account__header">
              <h2>Fill your details</h2>
              <p className="mb-0">
                -------------------------
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="account__form needs-validation">
  <div className="row g-3">
    <div className="col-12">
      <div>
        <label htmlFor="first-name" className="form-label">
          Name
        </label>
        <input
          name="firstName"      
          className="form-control"
          type="text"
          id="first-name"
          placeholder="Ex. Jhon"
          value={user.name}
          disabled
        />
      </div>
    </div>
    <div className="col-12">
      <div>
        <label htmlFor="account-email" className="form-label">
          Email
        </label>
        <input
          name="email"
         
          type="email"
          className="form-control"
          id="account-email"
          placeholder="Enter your email"
          value={user.email}
          disabled
        />
      </div>
    </div>
    <div className="col-12">
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
      </div>
    </div>
  </div>
  <ButtonWithLoading
    type="submit"
    className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
    isLoading={loading}
    loaderColor="blue"
    text="Submit"
  />
</form>


          </div>
        </div>
      </div>
    </>
  );
};

export { Phone };