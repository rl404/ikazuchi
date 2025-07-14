import { inViewVariants } from '@/components/transitions/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Title({
	animeCount,
	genreCount,
	studioCount
}: {
	animeCount: number;
	genreCount: number;
	studioCount: number;
}) {
	return (
		<motion.div
			className="flex items-center justify-center font-bold md:justify-between"
			variants={inViewVariants}
			initial="initialOpacity"
			whileInView="animate"
		>
			<div className="pointer-events-none flex flex-col text-center md:text-left">
				<div className="gradient-text text-5xl">IKAZUCHI</div>
				<div className="text-sm">Explore anime database with Bakemonogatari theme</div>
			</div>
			<div className="hidden grid-cols-3 items-center gap-2 md:grid">
				<div className="flex flex-col items-center justify-center text-center">
					<div className="text-primary pointer-events-none text-sm">Anime</div>
					<Link
						href="/anime"
						className="gradient-text-none hover:gradient-text text-4xl hover:opacity-100"
					>
						{animeCount.toLocaleString()}
					</Link>
				</div>
				<div className="flex flex-col items-center justify-center text-center">
					<div className="text-primary pointer-events-none text-sm">Genres</div>
					<Link
						href="/genres"
						className="gradient-text-none hover:gradient-text text-4xl hover:opacity-100"
					>
						{genreCount.toLocaleString()}
					</Link>
				</div>
				<div className="flex flex-col items-center justify-center text-center">
					<div className="text-primary pointer-events-none text-sm">Studios</div>
					<Link
						href="/studios"
						className="gradient-text-none hover:gradient-text text-4xl hover:opacity-100"
					>
						{studioCount.toLocaleString()}
					</Link>
				</div>
			</div>
		</motion.div>
	);
}
