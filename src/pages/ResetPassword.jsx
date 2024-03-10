import { ResetPassword as ResetPasswordComponent } from "../components/Auth/ResetPassword";
import { Container } from "../components/UI/Containers";

const ResetPassword = () => {
  return (
    <>
      <Container.Auth>
        <ResetPasswordComponent />
      </Container.Auth>
    </>
  );
};

export default ResetPassword;
