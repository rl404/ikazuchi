// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type Data = {
  status: number;
  message: string;
  data: Genre;
};

export type Genre = {
  id: number;
  name: string;
  count: number;
  mean: number;
  member: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const resp = await fetch(
    `${process.env.API_HOST_AKATSUKI}/genres/${req.query.id}`,
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
