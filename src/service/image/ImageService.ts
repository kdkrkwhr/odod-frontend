import { API_BASE_URL } from "../../config";
import Axios from "axios";

export const authenticate = (token: string, email: string) => {
  const url = API_BASE_URL + `user/exist/${encodeURI(email)}`;
  return Axios.get(url, {
    headers: {
      // Accept: "application/json",
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
