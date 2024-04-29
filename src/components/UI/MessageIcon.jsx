import React from "react";
import img from "/assets/images/chat.png";
import { useNavigate } from "react-router-dom";

function MessageIcon() {
  const navigate = useNavigate();
  return (
    <div>
      <img
        onClick={() => navigate("/messages")}
        style={{
          position: "fixed",
          width: "55px",
          cursor: "pointer",
          bottom: "20px",
          right: "20px",
        }}
        src={img}
        alt=""
      />
    </div>
  );
}

export default MessageIcon;
