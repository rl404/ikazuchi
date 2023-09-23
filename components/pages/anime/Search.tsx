import IconButton from "@/components/buttons/IconButton";
import { useCtx, useDispatchCtx } from "@/components/contexts/GenreContext";
import ConfigIcon from "@/components/icons/ConfigIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import Select from "@/components/inputs/Select";
import TextInput from "@/components/inputs/TextInput";
import { inViewVariants } from "@/components/transitions/variants";
import {
  AnimeStatus,
  AnimeStatusToStr,
  AnimeType,
  AnimeTypeToStr,
  Season,
  SeasonToStr,
  Sort,
} from "@/libs/constant";
import { Genre } from "@/pages/api/genres/[id]";
import { Studio } from "@/pages/api/studios/[id]";
import axios from "axios";
import { Variants, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const variants: Variants = {
  open: { marginTop: 16, opacity: 1, height: "auto" },
  closed: { marginTop: 0, opacity: 0, height: 0 },
};

export default function Search() {
  const ctx = useCtx();
  const dispatch = useDispatchCtx();
  const params = useSearchParams();

  const [show, setShow] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [studios, setStudios] = useState<Studio[]>([]);
  const [queries, setQueries] = useState({
    title: "",
    nsfw: "false",
    type: "",
    status: "",
    season: "",
    seasonYear: "",
    startMean: "",
    endMean: "",
    genreID: "",
    studioID: "",
    sort: Sort.popularityAsc,
  });

  const toggleShow = () => setShow(!show);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQueries({ ...queries, title: e.target.value });
  };

  const onTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQueries({ ...queries, type: e.target.value });
  };

  const onStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQueries({ ...queries, status: e.target.value });
  };

  const onSeasonChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQueries({ ...queries, season: e.target.value });
  };

  const onSeasonYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQueries({ ...queries, seasonYear: e.target.value });
  };

  const onStartMeanChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQueries({ ...queries, startMean: e.target.value });
  };

  const onEndMeanChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQueries({ ...queries, endMean: e.target.value });
  };

  const onGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQueries({ ...queries, genreID: e.target.value });
  };

  const onStudioChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQueries({ ...queries, studioID: e.target.value });
  };

  const onNSFWChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQueries({ ...queries, nsfw: e.target.value });
  };

  const onSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQueries({ ...queries, sort: e.target.value });
  };

  useEffect(() => {
    const searchDelay = setTimeout(() => {
      dispatch({ type: "data", value: [] });
      dispatch({
        type: "queries",
        value: {
          ...ctx.queries,
          title: queries.title.trim(),
          nsfw: queries.nsfw,
          type: queries.type,
          status: queries.status,
          season: queries.season,
          season_year: queries.seasonYear,
          start_mean: queries.startMean,
          end_mean: queries.endMean,
          genre_id: queries.genreID,
          studio_id: queries.studioID,
          sort: queries.sort,
          page: 1,
        },
      });
    }, 500);
    return () => clearTimeout(searchDelay);
  }, [queries]);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(`/api/genres?limit=-1`, {
        signal: controller.signal,
      })
      .then((resp) => setGenres(resp.data.data));

    axios
      .get(`/api/studios?limit=-1`, {
        signal: controller.signal,
      })
      .then((resp) => setStudios(resp.data.data));

    setQueries({
      ...queries,
      title: params.get("title") || "",
      nsfw: params.get("nsfw") || "false",
      type: params.get("type") || "",
      status: params.get("status") || "",
      season: params.get("season") || "",
      seasonYear: params.get("season_year") || "",
      startMean: params.get("start_mean") || "",
      endMean: params.get("end_mean") || "",
      genreID: params.get("genre_id") || "",
      studioID: params.get("studio_id") || "",
      sort: params.get("sort") || Sort.popularityAsc,
    });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="grid">
      <motion.div
        className="flex items-center justify-between gap-2"
        variants={inViewVariants}
        initial="initialOpacity"
        whileInView="animate"
      >
        <div className="relative grow">
          <SearchIcon className="pointer-events-none absolute h-full p-2.5 text-neutral-400" />
          <TextInput
            value={queries.title}
            placeholder="anime title..."
            onChange={onTitleChange}
            className="w-full pl-8"
          />
        </div>
        <div>
          <IconButton title="advanced search" onClick={toggleShow}>
            <ConfigIcon className="h-6 w-6" />
          </IconButton>
        </div>
      </motion.div>

      <motion.div
        className="z-10 grid grid-cols-2 gap-2 overflow-hidden md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        initial="closed"
        animate={show ? "open" : "closed"}
        variants={variants}
      >
        <div className="grid">
          <label className="font-bold">Type</label>
          <Select
            className="w-full"
            options={[
              { label: "Any", value: "", selected: queries.type === "" },
              ...Object.values(AnimeType).map((s) => ({
                label: AnimeTypeToStr(s),
                value: s,
                selected: queries.type === s,
              })),
            ]}
            onChange={onTypeChange}
          />
        </div>

        <div className="grid">
          <label className="font-bold">Status</label>
          <Select
            className="w-full"
            options={[
              { label: "Any", value: "", selected: queries.status === "" },
              ...Object.values(AnimeStatus).map((s) => ({
                label: AnimeStatusToStr(s),
                value: s,
                selected: queries.status === s,
              })),
            ]}
            onChange={onStatusChange}
          />
        </div>

        <div className="grid">
          <label className="font-bold">Season</label>
          <Select
            className="w-full"
            options={[
              { label: "Any", value: "", selected: queries.season === "" },
              ...Object.values(Season).map((s) => ({
                label: SeasonToStr(s),
                value: s,
                selected: queries.season === s,
              })),
            ]}
            onChange={onSeasonChange}
          />
        </div>

        <div className="grid">
          <label className="font-bold">Season Year</label>
          <TextInput
            placeholder="Any"
            value={queries.seasonYear}
            onChange={onSeasonYearChange}
            numberOnly={true}
          />
        </div>

        <div className="grid">
          <label className="font-bold">Score</label>
          <div className="flex items-center gap-1">
            <Select
              className="grow"
              options={[
                { label: "Any", value: "", selected: queries.startMean === "" },
                ...Array(11)
                  .fill(0)
                  .map((v, i) => ({
                    label: i.toString(),
                    value: i.toString(),
                    selected: queries.startMean === i.toString(),
                  })),
              ]}
              onChange={onStartMeanChange}
            />
            <span> — </span>
            <Select
              className="grow"
              options={[
                { label: "Any", value: "", selected: queries.endMean === "" },
                ...Array(11)
                  .fill(0)
                  .map((v, i) => ({
                    label: i.toString(),
                    value: i.toString(),
                    selected: queries.endMean === i.toString(),
                  })),
              ]}
              onChange={onEndMeanChange}
            />
          </div>
        </div>

        <div className="grid">
          <label className="font-bold">Genre</label>
          <Select
            className="w-full"
            options={[
              { label: "Any", value: "", selected: queries.genreID === "" },
              ...genres.map((g) => ({
                label: g.name,
                value: g.id.toString(),
                selected: queries.genreID === g.id.toString(),
              })),
            ]}
            onChange={onGenreChange}
          />
        </div>

        <div className="grid">
          <label className="font-bold">Studio</label>
          <Select
            className="w-full"
            options={[
              { label: "Any", value: "", selected: queries.studioID === "" },
              ...studios.map((s) => ({
                label: s.name,
                value: s.id.toString(),
                selected: queries.studioID === s.id.toString(),
              })),
            ]}
            onChange={onStudioChange}
          />
        </div>

        <div className="grid">
          <label className="font-bold">NSFW</label>
          <Select
            className="w-full"
            options={[
              {
                label: "Hide",
                value: "false",
                selected: queries.nsfw === "false",
              },
              {
                label: "Show",
                value: "",
                selected: queries.nsfw === "",
              },
            ]}
            onChange={onNSFWChange}
          />
        </div>
      </motion.div>

      <motion.div
        className="mt-4 flex items-center justify-between gap-2"
        variants={inViewVariants}
        initial="initialOpacity"
        whileInView="animate"
      >
        <div className="pointer-events-none text-right text-xs font-bold text-secondary">
          {!ctx.loading && <>Found: {ctx.total.toLocaleString()} anime</>}
        </div>
        <div className="flex items-start gap-2 text-xs font-bold text-secondary">
          <label>Sort by</label>
          <select
            value={queries.sort}
            onChange={onSortChange}
            className="appearance-none bg-transparent"
          >
            <option value={Sort.popularityAsc}>Popularity</option>
            <option value={Sort.meanDesc}>Score</option>
            <option value={Sort.titleAsc}>Title</option>
            <option value={Sort.startDateAsc}>Oldest</option>
            <option value={Sort.startDateDesc}>Newest</option>
          </select>
        </div>
      </motion.div>
    </div>
  );
}
