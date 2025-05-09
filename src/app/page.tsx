"use client";
import { TLoginValues } from "@/types/common";
import Image from "next/image";
import logo from "../assets/logo.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import Cookies from "js-cookie";
import loginImage from "../assets/Previews.png";
import Link from "next/link";

const AdminLogin = () => {
  const [loginAdmin, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>();

  const onSubmit: SubmitHandler<TLoginValues> = async (data) => {
    const response: any = await loginAdmin(data);

    if (response.data?.success == true) {
      dispatch(
        setUser({
          name: response.data.result.userInfo.userName,
          email: response.data.result.userInfo.email,
          role: response.data.result.userInfo.role,
          token: response.data.result.accessToken,
        })
      );
      Cookies.set("token", response.data.result.accessToken, { expires: 7 });
      toast.success(response.data.message);
      router.push(
        `/dashboard/${response.data.result.userInfo.role.toLocaleLowerCase()}`
      );
    } else if (response.error) {
      toast.error(response?.error?.data?.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center">
      <div className="w-full hidden md:block">
        <img className="w-full max-h-screen" src={loginImage.src} />
      </div>

      <div className="w-full mx-4 md:mx-0 flex items-center justify-center">
        <div className="md:w-2/3 mx-4 w-full md:mx-auto">
          <div>
            <Image alt="Logo" src={logo} height={200} width={200} />
          </div>
          <h1 className="text-3xl font-semibold pt-8 md:pt-16 pb-2">Login</h1>
          <p className="text-gray-500 font-medium">
            Let&apos;s Log into your account first
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-lg pt-6 bg-white w-full"
          >
            <div className="mb-4">
              <label className="block pb-2 font-medium">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block pb-2 font-medium">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-2 border rounded-md"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className={`bg-primary text-white py-3 w-full font-medium rounded-md ${
                isLoading && "bg-opacity-60"
              }`}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto"></Loader>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <h1 className="mt-4 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary">
              Register
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
