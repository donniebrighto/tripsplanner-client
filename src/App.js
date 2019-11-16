import React from 'react';
import Menu from './components/navigation/MainMenu';
import { Routes } from './Routes';
import { mainRoutes } from './config/routes';

const App = () => (
  <div>
    <Menu />
    <Routes routes={mainRoutes} />
  </div>
);

export default App;
