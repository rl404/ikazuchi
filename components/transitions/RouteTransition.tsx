import { BackgroundImages } from "@/libs/constant";
import { setCSSVariable, shuffle } from "@/libs/utils";
import { Variants, motion } from "framer-motion";
import { Router } from "next/router";
import { ReactNode, useEffect, useState } from "react";

const variants: Variants = {
  animate: {
    width: "100vw",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  done: {
    width: "0vw",
    transition: {
      duration: 0.5,
      delay: 1,
      ease: "easeInOut",
    },
  },
};

export default function RouteTransition({
  resetScroll,
  children,
}: {
  resetScroll: () => void;
  children: ReactNode;
}) {
  const [bgImage, setBgImage] = useState("");
  const [animateName, setAnimateName] = useState("done");
  const [animationLoading, setAnimationLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const pageStart = () => {
    setPageLoading(true);
    setAnimationLoading(true);
    setBgImage(shuffle(BackgroundImages)[0]);
    setAnimateName("animate");
  };

  const pageEnd = () => {
    setPageLoading(false);
  };

  const onAnimationComplete = () => {
    if (animateName !== "animate") return;
    setAnimationLoading(false);
    resetScroll();
    setCSSVariable(`--ikz-background-image`, `url(${bgImage})`);
  };

  useEffect(() => {
    if (pageLoading || animationLoading) return;
    setAnimateName("done");
  }, [pageLoading, animationLoading]);

  useEffect(() => {
    Router.events.on("routeChangeStart", pageStart);
    Router.events.on("routeChangeComplete", pageEnd);
    return () => {
      Router.events.off("routeChangeStart", pageStart);
      Router.events.off("routeChangeComplete", pageEnd);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed z-50 h-screen bg-cover bg-fixed bg-center object-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
        initial={{ width: "0vw" }}
        animate={animateName}
        variants={variants}
        onAnimationComplete={onAnimationComplete}
      />
      {children}
    </>
  );
}
