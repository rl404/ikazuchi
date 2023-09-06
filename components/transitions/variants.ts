import { Variants } from "framer-motion";

export const inViewVariants: Variants = {
  initialLeft: {
    x: "-50%",
    opacity: 0,
  },
  initialRight: {
    x: "50%",
    opacity: 1,
  },
  initialOpacity: {
    x: "0",
    opacity: 0,
  },
  animate: {
    x: "0",
    opacity: 1,
    transition: { duration: 0.5 },
  },
};
