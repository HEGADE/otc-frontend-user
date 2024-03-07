import { useQuery, useMutation } from "@tanstack/react-query";
import QRCode from "react-qr-code";

import { API } from "../../utils/config/api-end-points.config";
import { useDataApi } from "../../hooks/useDataApi";
import { QUERYKEY } from "../../utils/config/query-keys.config";
import { Container } from "../../components/UI/Containers";
const TwoStepVerification = () => {
  const { post } = useDataApi();

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERYKEY.twoStepAuthQrCodeGen],
    queryFn: () => {
      return post(API.generateTwoStepCodeQr);
    },
  });

  if (isLoading) return <h1>Loading</h1>;
  return (
    <>
      <Container.Auth>
        <QRCode value={data?.data?.data} />
      </Container.Auth>
    </>
  );
};

export { TwoStepVerification };
