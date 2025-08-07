import { axiosInstance } from "./axios";
import { isTokenExpired } from "./useAuthStore";

//refresh token ketika token kadaluarsa
export const refreshTokenIfNeeded = async (): Promise<string | null> => {
  let token = localStorage.getItem("token") || "";

  if (!token || isTokenExpired(token)) {
    try {
      const res = await axiosInstance.post("/auth/refreshToken", null, {
        withCredentials: true,
      });
      token = res.data.accesToken;
      console.log("tokenbaru", res.data);
      localStorage.setItem("token", token);
      return token;
    } catch (err) {
      console.log("Gagal refresh token", err);
      return null;
    }
  }
  return token;
};
