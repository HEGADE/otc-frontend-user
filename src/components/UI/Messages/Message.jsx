import React from "react";
import { useUserStore } from "../../../store/user.store";

function Message({ messages }) {
  const user = useUserStore((state) => state.user);
  const fromMe = messages.from === user.id;

  return (
    <div className={`d-flex gap-2 mb-4 ${fromMe ? "flex-row-reverse" : ""}`}>
      <div
        className="rounded-circle d-flex justify-content-center align-items-center"
        style={{
          width: "46px",
          height: "46px",
          backgroundColor: fromMe ? 'burlywood' : 'yellowgreen',
          color: "white",
          fontSize: '13px'
        }}
      >
        {fromMe ? 'Y' : 'A'}
      </div>
      <div className="d-flex flex-column gap-1 w-50">
        <div
          className={`text-white rounded-5 py-2 px-4 ${
            fromMe ? "bg-success" : "bg-primary"
          }`}
          style={{ wordWrap: 'break-word' }} 
        >
          {messages.message}
        </div>
        {/* <div className="text-muted small d-flex gap-1 align-items-center">
              {formattedTime}
            </div> */}
      </div>
    </div>
  );
}

export default Message;
