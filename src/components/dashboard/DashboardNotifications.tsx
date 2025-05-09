import { motion, AnimatePresence } from "framer-motion";

const DashboardNotifications = ({
  notificationsOpen,
}: {
  notificationsOpen: boolean;
}) => {
  return (
    <AnimatePresence>
      {notificationsOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="border p-3 rounded-md w-full bg-white"
        >
          <div className="pb-4">
            <h1 className="text-xl ">Notifications</h1>            
          </div>
          <div>
            <div className="border p-2 rounded-lg mb-2">
              <h1>TItle: this isssss tileeeeeeeeeeee</h1>
              <p>Body: this is body</p>
              <p>Time: 01/02/24</p>
            </div>
            <div className="border p-2 rounded-lg mb-2">
              <h1>TItle: this is tile2</h1>
              <p>Body: this is body2</p>
              <p>Time: 01/02/24</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DashboardNotifications;
