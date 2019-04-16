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
function AppRouter() {
    return <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/detail" component={Detail} />
            <Redirect to="/" />
        </Switch>
    </Router>
}

export default AppRouter
