import { useEffect, useState } from "react";
import { axiosInstance } from "../../libs/axios";
import { refreshTokenIfNeeded } from "../../libs/AuthService";

type UserProfile = {
  username: string;
  email: string;
  role: string;
  createdAt: Date;
  id: number;
  images: string;
};
const ProfilPages = () => {
  // const { token, setToken } = useAuthContext();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // console.log(token);



  const fetchUserProfile = async () => {
    // console.log("token ap ini brok", token);

    try {
      const res = await axiosInstance.get<{ user: UserProfile }>(
        "/users/profile",
        {
          withCredentials: true,
        }
      );
      setUser(res.data.user);
    } catch (err: any) {
      console.log("Gagal fetch profile", err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const token = await refreshTokenIfNeeded();
      if (!token) {
        setError("Gagal refresh token");
        setLoading(false);
        return;
      }
      await fetchUserProfile();
    };

    init();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading Profile…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700">
      <div className="w-96 bg-gray-300  px-8 py-4  shadow-[18px_18px_0px_rgba(0,0,0,1)] grid place-content-center shadow-gray-400">
        <div className="flex justify-center items-center flex-col h-full">
          <div className="flex justify-center items-center ">
            {user && (
              <div className="flex flex-col gap-4 justify-center items-center">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL_IMG}/${
                    user?.images
                  }`}
                  alt={user.username}
                  className="w-64 h-64 object-top items-center"
                />
                <h2>username :{user?.username}</h2>
                <p className="line-clamp-3 text-sm py-2">
                 member since : {new Date(user.createdAt).toDateString()}
                </p>
                <div className="flex flex-col  gap-4 text-black font-semibold">
                  <p>UserId: {user?.id}</p>
                  <p>email: {user.email}$</p>
                  <p>ROle: {user?.role}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilPages;
