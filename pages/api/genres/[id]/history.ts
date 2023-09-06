// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: number;
  message: string;
  data: GenreHistory[];
};

export type GenreHistory = {
  year: number;
  month: number;
  mean: number;
  rank: number;
  popularity: number;
  member: number;
  voter: number;
  count: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const queries = ["start_year", "end_year", "group"]
    .map((q) => `${q}=${req.query[q] ?? ""}`)
    .join("&");

  const resp = await fetch(
    `${process.env.API_HOST_AKATSUKI}/genres/${req.query.id}/history?${queries}`,
    {
      method: req.method,
    }
  );

  const data = await resp.json();
  res
    .status(resp.status)
    .setHeader(
      "cache-control",
      "max-age=3600, s-maxage=86400, stale-while-revalidate=3600"
    )
    .json(data);
}
