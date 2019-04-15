import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import Home from '../components/home'
import Login from '../components/login'

function AppRouter() {
    return <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Redirect to="/" />
        </Switch>
    </Router>
}

export default AppRouter
