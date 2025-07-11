import Menu from "./Menu";
import SearchIcon from "./icons/SearchIcon";
import RouteTransition from "./transitions/RouteTransition";
import Link from "next/link";
import { ReactNode, useRef } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const resetScroll = () => ref.current?.scroll({ top: 0, left: 0 });

  return (
    <div>
      <div className="fixed top-0 z-10 h-cinematic-bar w-full gap-2 bg-black" />
      <div className="fixed bottom-0 z-10 h-cinematic-bar w-full bg-black" />
      <div
        ref={ref}
        id="ikazuchi-content"
        className="fixed top-cinematic-bar h-cinematic w-full overflow-auto bg-image bg-cover bg-fixed bg-center"
      >
        <RouteTransition resetScroll={resetScroll}>
          <div className="container mx-auto p-4">{children}</div>
        </RouteTransition>
      </div>
      <Menu />
      <Link
        href="/anime"
        className="fixed right-4 top-4 z-10 flex items-center"
      >
        <SearchIcon className="size-6" />
      </Link>
    </div>
  );
}
