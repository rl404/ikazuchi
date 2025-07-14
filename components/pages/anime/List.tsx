import { useCtx, useDispatchCtx } from '@/components/contexts/AnimeContext';
import SpinnerIcon from '@/components/icons/SpinnerIcon';
import AnimeCover from '@/components/layouts/AnimeCover';
import { getAxiosError } from '@/libs/utils';
import { Anime } from '@/pages/api/anime/[id]';
import axios from 'axios';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function List() {
	const ctx = useCtx();
	const dispatch = useDispatchCtx();

	const onSearch = () => {
		dispatch({ type: 'loading', value: true });
		dispatch({ type: 'error', value: '' });

		const queries = Object.entries(ctx.queries)
			.map((q: any) => `${q[0]}=${q[1]}`)
			.join('&');

		axios
			.get(`/api/anime?${queries}`)
			.then((resp) => {
				dispatch({
					type: 'data',
					value: [
						...ctx.data,
						...resp.data.data.filter((d: Anime) => !ctx.data.find((dd) => dd.id === d.id))
					]
				});
				dispatch({ type: 'hasMore', value: resp.data.data.length > 0 });
				dispatch({ type: 'total', value: resp.data.meta.total });
			})
			.catch((err) => dispatch({ type: 'error', value: getAxiosError(err) }))
			.finally(() => dispatch({ type: 'loading', value: false }));
	};

	const onLoadMore = () => {
		dispatch({
			type: 'queries',
			value: { ...ctx.queries, page: ctx.queries.page + 1 }
		});
	};

	useEffect(() => {
		onSearch();
	}, [ctx.queries]);

	return (
		<div className="grid gap-4">
			<InfiniteScroll
				className="grid grid-cols-4 gap-4 overflow-visible md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8"
				dataLength={ctx.data.length}
				next={onLoadMore}
				hasMore={ctx.hasMore}
				scrollableTarget="ikazuchi-content"
				loader={null}
				style={{ overflow: 'visible' }}
			>
				{ctx.data.map((d) => (
					<AnimeCover key={d.id} anime={d} />
				))}
			</InfiniteScroll>

			{ctx.loading && (
				<div className="flex h-full items-center justify-center">
					<SpinnerIcon className="fill-primary h-8 w-8 animate-spin text-neutral-600" />
				</div>
			)}

			{ctx.error !== '' && <div className="text-center text-red-500">{ctx.error}</div>}
		</div>
	);
}
