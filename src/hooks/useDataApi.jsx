import axios from "../lib/http-request";
import { useUserStore } from "../store/user.store";

export const useDataApi = () => {
  const accessToken = useUserStore((state) => state.accessToken);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  const fetch = (url, body = {}) => {
    return axios.get(url, body, {
      headers,
    });
  };

  const post = (url, body = {}) => {
    return axios.post(url, body, {
      headers,
    });
  };

  return { fetch, post };
};
