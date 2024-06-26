import React from 'react';
import './App.css';
import { MostViewedArticles } from './components/MostViewedArticles';

interface IAppProps {

}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <div>
      <div>
          <MostViewedArticles/>
      </div>
    </div>
  );
}

export default App;
