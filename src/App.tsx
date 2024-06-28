import React from "react";
import "./App.css";
import { MostViewedArticles } from "./components/MostViewedArticles";
import { Constants } from "./constants";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <div>
      <main className="max-w-screen-lg m-0 m-auto size-full h-screen p-6 lg:flex gap-8 flex-row items-start justify-between lg:p-12">
        <div className="flex-2">
          <section className="max-w-3xl">
            <h1
              data-testid="cypress-main-header"
              className="text-lg text-center lg:text-4xl mb-5 border-b-2 pb-1 lg:border-none lg:text-left font-bold"
            >
              {"Today's Most Popular Articles"}
            </h1>
            <MostViewedArticles day={1} />
          </section>
        </div>
        <div className="flex-1">
          <aside>
            <h2
              data-testid="cypress-sidebar-header"
              className="text-lg text-center lg:text-4xl mb-5 border-b-2 pb-1 lg:border-none lg:text-left font-bold"
            >
              {"Past Week"}
            </h2>
            <MostViewedArticles day={7} type={Constants.SIDE_BAR} />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default App;
