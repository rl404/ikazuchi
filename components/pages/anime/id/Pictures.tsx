import Image from "@/components/Image";
import { inViewVariants } from "@/components/transitions/variants";
import { Anime } from "@/pages/api/anime/[id]";
import { Variants, motion } from "framer-motion";
import { useState } from "react";

const variants: Variants = {
  initial: {
    x: "-50%",
    opacity: 0,
  },
  animate: {
    x: "0",
    opacity: 1,
  },
};

export default function Pictures({ anime }: { anime: Anime }) {
  anime.pictures = Array.from(new Set([anime.picture].concat(anime.pictures)));

  const [pictureIndex, setPictureIndex] = useState(0);

  const onSetPicture = (i: number) => setPictureIndex(i);

  return (
    <motion.div
      className="grid gap-1"
      variants={inViewVariants}
      initial="initialOpacity"
      whileInView="animate"
    >
      <motion.div
        key={pictureIndex}
        initial="initial"
        animate="animate"
        variants={variants}
      >
        <Image
          className="mx-auto aspect-cover rounded object-cover text-center"
          src={anime.pictures[pictureIndex]}
          alt={anime.title}
        />
      </motion.div>
      <div className="flex justify-center">
        <div className="flex items-center gap-1 overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-5">
          {anime.pictures.map((p, i) => (
            <Image
              key={i}
              className="aspect-cover w-10 rounded object-cover text-center transition-opacity duration-300 hover:cursor-pointer hover:opacity-80 md:h-full md:w-full"
              src={p}
              alt={anime.title}
              onClick={() => onSetPicture(i)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
