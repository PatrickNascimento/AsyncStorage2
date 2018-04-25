import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import ProductItem from './ProductItem';
import { productsFetchList, productGetDetail } from '../../../actions';
import { Actions } from 'react-native-router-flux'

import _ from 'lodash'

class ProductsList extends Component {
  componentWillMount() {

      this.props.productsFetchList()
      this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ products }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(products);
  }

  handleClientDetail () {

  }

  renderRow(product, sectionId, rowId) {
    return <ProductItem
      rowIndex={rowId}
      product={product.description}
      description={product.long_description}
      balance={product.balance}
      codProd={product.id}
      onPress={() => Actions.product({ product })} />
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

const mapStateToPropsBack = state => {
  return {
    products : state.products.productsList,
  }
};

const mapStateToProps = state => ({
    products : [{
        id : 246,
        active : true,
        description : 'CANETA',
        long_description : 'CANETA PARA PINTURA',
        balance: '(KG)',
        type : {
            description : '0',
            price_list : {
                value : 'R$ 12.00'
            }
        }
    },
    {
        id : 4020,
        active : false,
        description : 'PAPEL',
        long_description : 'papel sulfite',
        balance: '(KG)',
        type : {
            description : '2',
            price_list : {
                value : 'R$ 23.00'
            }
        }
    },
    {
        id : 3708,
        active : false,
        description : 'PINCEL',
        long_description : 'pincel atomico',
        balance: '(KG)',
        type : {
            description : '2',
            price_list : {
                value : 'R$ 1.00'
            }
        }
    }]
})

export default connect(
    mapStateToProps,
  { productsFetchList,
    productGetDetail })(ProductsList);
