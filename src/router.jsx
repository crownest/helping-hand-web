// Packages
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// Pages
import Index from './pages/Index/index';
import Need from './pages/Need/index';
import Logout from './pages/Logout/index';
import Settings from './pages/Settings/index'
import Support from './pages/Support/index'

const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
};

const AppRouter = () => (
    <AlertProvider template={AlertTemplate} {...options}>
        <Router>
            <Switch>
                <Route exact path="/" component={Index}/>
                <Route exact path="/need" component={Need}/>
                <Route exact path="/logout" component={Logout}/>
                <Route exact path="/settings" component={Settings}/>
                <Route exact path="/support" component={Support}/>
            </Switch>
        </Router>
    </AlertProvider>
)


export default AppRouter;
