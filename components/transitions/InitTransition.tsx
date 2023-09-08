import { BackgroundColors, BackgroundImages } from "@/libs/constant";
import { setCSSVariable, shuffle } from "@/libs/utils";
import { Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";

const variants: Variants = {
  animate: (i) => ({
    width: "100vw",
    transition: {
      delay: 2 + i * 0.3,
      duration: 0.5,
      ease: "easeInOut",
    },
  }),
  done: {
    width: "0vw",
    transition: {
      duration: 0.5,
      delay: 1,
      ease: "easeInOut",
    },
  },
};

export default function InitTransition() {
  const [done, setDone] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [bgImages, setBgImages] = useState<string[]>([]);
  const [animateName, setAnimateName] = useState("animate");

  const onAnimationComplete = () => {
    if (animateName === "animate") {
      setAnimateName("done");
    } else {
      setDone(true);
    }
  };

  useEffect(() => {
    const bgColor = shuffle(BackgroundColors)[0];
    const bgImages = shuffle(BackgroundImages).slice(0, 5);

    setBgColor(bgColor);
    setBgImages(bgImages);
    setCSSVariable(
      `--ikz-background-image`,
      `url(${bgImages[bgImages.length - 1]})`,
    );
  }, []);

  if (done) return <></>;

  return (
    <div>
      <motion.div
        className={`absolute z-50 flex h-screen items-center justify-center overflow-hidden ${bgColor}`}
        initial={{ width: "100vw" }}
        animate={animateName}
        variants={{ done: variants.done }}
      >
        <span className="pointer-events-none border-2 border-white px-4 py-2 text-5xl font-bold">
          IKAZUCHI
        </span>
      </motion.div>
      <motion.div
        className="absolute z-50 h-screen bg-black"
        initial={{ width: "100vw" }}
        animate={{
          width: "0vw",
          transition: { delay: 1, duration: 0.5, ease: "easeInOut" },
        }}
      />
      {bgImages.map((v, i) => (
        <motion.div
          key={i}
          className="absolute z-50 h-screen bg-cover bg-fixed bg-center object-cover"
          style={{ backgroundImage: `url(${v})` }}
          initial={{ width: "0vw" }}
          animate={animateName}
          custom={i}
          variants={variants}
          onAnimationComplete={
            i === bgImages.length - 1 ? onAnimationComplete : undefined
          }
        />
      ))}
    </div>
  );
}
