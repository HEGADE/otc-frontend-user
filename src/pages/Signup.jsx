/* eslint-disable react/no-unescaped-entities */

import { Register } from "../components/Auth/Register";
import { Container } from "../components/UI/Containers";

export const Signup = () => {
  return (
    <>
      <Container.Auth>
        <Register />
      </Container.Auth>
    </>
  );
};
