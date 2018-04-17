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
import {exlist} from "./List";

export default class Busca extends Component {
  constructor() {
    super();
    this.state = {
      list: ""
    };

    try {
      AsyncStorage.getItem("database_form").then(value => {
        this.setState({
          list: JSON.parse(value)  
        });

      });
    } catch (err) {
      console.log(err);
    }

  }       
   
 parseData() {
  var filtro = exlist.i;
    if(typeof filtro === 'undefined'){filtro = null};      
    if(this.state.list) {      
        return this.state.list.filter((data) => data.codigo === filtro);
    } else {
        return [];
    }
  
}

  render() {
    const list = this.parseData();
    return (
      <View style={styles.container}>      
     <ScrollView>
        {list.map(item => (<Text>{item.codigo}</Text>))}
        {list.map(item => (<Text>{item.nome}</Text>))}
        {list.map(item => (<Text>{item.email}</Text>))}
        {list.map(item => (<Text>{item.comentario}</Text>))}
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

