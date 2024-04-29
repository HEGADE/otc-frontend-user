import React, { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../store/user.store";
import axios from "axios";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useConversation } from "../../../store/message.store";

function Conversation() {
  const [error, setError] = useState();
  const { messages, setMessages } = useConversation();
  const accessToken = useUserStore((state) => state.accessToken);
  const user = useUserStore((state) => state.user);
  const lastMessageRef = useRef();

  console.log(user.id);

  useEffect(() => {
    try {
      const getMessages = async () => {
        const getMessages = await axios.get(
          `http://localhost:3000/v1/messages/${user?.id}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        const resData = getMessages;
        console.log("data: ", resData);
        const messages = resData?.data?.data?.messages?.results;
        setMessages(messages);
      };
      getMessages();
    } catch (e) {
      setError(error);
    }
  }, [user?.id, setMessages]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView({behavior: "smooth" });
    }, 10);
  }, [messages]);

  return (
    <div className="p-20 rounded-5" style={{ backgroundColor: "#edf2f4" }}>
      <h4>Message Admin</h4>
      <p>
        <div
          className="p-25 rounded-4"
          style={{
            backgroundColor: "#f8f9fa",
            height: "300px",
            overflowY: "scroll",
          }}
        >
          {messages.length > 0
            ? messages.map((message) => {
                return (
                  <div ref={lastMessageRef}>
                    <Message messages={message} />
                  </div>
                );
              })
            : "No conversation found, start your conversation here."}
        </div>
      </p>
      <MessageInput />
    </div>
  );
}

export default Conversation;
