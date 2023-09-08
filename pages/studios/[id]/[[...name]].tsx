import Head from "@/components/Head";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import List from "@/components/pages/studios/id/List";
import Statistics from "@/components/pages/studios/id/Statistics";
import Title from "@/components/pages/studios/id/Title";
import { Data } from "@/pages/api/studios/[id]";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export default function StudioPage(
  data: InferGetStaticPropsType<typeof getStaticProps>,
) {
  if (!data.data) {
    return (
      <div className="flex h-full items-center justify-center">
        <SpinnerIcon className="h-10 w-10 animate-spin fill-primary text-neutral-600" />
      </div>
    );
  }

  const studio = data.data;

  return (
    <>
      <Head
        title={studio.name}
        description={`${studio.name} anime studio.`}
        image=""
      />
      <div className="grid gap-12">
        <div>
          <Title studio={studio} />
        </div>
        <div>
          <Statistics studio={studio} />
        </div>
        <div>
          <List studio={studio} />
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
    `${process.env.API_HOST_AKATSUKI}/studios/${params?.id}`,
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
