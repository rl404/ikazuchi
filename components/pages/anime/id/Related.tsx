import Image from '@/components/Image';
import { inViewVariants } from '@/components/transitions/variants';
import { AnimeRelation, AnimeRelationToStr } from '@/libs/constant';
import { toURL } from '@/libs/utils';
import { Anime, Related as _Related } from '@/pages/api/anime/[id]';
import { motion } from 'framer-motion';
import Link from 'next/link';

const relationOrder = Object.values(AnimeRelation);

export default function Related({ anime }: { anime: Anime }) {
	if (anime.related.length === 0) {
		return;
	}

	anime.related.sort((a, b) => {
		const ai = relationOrder.findIndex((v) => v === a.relation);
		const bi = relationOrder.findIndex((v) => v === b.relation);
		if (ai === bi) return a.title.localeCompare(b.title);
		return ai - bi;
	});

	return (
		<div className="grid gap-2">
			<div className="text-primary pointer-events-none text-center text-sm font-bold">
				Related Anime
			</div>
			<div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
				{anime.related.map((a) => (
					<div key={a.id}>
						<RelatedCard anime={a} />
					</div>
				))}
			</div>
		</div>
	);
}

const RelatedCard = ({ anime }: { anime: _Related }) => {
	return (
		<motion.div variants={inViewVariants} initial="initialOpacity" whileInView="animate">
			<Link
				className="aspect-card flex gap-1 outline outline-transparent hover:cursor-pointer hover:opacity-100 hover:outline-pink-600"
				title={anime.title}
				href={`/anime/${anime.id}/${toURL(anime.title)}`}
			>
				<div className="basis-1/3">
					<Image
						src={anime.picture}
						alt={anime.title}
						className="h-full w-full rounded object-cover"
					/>
				</div>
				<div className="basis-2/3 p-1">
					<div className="grid gap-1">
						<div className="text-secondary text-sm">{AnimeRelationToStr(anime.relation)}</div>
						<div className="line-clamp-2 font-bold">{anime.title}</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};
