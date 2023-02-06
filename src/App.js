import React from 'react'
import {Route, Switch, Redirect} from "react-router-dom"
import AdminLayout from "layouts/Admin.js";
import Auth from "layouts/Auth";
import { useSelector } from 'react-redux'


const App = () => {
    const isUser = useSelector((state)=>state.user).isUser||localStorage.getItem("token")
    // console.log(isUser);
    return (
        <Switch>
            <Route path="/auth/login" render={()=><Auth/>}/>
            {isUser&&<Route path="/admin" render={(props) => <AdminLayout {...props} />} />}
            <Redirect from="/" to="/auth/login" />
        </Switch>
    )
}

export default App