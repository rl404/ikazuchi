import Head from "@/components/Head";
import {
  Context,
  DispatchContext,
  defaultCtx,
  reducer,
} from "@/components/contexts/AnimeContext";
import List from "@/components/pages/anime/List";
import Search from "@/components/pages/anime/Search";
import Title from "@/components/pages/anime/Title";
import { Sort } from "@/libs/constant";
import { GetServerSideProps } from "next";
import { ReactNode, useReducer } from "react";

export default function AnimePage({
  title,
  nsfw,
  type,
  status,
  season,
  season_year,
  start_mean,
  end_mean,
  genre_id,
  studio_id,
  sort,
}: {
  title: string;
  nsfw: string;
  type: string;
  status: string;
  season: string;
  season_year: string;
  start_mean: string;
  end_mean: string;
  genre_id: string;
  studio_id: string;
  sort: string;
}) {
  return (
    <>
      <Head
        title="Anime"
        description="Search anime database with Bakemonogatari theme."
        image="/images/anime.jpg"
      />
      <Browse
        title={title}
        nsfw={nsfw}
        type={type}
        status={status}
        season={season}
        season_year={season_year}
        start_mean={start_mean}
        end_mean={end_mean}
        genre_id={genre_id}
        studio_id={studio_id}
        sort={sort}
      >
        <div className="grid gap-4">
          <div>
            <Title />
          </div>
          <div>
            <Search />
          </div>
          <div>
            <List />
          </div>
        </div>
      </Browse>
    </>
  );
}

const Browse = ({
  title,
  nsfw,
  type,
  status,
  season,
  season_year,
  start_mean,
  end_mean,
  genre_id,
  studio_id,
  sort,
  children,
}: {
  title: string;
  nsfw: string;
  type: string;
  status: string;
  season: string;
  season_year: string;
  start_mean: string;
  end_mean: string;
  genre_id: string;
  studio_id: string;
  sort: string;
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...defaultCtx,
    queries: {
      ...defaultCtx.queries,
      title: title,
      nsfw: nsfw,
      type: type,
      status: status,
      season: season,
      season_year: season_year,
      start_mean: start_mean,
      end_mean: end_mean,
      genre_id: genre_id,
      studio_id: studio_id,
      sort: sort,
    },
  });
  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      title: query.title || "",
      nsfw: query.nsfw || "false",
      type: query.type || "",
      status: query.status || "",
      season: query.season || "",
      season_year: query.season_year || "",
      start_mean: query.start_mean || "",
      end_mean: query.end_mean || "",
      genre_id: query.genre_id || "",
      studio_id: query.studio_id || "",
      sort: query.sort || Sort.popularityAsc,
    },
  };
};
