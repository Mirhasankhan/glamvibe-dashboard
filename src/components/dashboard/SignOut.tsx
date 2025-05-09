import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SignOut = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(
      setUser({
        name: "hasan",
        email: "mirhasan.bd1@gmail.com",
        role: "ADMIN",
        token: "",
      })
    );
    // localStorage.removeItem("token");
    Cookies.remove("token");
    router.push("/");
  };
  return (
    <button
      onClick={() => logOut()}
      className="flex items-center gap-2 w-full md:w-[185px] 2xl:w-[320px] text-red-600 py-3 px-2 rounded-md bg-red-100  font-medium"
    >
      <LogOut />
      Logout
    </button>
  );
};

export default SignOut;
