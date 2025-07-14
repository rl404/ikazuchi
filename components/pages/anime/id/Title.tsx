import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import { inViewVariants } from '@/components/transitions/variants';
import { Anime } from '@/pages/api/anime/[id]';
import { Variants, motion } from 'framer-motion';
import { useState } from 'react';

const variants: Variants = {
	open: { opacity: 1, height: 'auto', transition: { staggerChildren: 0.2 } },
	closed: { opacity: 0, height: 0 }
};

const synonymVariants: Variants = {
	open: { x: 0, opacity: 1 },
	closed: { x: '-50%', opacity: 0 }
};

export default function Title({ anime }: { anime: Anime }) {
	const [open, setOpen] = useState(false);

	const toggleOpen = () => setOpen(!open);

	return (
		<motion.div
			className="flex justify-between font-bold"
			variants={inViewVariants}
			initial="initialOpacity"
			whileInView="animate"
		>
			<div className="grid gap-1">
				<div>
					<a
						className="gradient-text-none hover:gradient-text text-5xl hover:opacity-100"
						href={`${process.env.NEXT_PUBLIC_MAL_HOST}/anime/${anime.id}`}
						target="_blank"
						referrerPolicy="no-referrer"
					>
						{anime.title}
					</a>
				</div>
				<div className="text-secondary flex gap-2 text-sm">
					{anime.alternative_titles.english && (
						<span title="english title" className="line-clamp-1 hover:line-clamp-none">
							{anime.alternative_titles.english}
						</span>
					)}
					{anime.alternative_titles.japanese && (
						<span title="japanese title" className="line-clamp-1 hover:line-clamp-none">
							{anime.alternative_titles.japanese}
						</span>
					)}
					{anime.alternative_titles.synonyms.length > 0 && (
						<span className="flex items-center">
							<div
								className={`rounded-full p-1 transition-all duration-300 hover:bg-amber-400 hover:text-black ${
									open && 'rotate-180'
								}`}
								title="synonym titles"
								onClick={toggleOpen}
							>
								<ChevronDownIcon className="h-3 w-3" />
							</div>
						</span>
					)}
				</div>
				{anime.alternative_titles.synonyms.length > 0 && (
					<motion.div
						title="synonym titles"
						className="text-secondary grid text-sm"
						initial="closed"
						animate={open ? 'open' : 'closed'}
						variants={variants}
					>
						{anime.alternative_titles.synonyms.map((t) => (
							<motion.div key={t} variants={synonymVariants}>
								- {t}
							</motion.div>
						))}
					</motion.div>
				)}
			</div>
			<div className="hidden grid-cols-3 gap-2 lg:grid">
				<div
					className="flex flex-col items-center justify-center p-2 text-center"
					title="average score"
				>
					<div className="text-primary pointer-events-none text-sm">Score</div>
					<div className="text-4xl">{anime.mean ? anime.mean.toFixed(2) : 'N/A'}</div>
				</div>
				<div
					className="flex flex-col items-center justify-center p-2 text-center"
					title="global rank"
				>
					<div className="text-primary pointer-events-none text-sm">Rank</div>
					<div className="text-4xl">{anime.rank ? '#' + anime.rank.toLocaleString() : 'N/A'}</div>
				</div>
				<div
					className="flex flex-col items-center justify-center p-2 text-center"
					title="popularity rank"
				>
					<div className="text-primary pointer-events-none text-sm">Popularity</div>
					<div className="text-4xl">
						{anime.popularity ? '#' + anime.popularity.toLocaleString() : 'N/A'}
					</div>
				</div>
			</div>
		</motion.div>
	);
}
