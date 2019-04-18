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

function AppRouter() {
    return <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/detail" component={Detail} />
            <Route path="/cal" component={Cal} />
            <Route path="/map" component={Map} />

            <Redirect to="/" />
        </Switch>
    </Router>
}

export default AppRouter
