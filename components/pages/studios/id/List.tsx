import SpinnerIcon from "@/components/icons/SpinnerIcon";
import AnimeCover from "@/components/layouts/AnimeCover";
import { getAxiosError, useWindowSize } from "@/libs/utils";
import { Anime } from "@/pages/api/anime/[id]";
import { Studio } from "@/pages/api/studios/[id]";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function List({ studio }: { studio: Studio }) {
  return (
    <div className="grid gap-12">
      <TopList title="Top Ranking Anime" sort="RANK" studio={studio} />
      <TopList title="Top Popular Anime" sort="POPULARITY" studio={studio} />
    </div>
  );
}

const animeCount: { [size: string]: number } = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  "2xl": 16,
};

const TopList = ({
  title,
  sort,
  studio,
}: {
  title: string;
  sort: string;
  studio: Studio;
}) => {
  const [data, setData] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const screenSize = useWindowSize();

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(`/api/anime?studio_id=${studio.id}&sort=${sort}&limit=16`, {
        signal: controller.signal,
      })
      .then((resp) => setData(resp.data.data))
      .catch((err) => setError(getAxiosError(err)))
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between font-bold">
        <div className="text-2xl text-primary">{title}</div>
        <Link
          href={`/anime?studio_id=${studio.id}&sort=${sort}`}
          className="text-secondary"
        >
          View more
        </Link>
      </div>
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <SpinnerIcon className="h-8 w-8 animate-spin fill-primary text-neutral-600" />
        </div>
      ) : error !== "" ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
          {data.slice(0, animeCount[screenSize]).map((a) => (
            <AnimeCover key={a.id} anime={a} />
          ))}
        </div>
      )}
    </div>
  );
};
