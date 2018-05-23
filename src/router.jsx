// Packages
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// Pages
import Index from './pages/Index/index';


const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Index} />
    </Switch>
  </Router>
)


export default AppRouter;
