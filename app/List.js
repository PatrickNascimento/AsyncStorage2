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

export default class List extends Component {
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

  dados(i){
    exlist = {i}        
    Actions.busca();                
  }

  parseData() {
    if (this.state.list) {
      return this.state.list.map((data, i) => {      	 
      	   
        return (          

        <TouchableHighlight           
          onPress={() => this.dados(data.codigo)}
        >        
          <View style={styles.datalista} key={i}>
            <Text style={styles.textButton} key={i}>{data.codigo}</Text>
            <Text style={styles.textButton} key={i}>{data.nome}</Text>
            <Text style={styles.textButton} key={i}>{data.email}</Text>
            <Text style={styles.textButton} key={i}>{data.comentario}</Text>
          </View>
         </TouchableHighlight>          		
        );
      });
    }
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
