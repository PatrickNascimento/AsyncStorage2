import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from './Home.js'
import List from './List.js'

const Routes = () => (
   <Router navigationBarStyle={{ backgroundColor: 'skyblue', top:25 }}>
      <Scene key = "root">
         <Scene key = "home" component = {Home} title = "Inicial" initial = {true} />
         <Scene key = "list" component = {List} title = "Lista " />
      </Scene>
   </Router>
)
export default Routes