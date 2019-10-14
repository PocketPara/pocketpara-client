import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ViewLogin from './views/ViewLogin';
import Axios from 'axios';
import { getBaseUrl } from './config/ApiConfig';
import ViewRegister from './views/ViewRegister';

// Set up axios config globally
Axios.defaults.baseURL = getBaseUrl();
if(localStorage.getItem('pp_token') != null) {
  Axios.defaults.headers.common['auth'] = localStorage.getItem('pp_token');
}

function App() {
  return (
    <div>
      <Router>
        { /* external Area Switch */}
        <Switch>
          <Route exact path="/login" component={ ViewLogin } />
          <Route exact path="/register" component={ ViewRegister } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
