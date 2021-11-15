import React from 'react';
import './App.css';

import Recorder from './components/Recorder';
import Calendar from './components/Calendar';

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <Recorder />
      <Calendar />
    </div>
  );
};
export default App;
