import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import z from "zod";

import { useNavigate } from "react-router-dom";

//schema zod
const signInSchema = z.object({
  email: z.email("format email salah"),
  password: z
    .string("password wajib di isi")
    .min(8, "Password must be atleast 8 character"),
});
type TsignInSchema = z.infer<typeof signInSchema>;

const Login = () => {
  const navigate = useNavigate();
  //kirin ke context
  // const { user,token, setUser, setToken } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<TsignInSchema>({ resolver: zodResolver(signInSchema) });

  //hadnle orang register
  const onsubmit = async (data: TsignInSchema) => {
    try {
      const result = await axios.post(
        "http://localhost:4000/auth/login",
        {
          password: data.password,
          email: data.email,
        },
        {
          withCredentials: true,
        }
      );
      console.log(result.data);
      //simpan token ke global context
      // setToken(result.data.token);
      // setUser(await result.data.message);
      localStorage.setItem("token", result.data.token);
      reset();
      navigate("/");
    } catch (error: any) {
      console.error("Error saat Login:", error.response?.data || error.message);
      setError("email", {
        message: error.response?.data?.message || error.message,
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onsubmit)}
        encType="multipart/form-data"
        className="bg-white max-w-[500px] w-full p-6 rounded space-y-8"
      >
        <div className="flex justify-center  items-center font-bold text-xl">
          <h1>Login Form</h1>
        </div>
        <p className="text-green-400 font-bold text-2xl flex justify-center items-center">
          {/* {user || errors.email?.message || errors.password?.message} */}
        </p>
        {/* email */}
        <label htmlFor="email" className="relative block bg-gray-200 rounded ">
          <input
            {...register("email", { required: "email harus di isi" })}
            placeholder="masukan email"
            className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm p-3"
          />
          <span className="absolute inset-y-0 start-3 -translate-y-5  px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
            email
          </span>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </label>

        {/* password */}
        <label
          htmlFor="password"
          className="relative block bg-gray-200 rounded"
        >
          <input
            {...register("password", { required: "password harus di isi" })}
            placeholder="masukan password anda"
            type="password"
            className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm p-3"
          />
          <span className="absolute inset-y-0 start-3 -translate-y-5 px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
            password
          </span>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </label>

        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-400 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300 ease-in-out"
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
