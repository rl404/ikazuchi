import GithubIcon from "./icons/GithubIcon";
import { BackgroundColors } from "@/libs/constant";
import { getCurrentSeason, getCurrentTime, shuffle } from "@/libs/utils";
import { useCycle, motion, Variants, SVGMotionProps } from "framer-motion";
import Link from "next/link";
import { Router } from "next/router";
import { useEffect, useState } from "react";

const menuVariants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 16px 16px)`,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(20px at 26px 26px)",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export default function Menu() {
  const [open, toggleOpen] = useCycle(false, true);
  const [height, setHeight] = useState(0);
  const [bgColor, setBgColor] = useState("");

  const currentSeason = getCurrentSeason();
  const currentSeasonYear = new Date().getFullYear();

  const onClick = () => {
    !open && setBgColor(shuffle(BackgroundColors)[0]);
    toggleOpen();
  };

  useEffect(() => {
    const close = () => toggleOpen(0);
    const handleResize = () => setHeight(window.innerHeight);

    handleResize();

    Router.events.on("routeChangeStart", close);
    window.addEventListener("resize", handleResize);
    return () => {
      Router.events.off("routeChangeStart", close);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={open ? "open" : "closed"}
      custom={height}
    >
      <motion.div
        variants={menuVariants}
        className={`fixed bottom-0 left-0 top-0 h-full w-full overflow-scroll py-cinematic-bar ${bgColor}`}
      >
        <div className="container mx-auto flex flex-col items-center justify-center py-4">
          <div className="flex flex-col items-center justify-center">
            <Link
              href="/"
              className="mb-2 border-2 border-transparent px-4 py-2 font-mincho text-4xl font-bold tracking-widest hover:border-white hover:text-white hover:opacity-100"
            >
              イカヅチ
            </Link>
            <div className="italic">ikazuchi.</div>
            <div className="text-sm">({getCurrentTime()})</div>
          </div>
          <div className="h-cinematic-bar" />
          <div className="grid grid-cols-6 gap-cinematic-bar text-center">
            <div className="col-span-6 flex flex-col gap-2 sm:col-span-3 md:col-span-2">
              <div className="mb-4 flex flex-col">
                <Link
                  href="/studios"
                  className="font-mincho text-2xl font-bold"
                >
                  スタジオ
                </Link>
                <span className="text-sm italic">studios.</span>
              </div>
              <Link href="/studios?sort=-MEMBER">Most Popular</Link>
              <Link href="/studios?sort=-MEAN">Top Ranking</Link>
              <Link href="/studios?sort=-COUNT">Most Anime</Link>
            </div>
            <div className="col-span-6 flex flex-col gap-2 sm:col-span-3 md:col-span-2">
              <div className="mb-4 flex flex-col">
                <Link href="/anime" className="font-mincho text-2xl font-bold">
                  アニメ
                </Link>
                <span className="text-sm italic">anime.</span>
              </div>
              <Link href="/anime?sort=POPULARITY">Most Popular</Link>
              <Link href="/anime?sort=-MEAN">Top Ranking</Link>
              <Link href="/anime?status=RELEASING&sort=-MEAN">Top Airing</Link>
              <Link href="/anime?status=NOT_YET&sort=POPULARITY">
                Top Upcoming
              </Link>
              <Link
                href={`/anime?season=${currentSeason}&season_year=${currentSeasonYear}&sort=-MEAN`}
              >
                Top Current Season
              </Link>
            </div>
            <div className="col-span-6 flex flex-col gap-2 sm:col-span-6 md:col-span-2">
              <div className="mb-4 flex flex-col">
                <Link href="/genres" className="font-mincho text-2xl font-bold">
                  ジャンル
                </Link>
                <span className="text-sm italic">genres.</span>
              </div>
              <Link href="/genres?sort=-MEMBER">Most Popular</Link>
              <Link href="/genres?sort=-MEAN">Top Ranking</Link>
              <Link href="/genres?sort=-COUNT">Most Anime</Link>
            </div>
          </div>
          <div className="h-cinematic-bar" />
          <div className="flex items-center">
            <a href="https://github.com/rl404/ikazuchi" target="_blank">
              <GithubIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </motion.div>
      <MenuIcon toggle={onClick} />
    </motion.nav>
  );
}

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="white"
    strokeLinecap="round"
    {...props}
  />
);

const MenuIcon = ({ toggle }: { toggle: () => void }) => {
  return (
    <button
      onClick={toggle}
      className="fixed left-4 top-4 z-10 flex items-center"
    >
      <svg width="24" height="24" viewBox="0 0 20 20">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </button>
  );
};
