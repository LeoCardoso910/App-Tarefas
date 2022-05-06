import React from 'react';
import {Text, View} from 'react-native';
import TaskList from './TaskList';
const TomorrowTasks = props => {
  return <TaskList title="Amanhã" daysAhead={1} {...props} />;
};
export default TomorrowTasks;
