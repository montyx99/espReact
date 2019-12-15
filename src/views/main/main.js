import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import style from './main.scss'
import Home from '../home/home'
import Config from '../config/config'

function Main() {
    return (
        <div className="Main">
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path="/config" component={Config} />
            </Switch>
        </div>
)}

export default Main