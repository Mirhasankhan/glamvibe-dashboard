"use client";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { IFormInput } from "@/types/common";
import { Loader2 } from "lucide-react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const ChangePassword = () => {
  const [isLoading, setIsloading] = useState(false);
  const [changePass] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.newPassword !== data.confirm) {
      return toast.error("confirm password didn't match");
    }
    setIsloading(true);
    const response = await changePass(data);
    if (response.data) {
      toast.success("Password Changed Successfully");
    } else if (response.error) {
      toast.error("Something went wrong");
    }

    setIsloading(false);

    reset();
  };

  return (
    <div>
      <div className="bg-white rounded-md p-6">
        <div className="flex items-center gap-3  pb-6">
          <h1 className="text-2xl font-semibold">Password</h1>
          <HiOutlineExclamationCircle size={30} className="text-gray-400" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex gap-6 my-3">
            <div className="w-full">
              <label className="font-medium pb-2 block" htmlFor="">
                Old Password
              </label>
              <input
                className="input-design"
                type="password"
                placeholder="Input your old password"
                {...register("oldPassword", {
                  required: "old password is required",
                })}
              />
              {errors.oldPassword && <span>{errors.oldPassword.message}</span>}
            </div>
          </div>
          <div className="w-full">
            <label className="font-medium pb-2 block" htmlFor="">
              New Password
            </label>
            <input
              className="input-design"
              type="password"
              placeholder="Input your new password"
              {...register("newPassword", {
                required: "new password is required",
              })}
            />
            {errors.newPassword && <span>{errors.newPassword.message}</span>}
          </div>
          <div className="w-full mt-3">
            <label className="font-medium pb-2 block" htmlFor="">
              Confirm Password
            </label>
            <input
              className="input-design"
              type="password"
              placeholder="confirm your new password"
              {...register("confirm", {
                required: "Confirm password is required",
              })}
            />
            {errors.confirm && <span>{errors.confirm.message}</span>}
          </div>

          <div className="flex gap-6 mt-6 items-center justify-start">
            <button
              disabled={isLoading}
              type="submit"
              className="text-white bg-primary px-12 py-3 rounded-md font-medium"
            >
              {isLoading ? (
                <Loader2 className="animate-spin"></Loader2>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
