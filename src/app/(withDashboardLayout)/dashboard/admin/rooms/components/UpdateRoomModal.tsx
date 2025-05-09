import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateRoomMutation } from "@/redux/features/restaurant/restaurantApi";
import { IFormInput, TRoom } from "@/types/common";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateRoomModal = ({ room }: { room: TRoom }) => {
  const [updateRoom, { isLoading }] = useUpdateRoomMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      roomName: room.roomName || "",
      price: room.price || 0,
      adults: room.adults || 1,
      bedDetail: room.bedDetail || "",
      roomSize: room.roomSize || "",
      discount: room.discount ?? "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response: any = await updateRoom({ id: room.id, updateData: data });
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
        <button className="bg-primary w-full mt-4 font-medium py-2 rounded-lg text-white">
          Update Room
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{room.roomName}</DialogTitle>
          <DialogDescription>Update Room Details</DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2">
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
                {errors.roomName && <span>{errors.roomName.message}</span>}
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
                {errors.price && <span>{errors.price.message}</span>}
              </div>
            </div>
            <div>
              <div className="w-full">
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
                {errors.adults && <span>{errors.adults.message}</span>}
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
                {errors.bedDetail && <span>{errors.bedDetail.message}</span>}
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
                {errors.roomSize && <span>{errors.roomSize.message}</span>}
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
                {errors.discount && <span>{errors.discount.message}</span>}
              </div>
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="text-white text-center mt-6 w-full bg-primary px-4 py-2 rounded-md font-medium"
            >
              {isLoading ? (
                <Loader2 className="animate-spin mx-auto"></Loader2>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRoomModal;
