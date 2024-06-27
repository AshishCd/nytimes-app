import React from 'react';
import './App.css';
import { MostViewedArticles } from './components/MostViewedArticles';
import { Constants } from './constants';

interface IAppProps {

}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <div>
      <main className="max-w-screen-lg m-0 m-auto size-full h-screen p-6 lg:flex gap-8 flex-row items-start justify-between lg:p-12">
        <div className='flex-2'>
          <section className='max-w-3xl'>
            <MostViewedArticles heading={`Today's Most Popular Articles`} day={1} />
          </section>
        </div>
        <div className='flex-1'>
          <aside>
            <MostViewedArticles day={7} heading={"Past week"} type={Constants.SIDE_BAR} />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
