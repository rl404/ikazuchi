import { inViewVariants } from "@/components/transitions/variants";
import { toURL } from "@/libs/utils";
import { Anime } from "@/pages/api/anime/[id]";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Studios({ anime }: { anime: Anime }) {
  if (!anime.studios || anime.studios.length === 0) return <></>;
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
          href="/studios"
        >
          Studios
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-1">
        {anime.studios.map((g) => (
          <Link
            key={g.id}
            className="bg-secondary px-1.5 py-0.5 text-center font-bold text-black hover:!text-black"
            href={`/studios/${g.id}/${toURL(g.name)}`}
          >
            {g.name}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
