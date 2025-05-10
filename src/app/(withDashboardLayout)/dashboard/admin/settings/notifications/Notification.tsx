// BannerSlider.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const banners = [
  {
    id: 1,
    content: "Welcome to Our Site",
    image:
      "url('https://images.unsplash.com/photo-1726137569872-28e3f796d4a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8')",
  },
  {
    id: 2,
    content: "Explore Our Services",
    image:
      "url('https://images.unsplash.com/photo-1746713915201-4eed01ca887a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8')",
  },
  {
    id: 3,
    content: "Contact Us Today",
    image:
      "url('https://images.unsplash.com/photo-1745282480794-10427e218c76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA==')",
  },
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={banners[index].id}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute w-full h-[600px] bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: banners[index].image }}
        >
          <div className="text-white text-4xl md:text-6xl font-bold bg-black bg-opacity-50 p-6 rounded-lg text-center">
            {banners[index].content}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
