import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { clientsFetchList, clientGetDetail } from '../../../actions';


const TextLeft = (props) =>
  <Text style={{ flex: 1, overflow: 'hidden' }}>{ props.children }</Text>

const TextRight = (props) =>
  <Text style={{ flex: 5, overflow: 'hidden' }}>{ props.children }</Text>

const ClientHeader = (props) => {
    return (
              <View style={{
                             backgroundColor: '#dcdcdc',
                             borderRadius: 5,
                             margin: 10,
                             padding: 10,
                             flexDirection : 'column' }}>
                    <View style={{ width: '100%', flexDirection : 'row'}}>
                        <TextLeft>{ 'R. Soc.:'}</TextLeft>
                        <TextRight>{ 'ALKJDFLKJF' }</TextRight>
                    </View>

                    <View style={{ flexDirection : 'row'}}>
                        <TextLeft>{ 'CNPJ:'}</TextLeft>
                        <TextRight>{ 'ALKJDFLKJF' }</TextRight>
                    </View>

                    <View style={{ flexDirection : 'row'}}>
                        <TextLeft>{ 'Tel.:'}</TextLeft>
                        <TextRight>{ 'ALKJDFLKJF' }</TextRight>
                    </View>

                    <View style={{ flexDirection : 'row'}}>
                        <TextLeft>{ 'End.:'}</TextLeft>
                        <TextRight>{ 'ALKJDFLKJFALKJDFLKJFALKJDFLKJFALKJDFLKJFALKJDFLKJF' }</TextRight>
                    </View>

                    <View style={{ flexDirection : 'row'}}>
                        <TextLeft>{ 'Sit.:'}</TextLeft>
                        <TextRight>{ 'ALKJDFLKJF' }</TextRight>
                    </View>

                    <View style={{ flexDirection : 'row'}}>
                        <TextLeft>{ 'Saldo:'}</TextLeft>
                        <TextRight>{ 'ALKJDFLKJF' }</TextRight>
                    </View>

              </View>
    )
}

export default ClientHeader
