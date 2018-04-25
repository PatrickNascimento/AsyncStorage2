import React, { Component } from 'react'
import { Box, BoxSection } from '../../reuse'
import { Text, View } from 'react-native'

import ClientItem from './ClientItem'

import axios from 'axios'

class ListClients extends Component {
    constructor(props){
      super(props)
      this.state = {
        items : []
      }
    }

    componentWillMount () {
      axios.get('http://10.1.1.39:211/client')
        .then(resp => {
            console.log(resp.data.result)
            this.setState({ items : resp.data.result })
          }
        ).catch(e => console.log('error no catch: ', e))
    }

    render() {
      return (
        <Text>
          { this.state.items.map( item =>
              <ClientItem key={item.CDCLIFOR}>
                { item.NMCLIFOR }
              </ClientItem>
            )
          }
        </Text>
      )
    }
}

export default ListClients
