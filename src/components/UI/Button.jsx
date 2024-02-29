import { ThreeDots } from "react-loader-spinner";

const ButtonWithLoading = ({
  ingBtn = false,
  isLoading,
  text,
  loaderColor = "white",
  disabled = false,
  marginLft = 0,
  ...rest
}) => {
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginLeft: marginLft,
          }}
        >
          {!ingBtn ? (
            <ThreeDots
              style={{ margin: "10px" }}
              color={loaderColor}
              width={"50px"}
              height={"50px"}
            />
          ) : (
            <button {...rest} style={{ cursor: "not-allowed" }} disabled>
              {text}ing...
            </button>
          )}
        </div>
      ) : (
        <button
          {...rest}
          disabled={disabled}
          style={{
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default ButtonWithLoading;
