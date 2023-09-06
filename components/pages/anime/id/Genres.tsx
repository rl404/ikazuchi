import { inViewVariants } from "@/components/transitions/variants";
import { Anime } from "@/pages/api/anime/[id]";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Genres({ anime }: { anime: Anime }) {
  if (!anime.genres || anime.genres.length === 0) return <></>;
  return (
    <motion.div
      className="!hidden gap-1 text-sm md:!grid"
      variants={inViewVariants}
      initial="initialOpacity"
      whileInView="animate"
    >
      <div className="flex">
        <Link
          className="bg-primary px-1.5 py-0.5 text-center font-bold"
          href="/genres"
        >
          Genres
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-1">
        {anime.genres.map((g) => (
          <Link
            key={g.id}
            className="bg-secondary px-1.5 py-0.5 text-center font-bold text-black hover:!text-black"
            href={`/genres/${g.id}/${g.name}`}
          >
            {g.name}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
