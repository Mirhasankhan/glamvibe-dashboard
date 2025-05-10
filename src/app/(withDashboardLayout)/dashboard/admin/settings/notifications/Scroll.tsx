import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ScrollReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-10">
      <h2 className="text-4xl font-bold">Above Content</h2>   

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl bg-blue-600 text-white p-10 rounded-xl shadow-lg text-center text-3xl font-semibold"
      >
        I rise up smoothly on scroll!
      </motion.div>    
    </div>
  );
}
