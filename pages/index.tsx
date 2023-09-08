import { Data } from "./api/anime";
import { Data as GenreData } from "./api/genres";
import { Data as StudioData } from "./api/studios";
import Head from "@/components/Head";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import Grid from "@/components/pages/Grid";
import Title from "@/components/pages/Title";
import { addMonth, getCurrentSeason } from "@/libs/utils";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export default function Home(
  data: InferGetStaticPropsType<typeof getStaticProps>,
) {
  if (
    !data.topSeasonal ||
    !data.topUpcoming ||
    !data.mostPopular ||
    !data.topRank ||
    !data.animeCount ||
    !data.genreCount ||
    !data.studioCount
  ) {
    return (
      <div className="flex h-full items-center justify-center">
        <SpinnerIcon className="h-10 w-10 animate-spin fill-primary text-neutral-600" />
      </div>
    );
  }

  const now = new Date();
  const currentSeason = getCurrentSeason(now.getMonth());
  const currentSeasonYear = now.getFullYear();
  const nextSeason = getCurrentSeason(now.getMonth() + 3);
  const nextSeasonYear = addMonth(now, 3).getFullYear();

  return (
    <>
      <Head />
      <div className="grid gap-12">
        <div>
          <Title
            animeCount={data.animeCount.meta.total}
            genreCount={data.genreCount.meta.total}
            studioCount={data.studioCount.meta.total}
          />
        </div>
        <div>
          <Grid
            title="Popular This Season"
            link={`/anime?season=${currentSeason}&season_year=${currentSeasonYear}&sort=POPULARITY`}
            data={data.topSeasonal.data}
          />
        </div>
        <div>
          <Grid
            title="Top Upcoming Season"
            link={`/anime?season=${nextSeason}&season_year=${nextSeasonYear}&sort=POPULARITY`}
            data={data.topUpcoming.data}
          />
        </div>
        <div>
          <Grid
            title="Most Popular"
            link="/anime?sort=POPULARITY"
            data={data.mostPopular.data}
          />
        </div>
        <div>
          <Grid
            title="Top Ranking"
            link={`/anime?sort=RANKING`}
            data={data.topRank.data}
          />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  topSeasonal: Data;
  topUpcoming: Data;
  mostPopular: Data;
  topRank: Data;
  animeCount: Data;
  genreCount: GenreData;
  studioCount: StudioData;
}> = async () => {
  const now = new Date();
  const currentSeason = getCurrentSeason(now.getMonth());
  const currentSeasonYear = now.getFullYear();
  const nextSeason = getCurrentSeason(now.getMonth() + 3);
  const nextSeasonYear = addMonth(now, 3).getFullYear();

  const [
    topSeasonalRes,
    topUpcomingRes,
    mostPopularRes,
    topRankRes,
    animeCountRes,
    genreCountRes,
    studioCountRes,
  ] = await Promise.all([
    fetch(
      `${process.env.API_HOST_AKATSUKI}/anime?season=${currentSeason}&season_year=${currentSeasonYear}&sort=POPULARITY&limit=16`,
    ),
    fetch(
      `${process.env.API_HOST_AKATSUKI}/anime?season=${nextSeason}&season_year=${nextSeasonYear}&sort=POPULARITY&limit=16`,
    ),
    fetch(`${process.env.API_HOST_AKATSUKI}/anime?sort=POPULARITY&limit=16`),
    fetch(`${process.env.API_HOST_AKATSUKI}/anime?sort=RANK&limit=16`),
    fetch(`${process.env.API_HOST_AKATSUKI}/anime?limit=1`),
    fetch(`${process.env.API_HOST_AKATSUKI}/genres?limit=1`),
    fetch(`${process.env.API_HOST_AKATSUKI}/studios?limit=1`),
  ]);

  return {
    props: {
      topSeasonal: await topSeasonalRes.json(),
      topUpcoming: await topUpcomingRes.json(),
      mostPopular: await mostPopularRes.json(),
      topRank: await topRankRes.json(),
      animeCount: await animeCountRes.json(),
      genreCount: await genreCountRes.json(),
      studioCount: await studioCountRes.json(),
    },
    revalidate: 86400,
  };
};
