/**
 * @format
 */

import { AppRegistry } from "react-native";
import routesStack from "./src/navigation/routesDrawer";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => routesStack);
