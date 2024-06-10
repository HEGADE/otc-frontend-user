import React, { useEffect, useState } from "react";
import img from "/assets/images/chat.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useConversation } from "../../store/message.store";
import { useSocketContext } from "../../context/SocketContext";
import axios from '../../lib/http-request/index';
import { useUserStore } from "../../store/user.store";
import { API } from "../../utils/config/api-end-points.config";

function MessageIcon() {
  const navigate = useNavigate();
  const unreadMessages = useConversation((state) => state.unreadMessages);
  const setUnreadMessages = useConversation((state) => state.setUnreadMessages);
  const accessToken = useUserStore((state) => state.accessToken);
  const { socket } = useSocketContext();
  const location = useLocation()

  useEffect(() => {
    const getUnreadMessages = async () => {
      try {
        const response = await axios.get(
          API.getUnreadMessages,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        console.log("unread messages: ", response.data.data);
        const unreadMessageResponse = response?.data?.data;
        setUnreadMessages(unreadMessageResponse);
      } catch (error) {
        console.error("Error loading unread messages", error);
      }
    };
    getUnreadMessages();
  }, []);
  
  useEffect(() => {
    if(location.pathname === '/messages'){
      return;
    }
    socket?.on("unreadMessages", (unreadMessage) => {
      setUnreadMessages(unreadMessage);
    });
    return () => socket?.off("unreadMessages");
  }, [unreadMessages, location]);

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          onClick={() => navigate("/messages")}
          style={{
            width: "55px",
            cursor: "pointer",
          }}
          src={img}
          alt="Chat Icon"
        />
        {unreadMessages?.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "-5px",
              left: "-5px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            {unreadMessages.length}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageIcon;
