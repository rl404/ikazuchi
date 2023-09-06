import { useCtx, useDispatchCtx } from "@/components/contexts/StudioContext";
import SearchIcon from "@/components/icons/SearchIcon";
import TextInput from "@/components/inputs/TextInput";
import { inViewVariants } from "@/components/transitions/variants";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function Search() {
  const ctx = useCtx();
  const dispatch = useDispatchCtx();
  const params = useSearchParams();

  const [name, setName] = useState("");
  const [sort, setSort] = useState("NAME");

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    const searchDelay = setTimeout(() => {
      if (name.trim() === ctx.queries.name && sort === ctx.queries.sort) return;
      dispatch({ type: "data", value: [] });
      dispatch({
        type: "queries",
        value: {
          ...ctx.queries,
          name: name.trim(),
          sort: sort,
          page: 1,
        },
      });
    }, 500);
    return () => clearTimeout(searchDelay);
  }, [name, sort]);

  useEffect(() => {
    const name = params.get("name");
    const sort = params.get("sort");
    if (name && name !== "") setName(name);
    if (sort && sort !== "") setSort(sort);
  }, []);

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
          value={name}
          placeholder="studio name..."
          onChange={onNameChange}
          className="w-full pl-8"
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="pointer-events-none text-right text-xs font-bold text-secondary">
          {!ctx.loading && <>Found: {ctx.total.toLocaleString()} studios</>}
        </div>
        <div className="flex items-start gap-2 text-xs font-bold text-secondary">
          <label>Sort by</label>
          <select
            value={sort}
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
