import { useCtx, useDispatchCtx } from '@/components/contexts/StudioContext';
import SearchIcon from '@/components/icons/SearchIcon';
import TextInput from '@/components/inputs/TextInput';
import { inViewVariants } from '@/components/transitions/variants';
import { motion } from 'framer-motion';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Search() {
	const ctx = useCtx();
	const dispatch = useDispatchCtx();

	const [query, setQuery] = useState(ctx.queries);

	const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery({ ...query, name: e.target.value });
	};

	const onSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setQuery({ ...query, sort: e.target.value });
	};

	useEffect(() => {
		const searchDelay = setTimeout(() => {
			if (query.name.trim() === ctx.queries.name && query.sort === ctx.queries.sort) return;
			dispatch({ type: 'data', value: [] });
			dispatch({
				type: 'queries',
				value: {
					...ctx.queries,
					name: query.name.trim(),
					sort: query.sort,
					page: 1
				}
			});
		}, 500);
		return () => clearTimeout(searchDelay);
	}, [query]);

	return (
		<motion.div
			className="grid gap-4"
			variants={inViewVariants}
			initial="initialOpacity"
			whileInView="animate"
		>
			<div className="relative">
				<SearchIcon className="pointer-events-none absolute h-full p-2.5 text-neutral-400" />
				<TextInput
					value={query.name}
					placeholder="studio name..."
					onChange={onNameChange}
					className="w-full pl-8"
				/>
			</div>
			<div className="flex items-center justify-between gap-2">
				<div className="text-secondary pointer-events-none text-right text-xs font-bold">
					{!ctx.loading && <>Found: {ctx.total.toLocaleString()} studios</>}
				</div>
				<div className="text-secondary flex items-start gap-2 text-xs font-bold">
					<label>Sort by</label>
					<select
						value={query.sort}
						onChange={onSortChange}
						className="appearance-none bg-transparent"
					>
						<option value="NAME">Name</option>
						<option value="-COUNT">Count</option>
						<option value="-MEAN">Score</option>
						<option value="-MEMBER">Member</option>
					</select>
				</div>
			</div>
		</motion.div>
	);
}
