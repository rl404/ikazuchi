import Head from "@/components/Head";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import List from "@/components/pages/genres/id/List";
import Statistics from "@/components/pages/genres/id/Statistics";
import Title from "@/components/pages/genres/id/Title";
import { Data } from "@/pages/api/genres/[id]";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export default function GenrePage(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  if (!data.data) {
    return (
      <div className="flex h-full items-center justify-center">
        <SpinnerIcon className="h-10 w-10 animate-spin fill-primary text-neutral-600" />
      </div>
    );
  }

  const genre = data.data;

  return (
    <>
      <Head
        title={genre.name}
        description={`${genre.name} anime genre.`}
        image=""
      />
      <div className="grid gap-12">
        <div>
          <Title genre={genre} />
        </div>
        <div>
          <Statistics genre={genre} />
        </div>
        <div>
          <List genre={genre} />
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
    `${process.env.API_HOST_AKATSUKI}/genres/${params?.id}`
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
