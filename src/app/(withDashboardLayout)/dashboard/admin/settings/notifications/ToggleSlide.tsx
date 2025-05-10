// ToggleSlide.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ToggleSlide() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-10 bg-gray-100">
      <div className="flex gap-4">
        <button
          onClick={() => setShow(true)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg"
        >
          Show
        </button>
        <button
          onClick={() => setShow(false)}
          className="bg-red-500 text-white px-6 py-2 rounded-lg"
        >
          Hide
        </button>
      </div>

      <div className="relative w-full max-w-xl h-64 mt-10 overflow-hidden">
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute w-full h-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold rounded-lg shadow-lg"
            >
              Im sliding in from the left!
              <h1>sdfsfd</h1>
              <p>dfslllllllllll</p>
              <button className="p-4 bg-red-400">new button</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
