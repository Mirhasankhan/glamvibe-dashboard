"use client";
import { TLoginValues } from "@/types/common";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import loginImage from "../../assets/Previews (1).png";
import Link from "next/link";

const Register = () => {
  const [registerAdmin, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>();

  const onSubmit: SubmitHandler<TLoginValues> = async (data) => {
    const updateData = {
      ...data,
      role: "ADMIN",
    };
    const response: any = await registerAdmin(updateData);
    console.log(response);
    if (response.data?.success == true) {
      toast.success(response.data.message);
      router.push(`/`);
    } else if (response.error) {
      toast.error(response?.error?.data?.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center">
      <div className="w-full mx-4 md:mx-0 flex items-center justify-center">
        <div className="md:w-2/3 mx-4 w-full md:mx-auto">
          <div>
            <Image alt="Logo" src={logo} height={200} width={200} />
          </div>
          <h1 className="text-3xl font-semibold pt-16 pb-2">Register</h1>
          <p className="text-gray-500 font-medium">
            Let&apos;s create new admin
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-lg pt-6 bg-white"
          >
            <div className="mb-4">
              <label className="block pb-2 font-medium">Admin Name</label>
              <input
                {...register("fullName", {
                  required: "Name is required",
                })}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>
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
                "Sign Up"
              )}
            </button>
          </form>
          <h1 className="mt-4 text-center">
            Already have an account?
            <Link href="/" className="text-primary">
              Login
            </Link>
          </h1>
        </div>
      </div>
      <div className="w-full hidden md:block">
        <img className="w-full max-h-screen" src={loginImage.src} />
      </div>
    </div>
  );
};

export default Register;
