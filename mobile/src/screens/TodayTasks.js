import React from 'react';
import {Text, View} from 'react-native';
import TaskList from './TaskList';
const TodayTasks = props => {
  return <TaskList title="Hoje" daysAhead={0} {...props} />;
};
export default TodayTasks;
