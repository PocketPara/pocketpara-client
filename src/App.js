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
import Titlebar from './components/Titlebar';
import { faUser, faTruck, faBullhorn, faPlusCircle, faAmbulance } from '@fortawesome/free-solid-svg-icons'
import CurrentLanguage from './helpers/CurrentLanguage';
import ViewAccount from './views/settings/ViewAccount';
import ViewCars from './views/settings/ViewCars';
import ViewKeywords from './views/settings/ViewKeywords';
import ViewAddShift from './views/stats/ViewAddShift';
import ViewMyShifts from './views/stats/ViewMyShifts';

// Set up axios config globally
Axios.defaults.baseURL = getBaseUrl();
if(localStorage.getItem('pp_token') != null) {
  Axios.defaults.headers.common['auth'] = localStorage.getItem('pp_token');
}

function App() {
  return (
    <div>
      <Router>

        { /* Switch for title bars */}
        <Switch>
          <Route exact path="/login"></Route>
          <Route exact path="/register"></Route>

          <Route exact path="/stats/add-shift">
            <Titlebar title={ CurrentLanguage().navigation.addShift } color="#4285f4" icon={ faPlusCircle } />
          </Route>
          <Route exact path="/stats/my-shifts">
            <Titlebar title={ CurrentLanguage().navigation.myShifts } color="#4285f4" icon={ faAmbulance } />
          </Route>

          { /* Handles titlebars */}
          <Route exact path="/settings/account">
            <Titlebar title={ CurrentLanguage().navigation.manageAccount } color="#05bb69" icon={ faUser } />
          </Route>
          <Route exact path="/settings/cars">
            <Titlebar title={ CurrentLanguage().navigation.manageCars } color="#05bb69" icon={ faTruck } />
          </Route>
          <Route exact path="/settings/keywords">
            <Titlebar title={ CurrentLanguage().navigation.manageKeywords } color="#05bb69" icon={ faBullhorn } />
          </Route>


        </Switch>

        { /* Switch for views */}
        <Switch>
          <Route exact path="/login" component={ ViewLogin } />
          <Route exact path="/register" component={ ViewRegister } />



          <Route exact path="/stats/add-shift" component={ ViewAddShift } />
          <Route exact path="/stats/my-shifts" component={ ViewMyShifts } />


          <Route exact path="/settings/account" component={ ViewAccount } />
          <Route exact path="/settings/cars" component={ ViewCars } />
          <Route exact path="/settings/keywords" component={ ViewKeywords } />


        </Switch>

      </Router>
    </div>
  );
}

export default App;
