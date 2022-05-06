import React from 'react';
import routes from './navigation/routesDrawer';
import routesStack from './navigation/routesStack';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return <routesStack />;
};

export default App;
