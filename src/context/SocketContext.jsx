import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useUserStore } from "../store/user.store";


export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useUserStore((state) => state.user);
  // const accessToken = useUserStore((state) => state.accessToken);

  useEffect(() => {
    if (user) {
      const socket = io(import.meta.env.VITE_SERVER_URL_SOCKET, {
        query: {
          userId: user.id,
        },
      });

      setSocket(socket);

      // return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
