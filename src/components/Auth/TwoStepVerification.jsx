import { useQuery, useMutation } from "@tanstack/react-query";
import QRCode from "react-qr-code";

import axios from "../../lib/http-request";
import { API } from "../../utils/config/api-end-points.config";
import { useUserStore } from "../../store/user.store";
const TwoStepVerification = () => {
  const accessToken = useUserStore((state) => state.accessToken);

  console.log(accessToken, "accessToken");
  const { data, isLoading, error } = useQuery({
    queryKey: ["two-step"],
    queryFn: () => {
      return axios.post(
        API.generateTwoStepCodeQr,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    },
  });

  console.log(data, "data qr", error);

  if(isLoading) return <h1>Loading</h1>
  return (
    <>
      <h1>
        <QRCode value={data?.data?.data} />
      </h1>
    </>
  );
};

export { TwoStepVerification };
