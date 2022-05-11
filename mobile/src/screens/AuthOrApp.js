import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AuthOrApp = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const setAuth = async () => {
      const userDataJson = await AsyncStorage.getItem("userData");
      let userData = null;

      try {
        userData = JSON.parse(userDataJson);
      } catch (e) {
        console.log(e);
      }
      if (userData && userData.token) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `bearer ${userData.token}`;
        navigation.navigate("Home", userData);
      } else {
        navigation.navigate("Auth");
      }
    };
    setAuth();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthOrApp;
