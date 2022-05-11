import { Alert, Platform } from "react-native";

const server = "http://192.168.1.3:3000";

const showError = (err) => {
  Alert.alert("Ops! Ocorreu um Problema!", `Mensagem: ${err}`);
};

const showSucess = (msg) => {
  Alert.alert("Sucesso!", msg);
};

export { server, showError, showSucess };
