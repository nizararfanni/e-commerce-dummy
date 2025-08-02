import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

//schema zod
const signInSchema = z
  .object({
    username: z.string(),
    email: z.email("format email salah"),
    password: z
      .string("password wajib di isi")
      .min(8, "Password must be atleast 8 character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "password confirm harus sama ",
    path: ["confirmPassword"],
  });

type TsignInSchema = z.infer<typeof signInSchema>;

const Register = () => {
  const [user, setUser] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TsignInSchema>({ resolver: zodResolver(signInSchema) });

  //hadnle orang register
  const onsubmit = async (data: TsignInSchema) => {
    try {
      const result = await axios.post("http://localhost:4000/auth", {
        username: data.username,
        password: data.password,
        email: data.email,
      });
      console.log(result.data);
      setUser(result.data.message);
      reset();
    } catch (error: any) {
      console.error(
        "Error saat register:",
        error.response?.data || error.message
      );
    }
  };

  //reser pesan message succescreate account
  useEffect(() => {
    if (user) {
      const messageTimer = setTimeout(() => setUser(null), 3000);
      return () => clearTimeout(messageTimer);
    }
  }, [user]);

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
          {user}
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
        <label
          htmlFor="username"
          className="relative block bg-gray-200 rounded "
        >
          <input
            {...register("username", { required: "username harus di isi" })}
            placeholder="masukan username"
            className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm p-3"
          />
          <span className="absolute inset-y-0 start-3 -translate-y-5  px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
            username
          </span>
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </label>

        {/* Email */}
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

        {/* Price */}
        <label htmlFor="price" className="relative block bg-gray-200 rounded">
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="confirm password"
            className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm p-3"
          />
          <span className="absolute inset-y-0 start-3 -translate-y-5  px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
            confirmPassword
          </span>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
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

export default Register;
