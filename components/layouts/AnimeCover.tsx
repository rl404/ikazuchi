import Image from "@/components/Image";
import { inViewVariants } from "@/components/transitions/variants";
import { Anime } from "@/pages/api/anime/[id]";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AnimeCover({
  anime,
  className = "",
}: {
  anime: Anime;
  className?: string;
}) {
  return (
    <motion.div
      variants={inViewVariants}
      initial="initialOpacity"
      whileInView="animate"
      title={anime.title}
      className={className}
    >
      <Link
        className="flex aspect-cover rounded outline outline-1 outline-transparent hover:opacity-100 hover:outline-primary"
        href={`/anime/${anime.id}/${anime.title}`}
      >
        <Image
          src={anime.picture}
          alt={anime.title}
          className="h-full w-full rounded object-cover"
        />
      </Link>
      <Link
        className="mt-1 line-clamp-2 text-sm font-bold"
        href={`/anime/${anime.id}/${anime.title}`}
      >
        {anime.title}
      </Link>
    </motion.div>
  );
}
