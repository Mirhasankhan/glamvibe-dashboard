import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";

const DashboardSearch = ({ searchOpen }: { searchOpen: boolean }) => {
  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="border p-3 rounded-md w-full bg-white"
        >
          <div className="flex justify-center gap-4">
            <Input
              className="bg-gray-200"
              type="email"
              id="email"
              placeholder="Search here...."
            />
          </div>
          <div className="">
            <h1 className="font-semibold py-2">Recently Searched Data: </h1>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DashboardSearch;
