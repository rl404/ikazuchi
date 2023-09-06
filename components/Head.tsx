import GA from "./GA";
import _Head from "next/head";

export default function Head({
  title = "Home",
  description = "Explore anime database with Bakemonogatari theme.",
  image = "/images/home.jpg",
}: {
  title?: string;
  description?: string;
  image?: string;
}) {
  return (
    <>
      <_Head>
        <title>{`${title} | Ikazuchi`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ikazuchi" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html charset=utf-8" />
        <meta name="theme-color" content="#000" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </_Head>
      <GA />
    </>
  );
}
