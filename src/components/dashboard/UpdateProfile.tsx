"use client";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  phoneNumber: string;
  email: string;
  detailInfo: string;
};

const UpdateProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },    
    reset,
  } = useForm<FormData>({
    defaultValues:{
        email:"email@gmail.com"
    }
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    reset();
  };

  return (
    <div className="mx-auto bg-white rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Update Your Information</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input       
          readOnly
            type="email"
            {...register("email", {             
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Address</label>
          <textarea placeholder="detail address"
            {...register("detailInfo", { required: "Address are required" })}
            className="w-full p-2 border border-gray-300 rounded mt-1 h-24"
          />
          {errors.detailInfo && (
            <p className="text-red-500 text-sm">{errors.detailInfo.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-[#FA7E34] text-white p-2 rounded 00 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
