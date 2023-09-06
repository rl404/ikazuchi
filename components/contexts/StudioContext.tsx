import { Genre } from "@/pages/api/genres/[id]";
import { createContext, useContext } from "react";

type ContextType = {
  queries: {
    name: string;
    sort: string;
    page: number;
    limit: number;
  };
  loading: boolean;
  error: string;
  data: Genre[];
  total: number;
  hasMore: boolean;
};

export const defaultCtx: ContextType = {
  queries: {
    name: "",
    sort: "NAME",
    page: 1,
    limit: 100,
  },
  loading: false,
  error: "",
  data: [],
  total: 0,
  hasMore: true,
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

export const reducer = (
  state: ContextType,
  action: DispatchContextAction
): ContextType => {
  return { ...state, [action.type]: action.value };
};
