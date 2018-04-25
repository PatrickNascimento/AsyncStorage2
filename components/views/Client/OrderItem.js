import React, { Component } from 'react'
import { View, Text } from 'react-native'

const OrderItem = (props) => {
    return (
        <View style={[{flexDirection : 'row'}, props.style]}>
                <Text style={{ flex: 1 }}>
                    { 'Código do Pedido' }
                </Text>
                <Text style={{ flex: 3 }}>
                    { 'Descrição do Pedido' }
                </Text>
        </View>
    )
}

export default OrderItem
