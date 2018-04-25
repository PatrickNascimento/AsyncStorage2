import React, { Component } from 'react';
import { ListView, View, Text, TouchableOpacity } from 'react-native';
import { Box, BoxSection } from '../../utils'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'

import OrderItem from '../OrderItem/OrderItem'
import ClientHeader from './ClientHeader'
import List from './List'
import CheckFilters from './CheckFilters'

const TextLeft = (props) =>
  <Text style={{ flex: 1, overflow: 'hidden' }}>{ props.children }</Text>

const TextRight = (props) =>
  <Text style={{ flex: 5, overflow: 'hidden' }}>{ props.children }</Text>


class Client extends Component {

  componentWillMount() {
  }

  renderRow(order) {
    return <OrderItem
      order={order}
      onPress={() => Actions.order({ order })} />
  }

  render () {
      return ( <View style={{ display : 'flex',
                       alignItems : 'flex-start',
                       flexDirection : 'column',
                      }}>

            <ClientHeader />
            <CheckFilters />

            <View style={{ display : 'flex',
                           flexDirection : 'column',
                           justifyContent : 'flex-start',
                           width : '100%',
                           }}>
                <View style={{

                }}>
                    <List ListType={"Últimos Pedidos"}
                        dataSourceFetch={this.props.lastOrdersFetchList}
                        listName={'orders'}
                        itemName={'order'}
                    />
                    <List ListType={"Produtos mais comprados"}
                        dataSourceFetch={this.props.mostBoughtProductsFetchList}
                        listName={'products'}
                        itemName={'product'}
                    />
                </View>

                <View >
                    <TouchableOpacity style={{
                        backgroundColor: '#a6a6a6',
                        paddingTop: 15,
                        paddingBottom: 15,
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                    >
                        <Text style={{
                            textAlign : 'center',
                            color: 'white'
                        }}>
                            { 'ABRIR NOVO PEDIDO' }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

          </View>
      );
   }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        lastOrdersFetchList : () => {
            [{ order : 'asd'}, { order : 'kjf'}]
        },
        mostBoughtProductsFetchList : () => {
            [{ product : 'sdkjf', product : 'kj'}]
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client)
