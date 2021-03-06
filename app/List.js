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
      row: []
    };
  }

  componentDidMount() {
    this.parseData();
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
        console.log(len);
        if(len>0){
          var row = results.rows._array;
          console.log(row);
          this.setState({row});
        }
      });
    });
  }

  renderListItems = () => this.state.row.map((item) => (
    <TouchableHighlight
      onPress={() => this.dados(item.codigo)}
      >
      <View style={styles.datalista}>
        <Text style={styles.textButton}key={item.codigo}>{item.codigo}</Text>
        <Text style={styles.textButton}key={item.codigo}>{item.nome}</Text>
        <Text style={styles.textButton}key={item.codigo}>{item.email}</Text>
        <Text style={styles.textButton}key={item.codigo}>{item.comentario}</Text>
      </View>
    </TouchableHighlight>
  )
);

render() {
  return (
    <View style={styles.container}>

      <ScrollView>
        {this.state.row.length >= 1 ? this.renderListItems() : null }
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
    height: 150,
    borderRadius: 10,
    backgroundColor: "#888888",
  }
});

export {exlist};
