import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Auth from '../screens/Auth';
import TodayTasks from '../screens/TodayTasks';
import TomorrowTasks from '../screens/TomorrowTasks';
import WeekTasks from '../screens/WeekTasks';
import MonthTasks from '../screens/MonthTasks';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Menu from '../screens/Menu';
import commonStyles from '../commonStyles';
import {navigationRef} from '../screens/Auth';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Drawer.Navigator drawerContent={props => <Menu {...props} />}>
      <Drawer.Screen
        name="Today"
        component={TodayTasks}
        options={{
          headerShown: false,
          title: 'Hoje',
          drawerLabelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20,
          },
          drawerActiveTintColor: '#080',
        }}
      />
      <Drawer.Screen
        name="Tomorrow"
        component={TomorrowTasks}
        options={{
          headerShown: false,
          title: 'Amanhã',
          drawerContentStyle: Menu,
          drawerLabelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20,
          },
          drawerActiveTintColor: '#080',
        }}
      />
      <Drawer.Screen
        name="Week"
        component={WeekTasks}
        options={{
          headerShown: false,
          title: 'Semana',
          drawerContentStyle: Menu,
          drawerLabelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20,
          },
          drawerActiveTintColor: '#080',
        }}
      />
      <Drawer.Screen
        name="Month"
        component={MonthTasks}
        options={{
          headerShown: false,
          title: 'Mês',
          drawerContentStyle: Menu,
          drawerLabelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20,
          },
          drawerActiveTintColor: '#080',
        }}
      />
    </Drawer.Navigator>
  );
};

const routes = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default routes;

// const Today = () => {
//   return (
//     <View>
//       <Button
//         onPress={props => <TaskList title="Hoje" daysAhead={0} {...props} />}
//         title="Today"
//       />
//     </View>
//   );
// };
