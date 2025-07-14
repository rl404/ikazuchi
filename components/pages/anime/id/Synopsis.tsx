import { inViewVariants } from '@/components/transitions/variants';
import { Anime } from '@/pages/api/anime/[id]';
import { motion } from 'framer-motion';

export default function Synopsis({ anime }: { anime: Anime }) {
	return (
		<motion.div variants={inViewVariants} initial="initialOpacity" whileInView="animate">
			<div className="text-primary pointer-events-none text-sm font-bold">Synopsis</div>
			<div className="text-justify whitespace-pre-line">
				{anime.synopsis || 'No anime synopsis information.'}
			</div>
		</motion.div>
	);
}
