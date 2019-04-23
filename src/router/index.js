import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import Home from '../components/home'
import Login from '../components/login'
import Detail from '../components/main/detail'
import Cal from '../components/main/cal'
import Map from '../components/main/map'

// 添加路由守卫
const Auth = props => {
  return (
      <Route
      path='/'
      render={() => {
        // if->判断
        // 如果token有->Home
        // 如果没有->Login
        const isLogin = localStorage.getItem('token')
        const Com = isLogin ? <Home /> : <Redirect to='/login' />
        return Com
      }}
      />
  )
}
function AppRouter() {
    return <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/detail" component={Detail} />
            <Route path="/cal" component={Cal} />
            <Route path="/map" component={Map} />
            <Auth />

            <Redirect to="/" />
        </Switch>
    </Router>
}

export default AppRouter
