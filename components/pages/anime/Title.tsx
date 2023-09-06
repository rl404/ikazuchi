import { inViewVariants } from "@/components/transitions/variants";
import { motion } from "framer-motion";

export default function Title() {
  return (
    <motion.div
      className="pointer-events-none flex items-center justify-center gap-4 text-5xl font-bold md:justify-start"
      variants={inViewVariants}
      initial="initialOpacity"
      whileInView="animate"
    >
      <span>Browse</span>
      <span className="gradient-text">Anime</span>
    </motion.div>
  );
}
