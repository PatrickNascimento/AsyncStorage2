import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  AsyncStorage
} from "react-native";

import { Actions } from "react-native-router-flux";

export default class app extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: "",
      email: "",
      comentario: ""
    };
  }
  changeNome(nome) {
    this.setState({ nome });
  }
  changeEmail(email) {
    this.setState({ email });
  }
  changeComentario(comentario) {
    this.setState({ comentario });
  }

  buttonPressed() {
    const arrayData = [];
    if (this.state.comentario && this.state.nome && this.state.email) {
      const data = {
        nome: this.state.nome,
        email: this.state.email,
        comentario: this.state.comentario
      };
      arrayData.push(data);

      try {
        AsyncStorage.getItem("database_form").then(value => {
          if (value !== null) {
            const d = JSON.parse(value);
            d.push(data);
            AsyncStorage.setItem("database_form", JSON.stringify(d));
            Alert.alert("Aviso", "Novo registro inserido!");
          } else {
            AsyncStorage.setItem("database_form", JSON.stringify(arrayData));
            Alert.alert("Aviso", "Dados Inseridos com sucesso!");
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert("Aviso", "Você precisa preencher todos os campos");
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>AsyncStorage ReactNative</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={this.state.nome}
            onChangeText={nome => this.changeNome(nome)}
          />
          <TextInput
            style={styles.input}
            placeholder="email"
            value={this.state.email}
            onChangeText={email => this.changeEmail(email)}
          />
          <TextInput
            multiline={true}
            style={(styles.input, styles.textArea)}
            placeholder="comentario"
            value={this.state.comentario}
            onChangeText={comentario => this.changeComentario(comentario)}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.buttonPressed()}
          >
            <Text style={styles.textButton}>Enviar</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            onPress={() => Actions.list()}
          >
          <Text style={styles.textButton}>Exibir Dados</Text>
          </TouchableHighlight>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 30
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    fontSize: 14,
    borderWidth: 2,
    marginBottom: 20
  },
  textArea: {
    height: 60
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 5
  },
  button: {
    backgroundColor: "skyblue",
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom:5
  },
  textButton: {
    textAlign: "center",
    fontSize: 18,
    color: "white"
  }
});
