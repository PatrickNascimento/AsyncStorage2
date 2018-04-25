import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import ClientItem from './ClientItem';
import { clientsFetchList, clientGetDetail } from '../../../actions';
import { Actions } from 'react-native-router-flux'

import _ from 'lodash'

class ClientsList extends Component {
  componentWillMount() {
      this.props.clientsFetchList()
      this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ clients }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(clients);
  }

  handleClientDetail () {

  }

  renderRow(client) {
    return <ClientItem
      client={client.NAME}
      codCli={client.CODE}
      cidade={client.CITY}
      onPress={() => Actions.client({ client })} />
  }

  render () {
    return (
      <View>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    clients : state.clients.clientsList,
  }
};

export default connect(
    mapStateToProps,
  { clientsFetchList,
    clientGetDetail })(ClientsList);
