// TwoSideScrollReveal.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function TwoSideScrollReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-10 bg-gray-100">
      <h2 className="text-4xl font-bold mb-10">Scroll Down to Trigger Animation</h2>  

      <div
        ref={ref}
        className="flex flex-col md:flex-row justify-between items-center w-full max-w-5xl gap-10"
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          className="bg-blue-600 text-white p-10 rounded-xl shadow-lg text-xl w-full md:w-1/2 text-center"
        >
          I slide in from the left
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          className="bg-green-600 text-white p-10 rounded-xl shadow-lg text-xl w-full md:w-1/2 text-center"
        >
          I slide in from the right
        </motion.div>
      </div>

      <div className="h-[100vh]"></div> {/* More space */}
    </div>
  );
}
