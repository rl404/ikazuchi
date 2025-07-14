import AnimeCover from '@/components/layouts/AnimeCover';
import { useWindowSize } from '@/libs/utils';
import { Anime } from '@/pages/api/anime/[id]';
import Link from 'next/link';

const animeCount: { [size: string]: number } = {
	sm: 8,
	md: 10,
	lg: 12,
	xl: 14,
	'2xl': 16
};

export default function Grid({
	title,
	link,
	data
}: {
	title: string;
	link: string;
	data: Anime[];
}) {
	const screenSize = useWindowSize();
	return (
		<div className="grid gap-4">
			<div className="flex items-center justify-between font-bold">
				<div className="text-primary text-2xl">{title}</div>
				<Link href={link} className="text-secondary">
					View more
				</Link>
			</div>
			<div className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
				{data.slice(0, animeCount[screenSize]).map((a) => (
					<AnimeCover key={a.id} anime={a} />
				))}
			</div>
		</div>
	);
}
