import { inViewVariants } from '@/components/transitions/variants';
import { MAL_HOST } from '@/libs/constant';
import { Studio } from '@/pages/api/studios/[id]';
import { motion } from 'framer-motion';

export default function Title({ studio }: { studio: Studio }) {
	return (
		<motion.div
			className="text-5xl font-bold"
			variants={inViewVariants}
			initial="initialOpacity"
			whileInView="animate"
		>
			Studio{' '}
			<a
				className="gradient-text-none hover:gradient-text hover:opacity-100"
				href={`${MAL_HOST}/anime/producer/${studio.id}`}
				target="_blank"
				referrerPolicy="no-referrer"
			>
				{studio.name}
			</a>
			<span className="text-secondary text-sm"> — {studio.count.toLocaleString()} anime</span>
		</motion.div>
	);
}
