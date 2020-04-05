import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './components/NavBar.js';
import ProjectList from './components/ProjectList.js';
import ProjectBoard from './components/ProjectBoard.js';
import TaskView from './components/TaskView.js';

import './styles/app.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeProject: ''
    }
  }

  // Project selection - pushes assignedProject ObjectId when creating tasks. NOT IN USE
  setActiveProject = (e) => {
    console.log(e);
  }

  // Root; display list of projects.
  // /projects/:id display Kanban of tasks, categorised by status
  // /task/:id display all details of a specific task
  render() {
    return (
      <Router>
        <NavBar />
        <Route path='/' exact component={ ProjectList } />
        <Route path='/project/:id' component={ ProjectBoard } />
        <Route path='/task/:id' component={ TaskView } />
      </Router>
    );
  }

}

export default App;