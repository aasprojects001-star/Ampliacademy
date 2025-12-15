import { ReactNode } from "react";
import { motion } from "framer-motion";

type CardProps = {
  children: ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
    >
      {children}
    </motion.div>
  );
}
