// Packages
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

// Pages
import Index from './pages/Index/index';
import Need from './pages/Need/index';
import Logout from './pages/Logout/index';
import Settings from './pages/Settings/index'


const AppRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Index}/>
            <Route exact path="/need" component={Need}/>
            <Route exact path="/logout" component={Logout}/>
            <Route exact path="/settings" component={Settings}/>
        </Switch>
    </Router>
)


export default AppRouter;
