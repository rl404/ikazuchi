import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import LineSeriesChart from '@/components/charts/LineSeriesChart';
import SpinnerIcon from '@/components/icons/SpinnerIcon';
import { inViewVariants } from '@/components/transitions/variants';
import { AnimeStatus, HistoryGroup } from '@/libs/constant';
import { getAxiosError } from '@/libs/utils';
import { Anime } from '@/pages/api/anime/[id]';
import { AnimeHistory } from '@/pages/api/anime/[id]/history';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { NumberDomain } from 'recharts/types/util/types';

export default function Statistics({ anime }: { anime: Anime }) {
	const [data, setData] = useState<AnimeHistory[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [show, setShow] = useState(false);

	const toggleShow = () => setShow(!show);

	const group = anime.status === AnimeStatus.finished ? HistoryGroup.monthly : HistoryGroup.weekly;

	useEffect(() => {
		axios
			.get(`/api/anime/${anime.id}/history?group=${group}`)
			.then((resp) => setData(resp.data.data))
			.catch((err) => setError(getAxiosError(err)))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			<motion.div
				className="flex aspect-video flex-col gap-1"
				variants={inViewVariants}
				initial="initialOpacity"
				whileInView="animate"
			>
				<div className="text-primary pointer-events-none text-center text-sm font-bold">
					Status Statistics
				</div>
				<div className="h-full">
					<BarChart
						config={{ valueName: 'count' }}
						data={Object.entries(anime.stats.status).map((v) => ({
							label: statusKeyToStr(v[0]),
							value: v[1],
							color: statusColor(v[0])
						}))}
					/>
				</div>
			</motion.div>

			<motion.div
				className="flex aspect-video flex-col gap-1"
				variants={inViewVariants}
				initial="initialOpacity"
				whileInView="animate"
			>
				<div className="text-primary pointer-events-none text-center text-sm font-bold">
					Rank and Popularity History
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
							data={data.map((d: AnimeHistory) => ({
								label:
									group === HistoryGroup.monthly
										? `${d.year}-${('0' + d.month).slice(-2)}`
										: `${d.year}-${('0' + d.month).slice(-2)} W${d.week}`,
								value1: d.rank === 0 ? null : d.rank,
								value2: d.popularity === 0 ? null : d.popularity
							}))}
						/>
					</div>
				)}
			</motion.div>

			{show && (
				<motion.div
					className="flex aspect-video flex-col gap-1"
					variants={inViewVariants}
					initial="initialOpacity"
					whileInView="animate"
				>
					<div className="text-primary pointer-events-none text-center text-sm font-bold">
						Score and Member History
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
										name: 'score',
										color: '#db2777',
										domain: [0, 10],
										allowDecimal: true
									},
									value2: {
										name: 'member',
										color: '#fbbf24',
										domain: ([dataMin, dataMax]: NumberDomain) => [
											Math.max(0, Math.floor(dataMin - (dataMax - dataMin) / 10)),
											Math.ceil(dataMax + (dataMax - dataMin) / 10)
										],
										allowDecimal: false
									}
								}}
								data={data.map((d: AnimeHistory) => ({
									label:
										group === HistoryGroup.monthly
											? `${d.year}-${('0' + d.month).slice(-2)}`
											: `${d.year}-${('0' + d.month).slice(-2)} W${d.week}`,
									value1: d.mean === 0 ? null : d.mean,
									value2: d.member === 0 ? null : d.member
								}))}
							/>
						</div>
					)}
				</motion.div>
			)}

			{show && (
				<motion.div
					className="flex aspect-video flex-col gap-1"
					variants={inViewVariants}
					initial="initialOpacity"
					whileInView="animate"
				>
					<div className="text-primary pointer-events-none text-center text-sm font-bold">
						Status History
					</div>
					{loading ? (
						<div className="flex h-full items-center justify-center">
							<SpinnerIcon className="fill-primary h-8 w-8 animate-spin text-neutral-600" />
						</div>
					) : error !== '' ? (
						<div className="flex h-full items-center justify-center text-red-500">{error}</div>
					) : (
						<div className="h-full">
							<LineSeriesChart
								config={{
									syncID: 'chart-sync',
									allowDecimal: false
								}}
								data={[
									{
										name: 'watching',
										color: statusColor('watching'),
										values: data.map((d) => ({
											label:
												group === HistoryGroup.monthly
													? `${d.year}-${('0' + d.month).slice(-2)}`
													: `${d.year}-${('0' + d.month).slice(-2)} W${d.week}`,
											value: d.user_watching
										}))
									},
									{
										name: 'completed',
										color: statusColor('completed'),
										values: data.map((d) => ({
											label:
												group === HistoryGroup.monthly
													? `${d.year}-${('0' + d.month).slice(-2)}`
													: `${d.year}-${('0' + d.month).slice(-2)} W${d.week}`,
											value: d.user_completed
										}))
									},
									{
										name: 'on-hold',
										color: statusColor('on_hold'),
										values: data.map((d) => ({
											label:
												group === HistoryGroup.monthly
													? `${d.year}-${('0' + d.month).slice(-2)}`
													: `${d.year}-${('0' + d.month).slice(-2)} W${d.week}`,
											value: d.user_on_hold
										}))
									},
									{
										name: 'dropped',
										color: statusColor('dropped'),
										values: data.map((d) => ({
											label:
												group === HistoryGroup.monthly
													? `${d.year}-${('0' + d.month).slice(-2)}`
													: `${d.year}-${('0' + d.month).slice(-2)} W${d.week}`,
											value: d.user_dropped
										}))
									},
									{
										name: 'planned',
										color: statusColor('planned'),
										values: data.map((d) => ({
											label:
												group === HistoryGroup.monthly
													? `${d.year}-${('0' + d.month).slice(-2)}`
													: `${d.year}-${('0' + d.month).slice(-2)} W${d.week}`,
											value: d.user_planned
										}))
									}
								]}
							/>
						</div>
					)}
				</motion.div>
			)}

			<motion.div
				className="col-span-1 text-center lg:col-span-2"
				variants={inViewVariants}
				initial="initialOpacity"
				whileInView="animate"
			>
				<button
					onClick={toggleShow}
					className="hover:border-primary hover:bg-primary rounded border border-white px-2 py-1 transition-colors hover:font-bold"
				>
					{`Show ${show ? 'less' : 'more'} stats`}
				</button>
			</motion.div>
		</div>
	);
}

const statusKeyToStr = (key: string): string => {
	switch (key) {
		case 'watching':
			return 'Watching';
		case 'completed':
			return 'Completed';
		case 'on_hold':
			return 'On-Hold';
		case 'dropped':
			return 'Dropped';
		case 'planned':
			return 'Plan to Watch';
		default:
			return '';
	}
};

const statusColor = (status: string): string => {
	switch (status) {
		case 'watching':
			return '#22c55e';
		case 'completed':
			return '#3b82f6';
		case 'on_hold':
			return '#fbbf24';
		case 'dropped':
			return '#ef4444';
		case 'planned':
			return 'white';
		default:
			return '';
	}
};
