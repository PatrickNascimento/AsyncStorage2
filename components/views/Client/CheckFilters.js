import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { CheckBox } from 'react-native-elements'

const CheckFilters = (props) => {
    return (
              <View
                style={{ flexDirection : 'row',
                         flexWrap : 'wrap',
                         justifyContent : 'center'
                }}
              >
                  <CheckBox
                    center
                    title='FECHADOS'
                    iconLeft
                    iconType='material'
                    checkedIcon="done"
                    checked={true}
                  />

                  <CheckBox
                    center
                    title='ABERTOS'
                    iconLeft
                    iconType='material'
                    checkedIcon="done"
                    checked={true}
                  />

                  <CheckBox
                    center
                    title='SINCRONIZADOS'
                    iconLeft
                    iconType='material'
                    checkedIcon="done"
                    checked={true}
                  />
             </View>


    )
}

export default CheckFilters
