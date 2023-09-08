// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Anime } from "./[id]";
import type { NextApiRequest, NextApiResponse } from "next";

export type Data = {
  status: number;
  message: string;
  data: Anime[];
  meta: Meta;
};

type Meta = {
  page: number;
  limit: number;
  total: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const queries = [
    "title",
    "nsfw",
    "type",
    "status",
    "season",
    "season_year",
    "start_mean",
    "end_mean",
    "genre_id",
    "studio_id",
    "sort",
    "page",
    "limit",
  ]
    .map((q) => `${q}=${req.query[q] ?? ""}`)
    .join("&");

  const resp = await fetch(
    `${process.env.API_HOST_AKATSUKI}/anime?${queries}`,
    {
      method: req.method,
    },
  );

  const data = await resp.json();
  res
    .status(resp.status)
    .setHeader(
      "cache-control",
      "max-age=3600, s-maxage=86400, stale-while-revalidate=3600",
    )
    .json(data);
}
