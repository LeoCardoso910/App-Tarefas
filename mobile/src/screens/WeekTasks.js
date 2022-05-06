import React from 'react';
import {Text, View} from 'react-native';
import TaskList from './TaskList';
const WeekTasks = props => {
  return <TaskList title="Semana" daysAhead={7} {...props} />;
};
export default WeekTasks;
