import axios from "axios";

///buat axios base url
export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

// /handle request axios
axiosInstance.interceptors.request.use(
  (config) => {
   const token = localStorage.getItem("token");
   if (token) {
     config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//handle interceptor response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("error interceptor", error);
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post("/auth/refreshToken", null, {
          withCredentials: true,
        });
        console.log("res", res);
        const newAccessToken = res.data.accessToken;
        localStorage.setItem("token", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
