import { inViewVariants } from '@/components/transitions/variants';
import { Genre } from '@/pages/api/genres/[id]';
import { motion } from 'framer-motion';

export default function Title({ genre }: { genre: Genre }) {
	return (
		<motion.div
			className="text-5xl font-bold"
			variants={inViewVariants}
			initial="initialOpacity"
			whileInView="animate"
		>
			Genre{' '}
			<a
				className="gradient-text-none hover:gradient-text hover:opacity-100"
				href={`${process.env.NEXT_PUBLIC_MAL_HOST}/anime/genre/${genre.id}`}
				target="_blank"
				referrerPolicy="no-referrer"
			>
				{genre.name}
			</a>
			<span className="text-secondary text-sm"> — {genre.count.toLocaleString()} anime</span>
		</motion.div>
	);
}
