import { inViewVariants } from "@/components/transitions/variants";
import { Anime } from "@/pages/api/anime/[id]";
import { motion } from "framer-motion";

export default function Background({ anime }: { anime: Anime }) {
  return (
    <motion.div
      variants={inViewVariants}
      initial="initialOpacity"
      whileInView="animate"
    >
      <div className="pointer-events-none text-sm font-bold text-primary">
        Background
      </div>
      <div className="whitespace-pre-line text-justify">
        {anime.background || "No anime background information."}
      </div>
    </motion.div>
  );
}
