import React, {useState} from 'react';
import {
  Platform,
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import commonStyles from '../commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

const AddTasks = props => {
  const [desc, setDesc] = useState('');
  const [dateTask, setDateTask] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dateString = dayjs(dateTask).format('ddd, D [de] MMMM [de] YYYY');

  const save = () => {
    const newTask = {
      describe: desc,
      date: dateTask,
    };
    props.onSave && props.onSave(newTask);
    setDateTask(new Date());
    setDesc('');
  };

  const getDateTask = () => {
    let datePicker = (
      <DateTimePicker
        value={dateTask}
        onChange={(_, propsDate) => {
          setDateTask(propsDate);
          setShowDatePicker(false);
        }}
        mode="date"
      />
    );

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => {
              setShowDatePicker(true);
            }}>
            <Text style={styles.dateT}>{dateString}</Text>
          </TouchableOpacity>
          {showDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  return (
    <Modal
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.onCancel}
      animationType="slide">
      <TouchableOpacity onPress={props.onCancel} style={{flex: 1}}>
        <View style={styles.overlay}></View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.header}>Nova Tarefa!</Text>
        <TextInput
          style={styles.input}
          onChangeText={newDesc => setDesc(newDesc)}
          placeholder="Informe a descrição..."
          value={desc}
        />
        {getDateTask()}
        <View style={styles.buttons}>
          <TouchableOpacity onPress={props.onCancel}>
            <Text style={styles.button}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={save}>
            <Text style={styles.button}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={props.onCancel} style={{flex: 1}}>
        <View style={styles.overlay}></View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    backgroundColor: '#fff',
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
  },
  buttons: {flexDirection: 'row', justifyContent: 'flex-end'},
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today,
  },
  input: {
    fontFamily: commonStyles.fontFamily,

    height: 40,
    margin: 15,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 6,
  },
  dateT: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
  },
});

export default AddTasks;
