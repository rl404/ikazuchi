import Menu from './Menu';
import SearchIcon from './icons/SearchIcon';
import RouteTransition from './transitions/RouteTransition';
import Link from 'next/link';
import { ReactNode, useRef } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);

	const resetScroll = () => ref.current?.scroll({ top: 0, left: 0 });

	return (
		<div>
			<div className="h-cinematic-bar fixed top-0 z-10 w-full gap-2 bg-black" />
			<div className="h-cinematic-bar fixed bottom-0 z-10 w-full bg-black" />
			<div
				ref={ref}
				id="ikazuchi-content"
				className="top-cinematic-bar h-cinematic bg-image fixed w-full overflow-auto bg-cover bg-fixed bg-center"
			>
				<RouteTransition resetScroll={resetScroll}>
					<div className="container mx-auto p-4">{children}</div>
				</RouteTransition>
			</div>
			<Menu />
			<Link href="/anime" className="fixed top-4 right-4 z-10 flex items-center">
				<SearchIcon className="size-6" />
			</Link>
		</div>
	);
}
