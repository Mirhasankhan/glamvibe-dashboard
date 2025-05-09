import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateRoomMutation } from "@/redux/features/restaurant/restaurantApi";
import { IFormInput, THotel } from "@/types/common";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const AddRoom = ({ hotel }: { hotel: THotel }) => {
  const [createRoom, { isLoading }] = useCreateRoomMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const roomData = {
      ...data,
      hotelId: hotel.id,
    };
    const response: any = await createRoom(roomData);
    if (response.data) {
      toast.success(response.data.message);
      reset();
    } else if (response.error) {
      if (response.error) {
        toast.error(response?.error?.data?.message);
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-primary py-2 px-6 rounded-full text-white"
          variant="outline"
        >
          Add Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{hotel.hotelName}</DialogTitle>
          <DialogDescription>Add New Room</DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="w-full">
                <label className="block pb-1 font-medium" htmlFor="">
                  Room Name
                </label>
                <input
                  className="input-design"
                  type="text"
                  placeholder="Room Name"
                  {...register("roomName", {
                    required: "Room name is required",
                  })}
                />
                {errors.roomName && (
                  <span className="text-red-400">
                    {errors.roomName.message}
                  </span>
                )}
              </div>
              <div className="w-full mt-2">
                <label className="block pb-1 font-medium" htmlFor="">
                  Room Price
                </label>
                <input
                  className="input-design"
                  type="number"
                  placeholder="room price"
                  {...register("price", {
                    required: "price is required",
                    min: 1,
                    valueAsNumber: true,
                  })}
                />
                {errors.price && (
                  <span className="text-red-400">{errors.price.message}</span>
                )}
              </div>
            </div>
            <div>
              <div className="w-full mt-2">
                <label className="block pb-1 font-medium" htmlFor="">
                  Adults
                </label>
                <input
                  className="input-design"
                  type="number"
                  placeholder="number of adult"
                  {...register("adults", {
                    required: "number of adults is required",
                    min: 1,
                    valueAsNumber: true,
                  })}
                />
                {errors.adults && (
                  <span className="text-red-400">{errors.adults.message}</span>
                )}
              </div>
              <div className="w-full mt-2">
                <label className="block pb-1 font-medium" htmlFor="">
                  Beds
                </label>
                <input
                  className="input-design"
                  type="text"
                  placeholder="input bed details"
                  {...register("bedDetail", {
                    required: "bed detail is required",
                  })}
                />
                {errors.bedDetail && (
                  <span className="text-red-400">
                    {errors.bedDetail.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="w-full mt-2">
                <label className="block pb-1 font-medium" htmlFor="">
                  Room Size
                </label>
                <input
                  className="input-design"
                  type="text"
                  placeholder="room size"
                  {...register("roomSize", {
                    required: "room size is required",
                  })}
                />
                {errors.roomSize && (
                  <span className="text-red-400">
                    {errors.roomSize.message}
                  </span>
                )}
              </div>
              <div className="w-full mt-2">
                <label className="block pb-1 font-medium" htmlFor="">
                  Discount
                </label>
                <input
                  step={"any"}
                  className="input-design"
                  type="number"
                  placeholder="discount"
                  {...register("discount", {
                    min: 1,
                    valueAsNumber: true,
                  })}
                />
                {errors.discount && (
                  <span className="text-red-400">
                    {errors.discount.message}
                  </span>
                )}
              </div>
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="text-white text-center mt-6 w-full bg-[#00A8CC] px-4 py-2 rounded-md font-medium"
            >
              {isLoading ? (
                <Loader2 className="animate-spin mx-auto"></Loader2>
              ) : (
                "Add Room"
              )}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoom;
