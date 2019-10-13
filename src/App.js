import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ViewLogin from './views/ViewLogin';

function App() {
  return (
    <div>
      <Router>
        

        { /* external Area Switch */}
        <Switch>
          <Route exact path="/login" component={ ViewLogin } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
