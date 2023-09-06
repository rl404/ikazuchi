import Layout from "@/components/Layout";
import InitTransition from "@/components/transitions/InitTransition";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <main className={roboto.className}>
      <InitTransition />
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </main>
  );
}
