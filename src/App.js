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
import Navigation from './components/Navigation';
import Titlebar from './components/Titlebar';
import { faCompass } from '@fortawesome/free-solid-svg-icons'

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
          <Route>
            <Titlebar title="Navigation" icon={ faCompass } color="#4285f4"/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
