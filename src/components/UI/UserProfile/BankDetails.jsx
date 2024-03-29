import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation } from "@tanstack/react-query";

import axios from "../../../lib/http-request";
import { API } from "../../../utils/config/api-end-points.config";
import { bankDetailsSchema } from "../../../utils/validation/auth.validation";
import { useUserStore } from "../../../store/user.store";
import { ValidationError } from "../../UI/Errors";
import ButtonWithLoading from "../../UI/Button";

export const BankDetails = () => {
  const accessToken = useUserStore((state) => state.accessToken);

  let fetchBankDetails = async () => {
    try {
      console.log("🟢 BankDetails: fetchBankDetails API Called!!!!");
      const res = await axios.get(API.getBankDetails, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const { accountHolderName, bankName, accountNumber, branch, ifsCode } =
        res?.data?.data?.bankDetails;
      setValue(
        "bankDetails",
        {
          accountHolderName,
          bankName,
          accountNumber,
          branch,
          ifsCode,
        },
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );

      return { accountHolderName, bankName, accountNumber, branch, ifsCode };
    } catch (error) {
      console.log("🔺 useQuery: error: ", error);
      throw new Error("Error fetching bank details: " + error.message);
    }
  };

  let { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: "userBankDetails",
    queryFn: fetchBankDetails,
  });

  let {
    register,
    handleSubmit,
    formState: { defaultValues, errors },
    setValue,
  } = useForm({
    defaultValues: {
      bankDetails: {
        accountHolderName: "",
        bankName: "",
        accountNumber: "",
        branch: "",
        ifsCode: "",
      },
    },
    resolver: yupResolver(bankDetailsSchema),
  });

  let saveBankDetails = async (data) => {
    console.log("🔶 saveBankDetails: data: ", data);
    return await axios(API.saveBankDetails, {
      method: "POST",
      data: data.bankDetails,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  };

  let { mutate, isPending: loading } = useMutation({
    mutationFn: (data) => saveBankDetails(data),
    onSuccess: (res) => {
      console.log("🔶 useMutation: res: ", res);
      toast.success("Bank account saved successfully");
      refetch();
    },
    onError: (error) => {
      console.log("🔺 useMutation: error: ", error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    },
  });

  return (
    <>
      <Toaster />
      <div className="col-lg-6">
        <div className="account__content account__content--style1">
          <div className="account__header">
            <h4>Bank Details</h4>
          </div>
          <form
            className="account__form needs-validation"
            onSubmit={handleSubmit((data) => mutate(data))}
          >
            <div className="row g-4">
              <div className="col-12 col-md-6">
                <div>
                  <label htmlFor="first-name" className="form-label">
                    Account Holder Name
                  </label>
                  <input
                    {...register("bankDetails.accountHolderName")}
                    className="form-control"
                    type="text"
                    id="first-name"
                  />
                  <ValidationError
                    err={errors?.bankDetails?.accountHolderName}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <label htmlFor="account-bank-name" className="form-label">
                    Bank Name
                  </label>
                  <input
                    {...register("bankDetails.bankName")}
                    type="text"
                    className="form-control"
                    id="account-bank-name"
                  />
                  <ValidationError err={errors?.bankDetails?.bankName} />
                </div>
              </div>
              <div className="col-12">
                <div>
                  <label htmlFor="account-number" className="form-label">
                    Account Number
                  </label>
                  <input
                    {...register("bankDetails.accountNumber")}
                    className="form-control"
                    type="text"
                    id="account-number"
                  />
                  <ValidationError err={errors?.bankDetails?.accountNumber} />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div>
                  <label htmlFor="account-branch" className="form-label">
                    Branch
                  </label>
                  <input
                    {...register("bankDetails.branch")}
                    type="text"
                    className="form-control"
                    id="account-branch"
                  />
                  <ValidationError err={errors?.bankDetails?.branch} />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <label htmlFor="account-ifsc" className="form-label">
                    IFSC
                  </label>
                  <input
                    {...register("bankDetails.ifsCode")}
                    type="text"
                    className="form-control"
                    id="account-ifsc"
                  />
                  <ValidationError err={errors?.bankDetails?.ifsCode} />
                </div>
              </div>
            </div>
            <ButtonWithLoading
              type="submit"
              className="trk-btn trk-btn--border trk-btn--primary d-block mt-4"
              isLoading={loading}
              loaderColor="blue"
              text="Save Details"
            />
          </form>
        </div>
      </div>
    </>
  );
};
