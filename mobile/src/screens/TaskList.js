/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useMemo, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import todayImage from '../../assets/imgs/today.jpg';
import tomorrowImage from '../../assets/imgs/tomorrow.jpg';
import weekImage from '../../assets/imgs/week.jpg';
import monthImage from '../../assets/imgs/month.jpg';

import commonStyles from '../commonStyles';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import Task from '../components/Task';
import AddTasks from './AddTasks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server, showError} from '../common';

const TaskList = props => {
  const [taskList, setTaskList] = useState([]);
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [showDoneTask, setShowDoneTask] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const navigation = useNavigation();

  const toggleFilter = () => {
    const isShow = !showDoneTask;

    setShowDoneTask(isShow);
    filterTask(isShow);
  };

  const filterTask = async (isShow = true, taskListToFilter = null) => {
    let newListVisibleTasks = taskListToFilter
      ? [...taskListToFilter]
      : [...taskList];

    if (!isShow) {
      const filterTaskNotDone = task => task.doneAt === null;
      newListVisibleTasks = newListVisibleTasks.filter(filterTaskNotDone);
    }
    setVisibleTasks(newListVisibleTasks);
    await AsyncStorage.setItem(
      'showDoneTask',
      JSON.stringify({
        showDoneTask: showDoneTask,
      }),
    );
  };

  const toggleTask = async taskId => {
    try {
      await axios.put(`${server}/tasks/${taskId}/toggle`);
      loadTasks();
    } catch (e) {
      showError(e);
    }
  };

  const addTask = async newTask => {
    if (!newTask.describe || !newTask.describe.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição não informada!');
      return;
    }
    try {
      await axios.post(`${server}/tasks`, {
        desc: newTask.describe,
        estimateAt: newTask.date,
      });
      setShowAddTask(false);
      loadTasks();
      cancelAddTask();
    } catch (e) {
      showError(e);
    }
  };

  const cancelAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  const today = useMemo(
    () => dayjs().locale('pt-br').format('ddd, D [de] MMMM'),
    [],
  );
  const deleteTask = async taskId => {
    try {
      await axios.delete(`${server}/tasks/${taskId}`);
      loadTasks();
    } catch (e) {
      showError(e);
    }
  };
  const loadTasks = async () => {
    try {
      const maxDate = dayjs()
        .add(props.daysAhead, 'day')
        .format('YYYY-MM-DD 23:59:59');
      const res = await axios.get(`${server}/tasks?date=${maxDate}`);
      setTaskList(res.data);
      filterTask(showDoneTask, res.data);
    } catch (e) {
      console.log(e);
      showError(e);
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      const data = await AsyncStorage.getItem('showDoneTask');
      const newData = JSON.parse(data);
      setShowDoneTask(newData);
      filterTask(newData);
      loadTasks();
    };
    bootstrap();
  }, []);

  const getImage = () => {
    switch (props.daysAhead) {
      case 0:
        return todayImage;
      case 1:
        return tomorrowImage;
      case 7:
        return weekImage;
      default:
        return monthImage;
    }
  };
  const getColorButton = () => {
    switch (props.daysAhead) {
      case 0:
        return commonStyles.colors.today;
      case 1:
        return commonStyles.colors.tomorrow;
      case 7:
        return commonStyles.colors.week;
      default:
        return commonStyles.colors.month;
    }
  };

  return (
    <View style={styles.container}>
      <AddTasks
        isVisible={showAddTask}
        onCancel={cancelAddTask}
        onSave={addTask}
      />
      <ImageBackground source={getImage()} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="bars" size={20} color={commonStyles.colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFilter}>
            <Icon
              name={showDoneTask ? 'eye' : 'eye-slash'}
              size={20}
              color={commonStyles.colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>

      <View style={styles.taskList}>
        <FlatList
          data={visibleTasks}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <Task {...item} toggleTask={toggleTask} onDelete={deleteTask} />
          )}
        />
      </View>

      <TouchableOpacity
        style={[styles.addButton, {backgroundColor: getColorButton()}]}
        activeOpacity={0.7}
        onPress={() => setShowAddTask(!showAddTask)}>
        <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 30 : 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskList;
