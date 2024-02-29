/* eslint-disable react/prop-types */
export const ValidationError = ({ err }) => {
  if (!err?.message) return null;
  return (
    <p
      style={{
        color: "red",
        marginTop: "2px",
        marginLeft: "5px",
      }}
    >
      {err?.message}
    </p>
  );
};
