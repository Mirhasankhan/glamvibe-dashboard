import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { JWTDecode } from "@/utils/jwt";
import { CircleUserRound } from "lucide-react";
import Cookies from "js-cookie";

const UserDetails = ({ isOpen }: { isOpen: boolean }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { decoded } = JWTDecode();
  const singOut = () => {
    dispatch(
      setUser({
        name: "",
        email: "",
        role: "",
        token: "",
      })
    );
    // localStorage.removeItem("token");
    Cookies.remove("token");
    router.push("/");
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="border p-3 rounded-md w-full bg-white"
        >
          <div className="flex justify-center items-center gap-4">
            <CircleUserRound></CircleUserRound>
            <div>
              <h1 className="text-xl font-semibold">{decoded?.userName}</h1>
              <p>{decoded?.email}</p>
            </div>
          </div>
          <Button
            onClick={() => singOut()}
            className="w-full mt-3"
            variant={"outline"}
          >
            Logout
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserDetails;
