import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Input, TouchableBox } from '../../utils'
import { connect } from 'react-redux'

class Configuration extends Component {
    constructor (props ) {
        super (props)
    }

    render () {
        return (
            <View>
                <Text>{ 'CÓDIGO DO VENDEDOR:' }</Text>
                  <TextInput
                    label="Email"
                   />
                <Text>{ 'SEQUENCIAL DO PEDIDO:' }</Text>
                  <TextInput
                    label="Email"
                   />
                <Text>{ 'ENDEREÇO PARA SINCRONIZAÇÂO:' }</Text>
                  <TextInput
                    label="Email"
                   />
                <Text>{ 'CÓDIGO DE LIBERAÇÂO' }</Text>
                <View style={{ flexDirection : 'row' }}>
                  <TextInput style={{ flex: 2}}
                    label="Email"
                   />
                    <TouchableOpacity style={{ flex: 1}}>
                    <Text>
                    { 'GERAR' }
                    </Text>
                    </TouchableOpacity>
                </View>


            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

/* api-ms-win-crt-runtime-l1-1-0.dll */

export default connect(mapStateToProps, mapDispatchToProps)(Configuration)
