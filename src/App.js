import React, { Component } from 'react'
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import './App.css'
import AppRouter from './router'

class App extends Component {
  render() {
    return (
      <AppRouter>
        <div>App</div>
      </AppRouter>
    )
  }
}
export default App;
