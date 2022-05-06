import React from 'react';
import {Text, View} from 'react-native';
import TaskList from './TaskList';
const MonthTasks = props => {
  return <TaskList title="Mês" daysAhead={30} {...props} />;
};
export default MonthTasks;
