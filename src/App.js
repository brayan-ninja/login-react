import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Register from './Components/Register';
import AddStudent from './Components/Home';
import UpdateStudent from './Components/update';
import AllStudents from './Components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/addstudent" component={AllStudents} />
            <Route path="/updatestudent/:id" component={UpdateStudent} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;


