import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
  Dra,
} from '@react-navigation/drawer';
import {Gravatar} from 'react-native-gravatar';
import {useNavigation} from '@react-navigation/native';
import commonStyles from '../commonStyles';
import Auth from './Auth';

const Menu = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <DrawerContentScrollView>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.header}>
          <Gravatar
            style={styles.avatar}
            options={{
              email: ,
              secure: true,
            }}
          />
          <View style={styles.useInfo}>
            <Text style={styles.name}>{navigation.getParent('email')}</Text>
            <Text style={styles.email}>{}</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  title: {
    color: '#000',
    fontFamily: commonStyles.fontFamily,
    fontSize: 30,
    paddingTop: 30,
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 30,
    margin: 10,
  },
  userInfo: {
    marginLeft: 10,
    flex: 1,
    backgroundColor: '#000',
  },
  name: {
    flex: 1,
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginBottom: 5,
    color: commonStyles.colors.mainText,
  },
  email: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 15,
    color: commonStyles.colors.subText,
  },
});

export default Menu;
