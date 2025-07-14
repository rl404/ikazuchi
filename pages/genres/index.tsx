import Head from '@/components/Head';
import { Context, DispatchContext, defaultCtx, reducer } from '@/components/contexts/GenreContext';
import List from '@/components/pages/genres/List';
import Search from '@/components/pages/genres/Search';
import Title from '@/components/pages/genres/Title';
import { GetServerSideProps } from 'next';
import { ReactNode, useReducer } from 'react';

export default function GenresPage({ name, sort }: { name: string; sort: string }) {
	return (
		<>
			<Head
				title="Genres"
				description="Search anime genre database with Bakemonogatari theme."
				image="/images/genres.jpg"
			/>
			<Browse name={name} sort={sort}>
				<div className="grid gap-4">
					<div>
						<Title />
					</div>
					<div>
						<Search />
					</div>
					<div>
						<List />
					</div>
				</div>
			</Browse>
		</>
	);
}

const Browse = ({ name, sort, children }: { name: string; sort: string; children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, {
		...defaultCtx,
		queries: {
			...defaultCtx.queries,
			name: name,
			sort: sort
		}
	});
	return (
		<Context.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
		</Context.Provider>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	return {
		props: {
			name: query.name || '',
			sort: query.sort || 'NAME'
		}
	};
};
