import { Sort } from '@/libs/constant';
import { Anime } from '@/pages/api/anime/[id]';
import { createContext, useContext } from 'react';

type ContextType = {
	queries: {
		title: string;
		nsfw: string;
		type: string;
		status: string;
		season: string;
		season_year: string;
		start_mean: string;
		end_mean: string;
		genre_id: string;
		studio_id: string;
		sort: string;
		page: number;
		limit: number;
	};
	loading: boolean;
	error: string;
	data: Anime[];
	total: number;
	hasMore: boolean;
};

export const defaultCtx: ContextType = {
	queries: {
		title: '',
		nsfw: 'false',
		type: '',
		status: '',
		season: '',
		season_year: '',
		start_mean: '',
		end_mean: '',
		genre_id: '',
		studio_id: '',
		sort: Sort.popularityAsc,
		page: 1,
		limit: 20
	},
	loading: false,
	error: '',
	data: [],
	total: 0,
	hasMore: true
};

type DispatchContextAction = {
	type: keyof typeof defaultCtx;
	value: any;
};

type DispatchContextType = (action: DispatchContextAction) => void;

export const Context = createContext<ContextType>(defaultCtx);
export const DispatchContext = createContext<DispatchContextType>(() => {});

export const useCtx = () => useContext(Context);
export const useDispatchCtx = () => useContext(DispatchContext);

export const reducer = (state: ContextType, action: DispatchContextAction): ContextType => {
	return { ...state, [action.type]: action.value };
};
