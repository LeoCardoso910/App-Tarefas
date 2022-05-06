/**
 * @format
 */

import {AppRegistry} from 'react-native';
import routes from './src/navigation/routesDrawer';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => routes);
