import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import CategoryList from './CategoryList.js'
import HRList from './HRList.js';
import WHList from './WHList.js';
import eom from "./kevin-chili.gif"
import logo from './logo.png';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//import { Button } from 'bootstrap';

// This is an example of managing a list of items in React, including delete,
// edit and add operations for the list!

class App extends React.Component {
    
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/home"><img className = "brand" src={logo}/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/list">List Manager</Nav.Link>
              <Nav.Link href="/hr">Human Resources</Nav.Link>
              <Nav.Link href="/warehouse">Warehouse Manager</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
        <Route path="/home" >
            <div className="container">
              <h3 className="eom"> Employee of the month </h3>
              <img className="eom" src={eom}/>
            </div>
          </Route>
          <Route path="/list" >
            <div className="container">
              <CategoryList />
            </div>
          </Route>
          <Route path="/hr" >            
            <div className="container">
              <HRList />
            </div>
          </Route>
          <Route path="/warehouse" >            
            <div className="container">
              <WHList />
            </div>
          </Route>
        </Switch>
      </Router>
    )
  }

};

export default App;
