import { useCtx, useDispatchCtx } from "@/components/contexts/GenreContext";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { compactInt, getAxiosError } from "@/libs/utils";
import { Genre } from "@/pages/api/genres/[id]";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function List() {
  const ctx = useCtx();
  const dispatch = useDispatchCtx();

  const onSearch = () => {
    dispatch({ type: "loading", value: true });
    dispatch({ type: "error", value: "" });

    const queries = Object.entries(ctx.queries)
      .map((q: any) => `${q[0]}=${q[1]}`)
      .join("&");

    axios
      .get(`/api/genres?${queries}`)
      .then((resp) => {
        dispatch({
          type: "data",
          value: [
            ...ctx.data,
            ...resp.data.data.filter(
              (d: Genre) => !ctx.data.find((dd) => dd.id === d.id),
            ),
          ],
        });
        dispatch({ type: "hasMore", value: resp.data.data.length > 0 });
        dispatch({ type: "total", value: resp.data.meta.total });
      })
      .catch((err) => dispatch({ type: "error", value: getAxiosError(err) }))
      .finally(() => dispatch({ type: "loading", value: false }));
  };

  const onLoadMore = () => {
    dispatch({
      type: "queries",
      value: { ...ctx.queries, page: ctx.queries.page + 1 },
    });
  };

  useEffect(() => {
    onSearch();
  }, [ctx.queries]);

  return (
    <div className="grid gap-4">
      <InfiniteScroll
        className="grid grid-cols-2 gap-4 overflow-visible md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        dataLength={ctx.data.length}
        next={onLoadMore}
        hasMore={ctx.hasMore}
        scrollableTarget="ikazuchi-content"
        loader={null}
        style={{ overflow: "visible" }}
      >
        {ctx.data.map((d) => (
          <Link
            key={d.id}
            title={d.name}
            className="flex flex-nowrap items-center justify-between gap-1 rounded border border-neutral-800 p-2 font-bold hover:border-primary hover:opacity-100"
            href={`/genres/${d.id}/${d.name}`}
          >
            <span className="line-clamp-1">{d.name}</span>
            <span className="font-normal text-secondary">
              {ctx.queries.sort === "-COUNT"
                ? d.count.toLocaleString()
                : ctx.queries.sort === "-MEAN"
                  ? d.mean.toFixed(2)
                  : ctx.queries.sort === "-MEMBER"
                    ? compactInt(d.member)
                    : ""}
            </span>
          </Link>
        ))}
      </InfiniteScroll>

      {ctx.loading && (
        <div className="flex h-full items-center justify-center">
          <SpinnerIcon className="h-8 w-8 animate-spin fill-primary text-neutral-600" />
        </div>
      )}

      {ctx.error !== "" && (
        <div className="text-center text-red-500">{ctx.error}</div>
      )}
    </div>
  );
}
