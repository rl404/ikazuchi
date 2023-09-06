import Head from "@/components/Head";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import Background from "@/components/pages/anime/id/Background";
import Badges from "@/components/pages/anime/id/Badges";
import Details from "@/components/pages/anime/id/Details";
import Genres from "@/components/pages/anime/id/Genres";
import Pictures from "@/components/pages/anime/id/Pictures";
import Related from "@/components/pages/anime/id/Related";
import Statistics from "@/components/pages/anime/id/Statistics";
import Studios from "@/components/pages/anime/id/Studios";
import Synopsis from "@/components/pages/anime/id/Synopsis";
import Title from "@/components/pages/anime/id/Title";
import { Ellipsis } from "@/libs/utils";
import { Data } from "@/pages/api/anime/[id]";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export default function AnimePage(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  if (!data.data) {
    return (
      <div className="flex h-full items-center justify-center">
        <SpinnerIcon className="h-10 w-10 animate-spin fill-primary text-neutral-600" />
      </div>
    );
  }

  const anime = data.data;

  return (
    <>
      <Head
        title={anime.title}
        description={
          Ellipsis(anime.synopsis, 150) || "No anime synopsis information."
        }
        image={anime.picture}
      />
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-5 md:col-span-1">
          <div className="grid gap-4">
            <Pictures anime={anime} />
            <Genres anime={anime} />
            <Studios anime={anime} />
          </div>
        </div>
        <div className="col-span-5 md:col-span-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <Badges anime={anime} />
            </div>

            <div className="col-span-12">
              <Title anime={anime} />
            </div>

            <div className="col-span-12">
              <Synopsis anime={anime} />
            </div>

            <div className="col-span-12">
              <Background anime={anime} />
            </div>

            <div className="col-span-12">
              <Details anime={anime} />
            </div>

            <div className="col-span-12">
              <Statistics anime={anime} />
            </div>

            <div className="col-span-12">
              <Related anime={anime} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Data> = async ({ params }) => {
  const res = await fetch(
    `${process.env.API_HOST_AKATSUKI}/anime/${params?.id}`
  );

  const resp = await res.json();

  if (resp.status !== 200) {
    return {
      notFound: true,
    };
  }

  return {
    props: resp,
    revalidate: 86400,
  };
};
