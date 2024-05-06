import { SignIn } from "../components/Auth/SignIn";
import { Container } from "../components/UI/Containers";

const Login = () => {

  return (
    <>
      <Container.Auth>
        <SignIn />
      </Container.Auth>
    </>
  );
};

export default Login;
