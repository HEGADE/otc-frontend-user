/* eslint-disable react/prop-types */
const Container = () => {
  return <div>Containers</div>;
};

const Auth = ({ children }) => {
  return (
    <>
      <section className="account padding-top--style2 padding-bottom-style2 sec-bg-color2">
        <div className="container">
          <div className="account__wrapper">
            <div className="account__inner">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
};

Container.Auth = Auth;

export { Container };
