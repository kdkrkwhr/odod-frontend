import { API_BASE_URL } from "../../config";
import Axios from "axios";

type registerDTO = {
  email: string;
  name: string;
  picture: string;
};

export const register = (data: registerDTO) => {
  const url = API_BASE_URL + `user/auth`;
  return Axios.post(url, data);
};

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
