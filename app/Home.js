import Expo, { SQLite } from 'expo';
import React from "react";
import axios from 'axios';
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
const db = SQLite.openDatabase('db.db');

export default class app extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      codigo: "",
      nome: "",
      email: "",
      comentario: ""
    }

    db.transaction((tx) =>{
      tx.executeSql('SELECT * FROM usuarios order by codigo desc limit 1',[],(tx,results) => {
        var len = results.rows.length;
        if(len>0){
          var row = results.rows.item(0);
          this.setState({codigo: JSON.stringify(row.codigo)});
          this.setState({nome: row.nome});
          this.setState({email: row.email});
          this.setState({comentario: row.comentario});
        }
      });
    });
  }

  componentWillMount () {
    axios.get('http://10.1.1.39:211/client')
    .then(resp => {
      console.log(resp.data.result)
      this.setState({ items : resp.data.result })
    }
  ).catch(e => console.log('error no catch: ', e))
}

changeCodigo(codigo) {
  this.setState({ codigo });
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


/**Salvar Via AsyncStorage */

salvar() {
  const arrayData = [];
  if (this.state.comentario && this.state.nome && this.state.email) {
    const data = {
      codigo: this.state.codigo,
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

/**fim do Salvar via AsyncStorage*/

componentDidMount() {
  db.transaction(tx => {
    tx.executeSql(
      'create table if not exists usuarios (codigo integer, nome text, email text, comentario text);'
    );
  });
}

add(codigo,nome,email,comentario) {
  db.transaction(
    tx => {
      tx.executeSql('insert into usuarios (codigo,nome,email,comentario) values (?,?,?,?)',[codigo,nome,email,comentario]);
      console.log(codigo,nome,email,comentario);
    }
  );
}

sync(code,name,city,key){
  db.transaction(
    tx => {
      tx.executeSql('insert into usuarios (codigo,nome,email,comentario) values (?,?,?,?)',[code,name,city,key]);
      console.log('gerado carga com sucesso');
    }
  );
}

SyncSend(){
  return this.state.items.map((item) =>(
    this.sync(item.CODE,item.NAME,item.CITY,item.KEY)
  )
)
}

deletet(){
  db.transaction(
    tx => {
      tx.executeSql('drop table usuarios');
      console.log('tabela dropada com sucesso!');
    }
  );

}

ler() {
  db.transaction((tx) =>{
    tx.executeSql('SELECT codigo,nome,email,comentario FROM usuarios',[],(tx,results) => {
      var len = results.rows.length;
      if(len>0){
        var row = results.rows;
        console.log(JSON.stringify(row));
      }
    });
  });
}

render() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Sqlite2Form ReactNative</Text>

        <TextInput
          style={styles.input}
          placeholder="Código"
          value={this.state.codigo}
          onSubmitEditing={()=>this.nome.focus()}
          ref={(input)=>this.codigo = input}
          onChangeText={codigo => this.changeCodigo(codigo)}
          />

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={this.state.nome}
          onSubmitEditing={()=>this.email.focus()}
          ref={(ref)=>this.nome = ref}
          onChangeText={nome => this.changeNome(nome)}
          />

        <TextInput
          style={styles.input}
          placeholder="email"
          value={this.state.email}
          onSubmitEditing={()=>this.comentario.focus()}
          ref={(ref)=>this.email = ref}
          onChangeText={email => this.changeEmail(email)}
          />
        <TextInput
          multiline={true}
          style={(styles.input, styles.textArea)}
          placeholder="comentario"
          value={this.state.comentario}
          ref={(input)=>this.comentario = input}
          onChangeText={comentario => this.changeComentario(comentario)}
          />
        <TouchableHighlight
          style={styles.button}
          ref={(ref)=>this.enviar = ref}
          onPress={() => { this.add(
            this.state.codigo,
            this.state.nome,
            this.state.email,
            this.state.comentario)
            //limpas os campos
            this.setState({ codigo: null });
            this.setState({ nome: null });
            this.setState({ email: null });
            this.setState({ comentario: null });
          }
        }
        >
        <Text style={styles.textButton}>Enviar</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.button}
        onPress={() => this.ler()}
        >
        <Text style={styles.textButton}>Ler dados</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.button}
        onPress={() => this.deletet()}
        >
        <Text style={styles.textButton}>Dropar Table</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.button}
        onPress={() => Actions.list()}
        >
        <Text style={styles.textButton}>Exibir Dados</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.buttonsync}
        onPress={() => this.SyncSend()}
        >
        <Text style={styles.textButton}>sincronizar Dados</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.buttonf}
        onPress={() => Actions.listf()}
        >
        <Text style={styles.textButton}>Clientes Firebird</Text>
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
    paddingTop: 7,
    paddingBottom: 7,
    marginBottom:5
  },
  buttonf: {
    backgroundColor: "red",
    paddingTop: 7,
    paddingBottom: 7,
    marginBottom:5
  },
  buttonsync: {
    backgroundColor: "black",
    paddingTop: 7,
    paddingBottom: 7,
    marginBottom:5
  },
  textButton: {
    textAlign: "center",
    fontSize: 18,
    color: "white"
  }
});
