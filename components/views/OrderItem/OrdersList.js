import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import OrderItem from './OrderItem';
// TODO import { ordersFetchList, orderGetDetail } from '../../../actions';
import { Actions } from 'react-native-router-flux'

import _ from 'lodash'

class OrdersList extends Component {
  componentWillMount() {
      this.props.clientsFetchList()
      this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ orders }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(orders);
  }

  handleClientDetail () {
  }

  renderRow(orders) {
    return <ClientItem
      orders={orders.NMCLIFOR}
      codCli={orders.CDCLIFOR}
      cidade={orders.NMCID}
      // TODO Actions.orders
      onPress={() => Actions.orders({ orders })} />
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
    clients : state.orders.ordersList,
  }
};

export default connect(
    mapStateToProps,
  { ordersFetchList,
    orderGetDetail })(OrdersList);
