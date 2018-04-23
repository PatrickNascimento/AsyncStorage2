import Expo, { SQLite } from 'expo';
import React, { Component } from "react";
import {
  TouchableHighlight,
  Text,
  View,
  AsyncStorage,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import { Actions } from "react-native-router-flux";


var exlist = '';
const db = SQLite.openDatabase('db.db');

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      codigo: "",
      nome: "",
      email: "",
      comentario: ""
    };
  }

  dados(i){
    exlist = {i}
    Actions.busca();
  }

  parseData() {
    var row = [];
    db.transaction((tx) =>{
      tx.executeSql('SELECT codigo,nome,email,comentario FROM usuarios',[],(tx,results) => {
        var len = results.rows.length;
        if(len>0){
          var row = results.rows.item(0);
          this.setState({codigo: JSON.stringify(row.codigo)});
          this.setState({nome: row.nome});
          this.setState({email: row.email});
          this.setState({comentario: row.comentario});
          console.log(JSON.stringify(row));
        }
        return (
          <View style={styles.datalista}>
          <Text style={styles.textButton}>{this.state.codigo}</Text>
          <Text style={styles.textButton}>{this.state.nome}</Text>
          <Text style={styles.textButton}>{this.state.email}</Text>
          <Text style={styles.textButton}>{this.state.comentario}</Text>
          </View>
        );
      });
    });
  }


  render() {
    return (
      <View style={styles.container}>

      <ScrollView>
      {this.parseData()}
      </ScrollView>

      <TouchableHighlight
      style={styles.button}
      onPress={() => Actions.home()}
      >
      <Text style={styles.textButton}>Volta para Cadastro</Text>
      </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 50
  },
  button: {
    backgroundColor: "skyblue",
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 5,
    marginTop: 15
  },
  textButton: {
    textAlign: "left",
    fontSize: 18,
    color: "white"
  },
  datalista: {
    marginBottom: 5,
    padding: 20,
    marginTop: 5,
    height: 120,
    borderRadius: 10,
    backgroundColor: "#888888",

  }
});

export {exlist};
