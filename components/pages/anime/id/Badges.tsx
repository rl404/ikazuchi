import { inViewVariants } from "@/components/transitions/variants";
import { AnimeStatusToStr, AnimeTypeToStr, SeasonToStr } from "@/libs/constant";
import { Anime } from "@/pages/api/anime/[id]";
import { motion } from "framer-motion";

export default function Badges({ anime }: { anime: Anime }) {
  return (
    <motion.div
      className="flex items-center justify-between gap-2"
      variants={inViewVariants}
      initial="initialOpacity"
      whileInView="animate"
    >
      <div className="text-sm font-bold" title="myanimelist id">
        #{anime.id}
      </div>
      <div className="flex items-center gap-1">
        <Badge
          text={AnimeStatusToStr(anime.status)}
          title="airing status"
          className="bg-secondary text-black"
        />
        {anime.season && anime.season.season !== "" && (
          <Badge
            text={`${SeasonToStr(anime.season.season)} ${anime.season.year}`}
            title="season"
            className="bg-secondary text-black"
          />
        )}
        <Badge
          text={AnimeTypeToStr(anime.type)}
          title="anime type"
          className="bg-secondary text-black"
        />
        {anime.nsfw && <Badge text="18+" title="nsfw" className="bg-primary" />}
      </div>
    </motion.div>
  );
}

const Badge = ({
  text,
  title = "",
  className = "",
}: {
  text: string;
  title?: string;
  className?: string;
}) => {
  return (
    <div className={`px-2 py-1 text-sm font-bold ${className}`} title={title}>
      {text}
    </div>
  );
};
