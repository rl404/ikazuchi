import { Season } from "./constant";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const shuffle = (arr: any[]): any[] => {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * arr.length);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const setCSSVariable = (name: string, value: string) => {
  document.documentElement.style.setProperty(name, value);
};

export const getCurrentTime = (): string => {
  return `${new Date().getHours()}${new Date().getMinutes()}`;
};

export const compactInt = (n: number) => {
  const num = n.toString().replace(/[^0-9.]/g, "");
  if (n < 1000) {
    return num;
  }
  let si = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" },
  ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (n >= si[index].v) {
      break;
    }
  }
  return (
    (n / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
    si[index].s
  );
};

export const getAxiosError = (error: Error | AxiosError): string => {
  if (
    !axios.isAxiosError(error) ||
    !error.response ||
    !error.response.data ||
    !error.response.data.message
  ) {
    return error.message;
  }
  return error.response.data.message;
};

export const Ellipsis = (str: string, length: number): string => {
  if (str.length <= 3 || length <= 3 || str.length <= length) return str;
  return `${str.slice(0, length - 3)} ...`;
};

export const useClickOutside = (ref: any, onClickOutside: () => void) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      ref && ref.current && !ref.current.contains(e.target) && onClickOutside();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const screenSizes = [
  { size: "sm", value: 640 },
  { size: "md", value: 768 },
  { size: "lg", value: 1024 },
  { size: "xl", value: 1280 },
  { size: "2xl", value: 1536 },
];

export const useWindowSize = () => {
  const [size, setSize] = useState("sm");
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      setSize(
        screenSizes.reduce((res, curr) => {
          if (width >= curr.value) return curr.size;
          return res;
        }, "sm"),
      );
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export const getCurrentSeason = (month = new Date().getMonth()): string => {
  if (month >= 3 && month <= 5) return Season.spring;
  if (month >= 6 && month <= 8) return Season.summer;
  if (month >= 9 && month <= 11) return Season.fall;
  return Season.winter;
};

export const addMonth = (date: Date, month: number): Date => {
  date.setMonth(date.getMonth() + month);
  return date;
};

export const toURL = (str: string): string => {
  return str.replace(/[^a-zA-Z0-9-]+/g, "_").replace(/^_+|_+$/g, "");
};
