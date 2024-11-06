import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Addstudent from './Components/login';
import Home from './Components/Home';
import Register from './Components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/add-student" component={Addstudent} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

