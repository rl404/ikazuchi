// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	status: number;
	message: string;
	data: AnimeHistory[];
};

export type AnimeHistory = {
	year: number;
	month: number;
	week: number;
	mean: number;
	rank: number;
	popularity: number;
	member: number;
	voter: number;
	user_watching: number;
	user_completed: number;
	user_on_hold: number;
	user_dropped: number;
	user_planned: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const queries = ['start_date', 'end_date', 'group']
		.map((q) => `${q}=${req.query[q] ?? ''}`)
		.join('&');

	const resp = await fetch(
		`${process.env.API_HOST_AKATSUKI}/anime/${req.query.id}/history?${queries}`,
		{
			method: req.method
		}
	);

	const data = await resp.json();
	res
		.status(resp.status)
		.setHeader('cache-control', 'max-age=3600, s-maxage=86400, stale-while-revalidate=3600')
		.json(data);
}
