import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation } from "@tanstack/react-query";

import axios from "../../../lib/http-request";
import { API } from "../../../utils/config/api-end-points.config";
import { userDetailsSchema } from "../../../utils/validation/auth.validation";
import { useUserStore } from "../../../store/user.store";
import { ValidationError } from "../../UI/Errors";
import ButtonWithLoading from "../../UI/Button";

export const UserDetails = () => {
  const accessToken = useUserStore((state) => state.accessToken);
  const user = useUserStore((state) => state.user);

  let fetchUserDetails = async () => {
    try {
      console.log("🟣 UserDetails: fetchBankDetails API Called!!!!");
      const res = await axios.get(API.getUserDetails, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const { name, email, phoneNumber } = res?.data?.data?.user;
      console.log("🔷 res: ", res);
      const [firstName, lastName] = name.split(" ");
      setValue(
        "userDetails",
        {
          firstName,
          lastName,
          email,
          phoneNumber,
        },
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
      return { firstName, lastName, email, phoneNumber };
    } catch (error) {
      console.log("🔺 useQuery: error: ", error);
      throw new Error("Error fetching user details: " + error.message);
    }
  };

  let { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: "userDetails",
    queryFn: fetchUserDetails,
  });

  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      userDetails: {
        firstName: "",
        lastName: "",
      },
    },
    resolver: yupResolver(userDetailsSchema),
  });

  let saveUserDetails = async (data) => {
    try {
      const { firstName, lastName, email, phoneNumber } = data.userDetails;
      console.log("🔶 saveUserDetails: data: ", data);
      let userDetailsForUpdation = {
        name: `${firstName} ${lastName}`,
        email,
      };
      const res = await axios(API.saveUserDetails(user.id), {
        method: "PATCH",
        data: userDetailsForUpdation,
        params: {},
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      return res;
    } catch (error) {
      console.log("🔺 useQuery: error: ", error);
      throw new Error("Error saving user details: " + error.message);
    }
  };

  let { mutate, isPending: loading } = useMutation({
    mutationFn: (data) => saveUserDetails(data),
    onSuccess: (res) => {
      console.log("🔶 useMutation: res: UserDetails: ", res);
      toast.success("User Details saved successfully");
      refetch();
    },
    onError: (error) => {
      console.log("🔺 useMutation: error: UserDetails: ", error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    },
  });

  return (
    <>
      <div className="col-lg-6">
        <div className="account__content account__content--style1">
          <div className="account__header">
            <h4>General Details</h4>
          </div>
          <form
            className="account__form needs-validation"
            onSubmit={handleSubmit((data) => mutate(data))}
          >
            <div className="row g-4">
              <div className="col-12 col-md-6">
                <div>
                  <label htmlFor="first-name" className="form-label">
                    First name
                  </label>
                  <input
                    {...register("userDetails.firstName")}
                    className="form-control"
                    type="text"
                    id="first-name"
                    disabled={true}
                  />
                  <ValidationError err={errors?.userDetails?.firstName} />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <label htmlFor="last-name" className="form-label">
                    Last name
                  </label>
                  <input
                    {...register("userDetails.lastName")}
                    className="form-control"
                    type="text"
                    id="last-name"
                    disabled={true}
                  />
                  <ValidationError err={errors?.userDetails?.lastName} />
                </div>
              </div>
              <div className="col-12">
                <div className="position-relative">
                  <label htmlFor="account-email" className="form-label">
                    Email
                  </label>
                  <input
                    {...register("userDetails.email")}
                    type="email"
                    className="form-control"
                    id="account-email"
                    disabled={true}
                  />
                  <ValidationError err={errors?.userDetails?.email} />
                  <div className="tick-mark">
                    <i className="fa fa-check"></i>
                    <span> Verified </span>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="position-relative">
                  <label htmlFor="account-phone" className="form-label">
                    Phone
                  </label>
                  <input
                    {...register("userDetails.phoneNumber")}
                    type="text"
                    className="form-control"
                    id="account-phone"
                    disabled={true}
                  />
                  <ValidationError err={errors?.userDetails?.phoneNumber} />
                  <div className="tick-mark">
                    <i className="fa fa-check"></i>
                    <span> Verified </span>
                  </div>
                </div>
              </div>
            </div>
            <ButtonWithLoading
              type="submit"
              className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
              isLoading={loading}
              loaderColor="blue"
              text="Save Details"
              disabled={true}
            />
          </form>
        </div>
      </div>
    </>
  );
};
