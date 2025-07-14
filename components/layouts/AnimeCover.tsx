import Image from '@/components/Image';
import { inViewVariants } from '@/components/transitions/variants';
import { toURL } from '@/libs/utils';
import { Anime } from '@/pages/api/anime/[id]';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AnimeCover({
	anime,
	className = ''
}: {
	anime: Anime;
	className?: string;
}) {
	return (
		<motion.div
			variants={inViewVariants}
			initial="initialOpacity"
			whileInView="animate"
			title={anime.title}
			className={className}
		>
			<Link
				className="aspect-cover hover:outline-primary flex rounded outline outline-transparent hover:opacity-100"
				href={`/anime/${anime.id}/${toURL(anime.title)}`}
			>
				<Image
					src={anime.picture}
					alt={anime.title}
					className="h-full w-full rounded object-cover"
				/>
			</Link>
			<Link
				className="mt-1 line-clamp-2 text-sm font-bold"
				href={`/anime/${anime.id}/${toURL(anime.title)}`}
			>
				{anime.title}
			</Link>
		</motion.div>
	);
}
