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
import { GetServerSideProps } from "next";
import { ReactNode, useReducer } from "react";

export default function AnimePage() {
  return (
    <>
      <Head
        title="Anime"
        description="Search anime database with Bakemonogatari theme."
        image="/images/anime.jpg"
      />
      <Browse>
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

const Browse = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, defaultCtx);
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
      genre_id: query.genre_id || "",
      studio_id: query.studio_id || "",
      sort: query.sort || "",
    },
  };
};
