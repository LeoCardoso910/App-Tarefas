import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Gravatar } from "react-native-gravatar";
import { useNavigation } from "@react-navigation/native";
import commonStyles from "../commonStyles";
import { server, showError, showSucess } from "../common";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";

const Menu = ({ route, navigation }) => {
  const { name, email } = route.params;

  const logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    AsyncStorage.removeItem("userData");
    props.navigation.navigate("Auth");
  };

  return (
    <SafeAreaProvider>
      <DrawerContentScrollView>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.header}>
          <Gravatar
            style={styles.avatar}
            options={{
              email: email,
              secure: true,
            }}
          />
          <View style={styles.useInfo}>
            <Text style={styles.name}>{}</Text>
            <Text style={styles.email}>{}</Text>
          </View>
          <TouchableOpacity onPress={logout}>
            <View style={styles.logoutIcon}>
              <Icon name="sign-out" size={30} color="#800" />
            </View>
          </TouchableOpacity>
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
    borderColor: "#DDD",
  },
  title: {
    color: "#000",
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
    backgroundColor: "#000",
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
  logoutIcon: {
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default Menu;
