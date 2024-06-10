import React, { useState } from "react";
import { useUserStore } from "../../../store/user.store";
import axios from "../../../lib/http-request/index";
import { useConversation } from "../../../store/message.store";
import { API } from "../../../utils/config/api-end-points.config";

function MessageInput() {
  const [message, setMessage] = useState("");
  const accessToken = useUserStore((state) => state.accessToken);
  const user = useUserStore((state) => state.user);
  const { setMessages, messages } = useConversation();

  async function handleSubmit(event) {
    event.preventDefault();
    if (message === "") {
      return;
    }
    try {
      const response = await axios.post(
        API.createUserMessages(user?.id),
        { message },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      const result = response?.data?.data?.messages;
      setMessages([...messages, result]);
    } catch (err) {
      console.log(err);
    } finally {
      setMessage("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-2 my-2">
      <div className="d-flex align-items-center gap-1">
        <input
          type="text"
          value={message}
          className="form-control border rounded-lg p-2.5 bg-white text-dark"
          placeholder="Send a message"
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit" className="btn btn-primary">
          <i style={{ fontSize: "22px" }} className="fa">
            &#xf1d9;
          </i>
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
