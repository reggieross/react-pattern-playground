import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { HomePage } from './business-components/pages/Home';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
