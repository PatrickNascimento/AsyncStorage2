import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {
  Box,
  BoxSection,
  Input,
  Button
} from '../../utils'

import { connect } from 'react-redux'
import { emailChange, passwordChange, companyUuidChange  } from '../../../actions'

class Login extends Component {
  constructor(props) {
    super(props)
  }

  handleEmailChange (text) {
    this.props.emailChange(text)
  }

  handlePasswordChange (text) {
    this.props.passwordChange(text)
  }

  handleCompanyUuidChange (text) {
    this.props.companyUuidChange(text)
  }

  render () {
    return (
        <View>
          <Box>
            <BoxSection>
              <Input
                label="Email"
                onChangeText={this.handleEmailChange.bind(this)}
               />
            </BoxSection>

            <BoxSection>
              <Input
                label="Senha"
                secureTextEntry
                onChangeText={this.handlePasswordChange.bind(this)}
               />
            </BoxSection>

            <BoxSection>
              <Input
                label="CNPJ"
                onChangeText={this.handleCompanyUuidChange.bind(this)}
              />
            </BoxSection>

            <BoxSection>
              <Button
                onPress={() => Actions.products()}
              >
                Login
              </Button>
              <Button
                onPress={() => []}
              >
                Cadastro
              </Button>
            </BoxSection>
          </Box>
        </View>
    )
  }
}

// Change to state.authentication.<fields>
const mapStateToProps = (state) => ({
  email : state.email,
  password : state.password,
  company_uuid : state.company_uuid
})


export default connect(mapStateToProps, { emailChange, passwordChange, companyUuidChange })(Login)
