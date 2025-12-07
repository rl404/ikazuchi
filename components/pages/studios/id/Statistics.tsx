import LineChart from '@/components/charts/LineChart';
import SpinnerIcon from '@/components/icons/SpinnerIcon';
import { inViewVariants } from '@/components/transitions/variants';
import { getAxiosError } from '@/libs/utils';
import { Studio } from '@/pages/api/studios/[id]';
import { StudioHistory } from '@/pages/api/studios/[id]/history';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { NumberDomain } from 'recharts/types/util/types';

export default function Statistics({ studio }: { studio: Studio }) {
	const [data, setData] = useState<StudioHistory[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		axios
			.get(`/api/studios/${studio.id}/history?group=MONTHLY`)
			.then((resp) => setData(resp.data.data))
			.catch((err) => setError(getAxiosError(err)))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
			<motion.div
				className="flex aspect-video flex-col gap-1"
				variants={inViewVariants}
				initial="initialOpacity"
				whileInView="animate"
			>
				<div className="text-primary pointer-events-none text-center text-sm font-bold">
					Average Rank and Popularity History
				</div>
				{loading ? (
					<div className="flex h-full items-center justify-center">
						<SpinnerIcon className="fill-primary h-8 w-8 animate-spin text-neutral-600" />
					</div>
				) : error !== '' ? (
					<div className="flex h-full items-center justify-center text-red-500">{error}</div>
				) : (
					<div className="h-full">
						<LineChart
							config={{
								syncID: 'chart-sync',
								value1: {
									name: 'rank',
									reversed: true,
									color: '#db2777',
									domain: ([dataMin, dataMax]: NumberDomain) => [
										Math.max(0, Math.floor(dataMin - (dataMax - dataMin) / 10)),
										Math.ceil(dataMax + (dataMax - dataMin) / 10)
									],
									allowDecimal: false
								},
								value2: {
									name: 'popularity',
									reversed: true,
									color: '#fbbf24',
									domain: ([dataMin, dataMax]: NumberDomain) => [
										Math.max(0, Math.floor(dataMin - (dataMax - dataMin) / 10)),
										Math.ceil(dataMax + (dataMax - dataMin) / 10)
									],
									allowDecimal: false
								}
							}}
							data={data.map((d: StudioHistory) => ({
								label: `${d.year}-${('0' + d.month).slice(-2)}`,
								value1: d.rank === 0 ? null : d.rank,
								value2: d.popularity === 0 ? null : d.popularity
							}))}
						/>
					</div>
				)}
			</motion.div>
			<motion.div
				className="flex aspect-video flex-col gap-1"
				variants={inViewVariants}
				initial="initialOpacity"
				whileInView="animate"
			>
				<div className="text-primary pointer-events-none text-center text-sm font-bold">
					Score and Count History
				</div>
				{loading ? (
					<div className="flex h-full items-center justify-center">
						<SpinnerIcon className="fill-primary h-8 w-8 animate-spin text-neutral-600" />
					</div>
				) : error !== '' ? (
					<div className="flex h-full items-center justify-center text-red-500">{error}</div>
				) : (
					<div className="h-full">
						<LineChart
							config={{
								syncID: 'chart-sync',
								value1: {
									name: 'avg score',
									color: '#db2777',
									domain: [0, 10],
									allowDecimal: true
								},
								value2: {
									name: 'count',
									color: '#fbbf24',
									domain: ([dataMin, dataMax]: NumberDomain) => [
										Math.max(0, Math.floor(dataMin - (dataMax - dataMin) / 10)),
										Math.ceil(dataMax + (dataMax - dataMin) / 10)
									],
									allowDecimal: false
								}
							}}
							data={data.map((d: StudioHistory) => ({
								label: `${d.year}-${('0' + d.month).slice(-2)}`,
								value1: d.mean === 0 ? null : d.mean,
								value2: d.count === 0 ? null : d.count
							}))}
						/>
					</div>
				)}
			</motion.div>
		</div>
	);
}
