import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AuthInput from "../components/AuthInput";
import backgroundImage from "../../assets/imgs/login.jpg";
import commonStyles from "../commonStyles";
import { server, showError, showSucess } from "../common";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Auth({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stageNew, setStageNew] = useState(false);

  const signinOrSignup = () => {
    if (stageNew) {
      signup();
    } else {
      signin();
    }
  };

  const signup = async () => {
    try {
      await axios.post(`${server}/signup`, {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      showSucess("Usuário Cadastrado!");
      setStageNew(false);
    } catch (e) {
      showError(e);
    }
  };

  const signin = async () => {
    try {
      const res = await axios.post(`${server}/signin`, {
        email: email,
        password: password,
      });
      AsyncStorage.setItem("userData", JSON.stringify(res.data));
      axios.defaults.headers.common[
        "Authorization"
      ] = `bearer ${res.data.token}`;
      navigation.navigate("Home", {
        screen: "Today",
        params: { name: res.data.name, email: res.data.email },
      });
    } catch (e) {
      console.log(e);
      showError(e);
    }
  };

  const validations = [];
  validations.push(email && email.includes("@"));
  validations.push(password && password.length >= 6);

  if (stageNew) {
    validations.push(name && name.trim().length >= 3);
    validations.push(confirmPassword);
    validations.push(password === confirmPassword);
  }

  const validForm = validations.reduce((t, a) => t && a);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <Text style={styles.title}>Tasks</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>
          {stageNew ? "Crie a sua conta" : "Informe seus dados"}
        </Text>
        {stageNew && (
          <AuthInput
            icon="user"
            placeholder="Nome"
            value={name}
            style={styles.input}
            onChangeText={(confirm) => setName(confirm)}
          />
        )}
        <AuthInput
          icon="at"
          placeholder="E-mail"
          value={email}
          style={styles.input}
          onChangeText={(confirm) => setEmail(confirm)}
        />
        <AuthInput
          icon="lock"
          placeholder="Senha"
          value={password}
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(confirm) => setPassword(confirm)}
        />
        {stageNew && (
          <AuthInput
            icon="asterisk"
            placeholder="Confirmação de Senha"
            value={confirmPassword}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(confirm) => setConfirmPassword(confirm)}
          />
        )}
        <TouchableOpacity onPress={signinOrSignup} disabled={!validForm}>
          <View style={validForm ? styles.button : styles.buttonValidForm}>
            <Text style={styles.buttonText}>
              {stageNew ? "Registrar" : "Entrar"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => setStageNew(!stageNew)}
      >
        <Text style={styles.buttonText}>
          {stageNew ? "Já possui conta?" : "Ainda não possui conta?"}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
    width: "90%",
  },
  input: {
    backgroundColor: "#FFF",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#080",
    marginTop: 10,
    padding: 10,
    alignItems: "center",
  },
  buttonValidForm: {
    backgroundColor: "#AAA",
    marginTop: 10,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: "#FFF",
    fontSize: 20,
  },
});

export default Auth;
