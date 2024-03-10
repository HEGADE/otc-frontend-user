import { ForgotPassword as ForgotPasswordComponent } from "../components/Auth/ForgotPassword";
import { Container } from "../components/UI/Containers";

const ForgotPassword = () => {
  return (
    <>
      <Container.Auth>
        <ForgotPasswordComponent />
      </Container.Auth>
    </>
  );
};

export default ForgotPassword;
