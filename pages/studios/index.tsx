import Head from "@/components/Head";
import {
  Context,
  DispatchContext,
  defaultCtx,
  reducer,
} from "@/components/contexts/StudioContext";
import List from "@/components/pages/studios/List";
import Search from "@/components/pages/studios/Search";
import Title from "@/components/pages/studios/Title";
import { GetServerSideProps } from "next";
import { ReactNode, useReducer } from "react";

export default function StudiosPage() {
  return (
    <>
      <Head
        title="Studios"
        description="Search anime studio database with Bakemonogatari theme."
        image="/images/studios.jpg"
      />
      <Browse>
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

const Browse = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, defaultCtx);
  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: { name: query.name || "" },
  };
};
