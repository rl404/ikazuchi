import { inViewVariants } from "@/components/transitions/variants";
import {
  AnimeRatingToStr,
  AnimeSourceToStr,
  AnimeStatusToStr,
  AnimeTypeToStr,
  DayToStr,
  SeasonToStr,
  months,
} from "@/libs/constant";
import { Anime } from "@/pages/api/anime/[id]";
import { motion } from "framer-motion";

export default function Details({ anime }: { anime: Anime }) {
  return (
    <div className="grid grid-cols-2 gap-4 text-center font-bold sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      <Stats
        title="global rank"
        top="Rank"
        value={anime.rank ? "#" + anime.rank.toLocaleString() : "N/A"}
      />
      <Stats
        title="average score"
        top="Score"
        value={anime.mean ? anime.mean.toFixed(2) : "N/A"}
      />
      <Stats
        title="user count who give score"
        top="Voter"
        value={anime.voter.toLocaleString()}
      />
      <Stats
        title="popularity rank"
        top="Popularity"
        value={
          anime.popularity ? "#" + anime.popularity.toLocaleString() : "N/A"
        }
      />
      <Stats
        title="user count who favorite the anime"
        top="Member"
        value={anime.member.toLocaleString()}
      />
      <Stats title="anime type" top="Type" value={AnimeTypeToStr(anime.type)} />
      <Stats
        title="anime source"
        top="Source"
        value={AnimeSourceToStr(anime.source)}
      />
      <Stats
        title="airing status"
        top="Status"
        value={AnimeStatusToStr(anime.status)}
      />
      {anime.season?.season && (
        <Stats
          title="season"
          top="Season"
          value={SeasonToStr(anime.season.season)}
          bottom={anime.season.year.toString()}
        />
      )}
      {anime.broadcast?.day && (
        <Stats
          title="broadcast schedule"
          top="Broadcast"
          value={DayToStr(anime.broadcast.day)}
          bottom={anime.broadcast.time}
        />
      )}
      <Stats
        title="episode"
        top="Episode"
        value={
          anime.episode.count !== 0 ? anime.episode.count.toLocaleString() : "-"
        }
        bottom={
          anime.episode.duration === 0
            ? undefined
            : `${parseInt(
                (anime.episode.duration / 60).toFixed(0),
              ).toLocaleString()} min`
        }
      />
      <Stats
        title="airing start date"
        top="Start Date"
        value={anime.start_date.year ? anime.start_date.year.toString() : "-"}
        bottom={
          anime.start_date.year === 0
            ? undefined
            : `${anime.start_date.day || ""} ${months[anime.start_date.month]}`
        }
      />
      <Stats
        title="airing end date"
        top="End Date"
        value={anime.end_date.year ? anime.end_date.year.toString() : "-"}
        bottom={
          anime.end_date.year === 0
            ? undefined
            : `${anime.end_date.day || ""} ${months[anime.end_date.month]}`
        }
      />
      <Stats
        title="rating"
        top="Rating"
        value={AnimeRatingToStr(anime.rating)[0]}
        bottom={AnimeRatingToStr(anime.rating)[1]}
      />
    </div>
  );
}

const Stats = ({
  title,
  top,
  value,
  bottom,
}: {
  title: string;
  top: string;
  value: string;
  bottom?: string;
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      title={title}
      variants={inViewVariants}
      initial="initialOpacity"
      whileInView="animate"
    >
      <div className="pointer-events-none text-sm text-primary">{top}</div>
      <div className="text-4xl">{value}</div>
      {bottom && <div className="text-sm">{bottom}</div>}
    </motion.div>
  );
};
