import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './components/NavBarComponent.js';
import ProjectList from './components/ProjectListComponent.js';
import ProjectBoard from './components/ProjectBoardComponent.js';
import TaskView from './components/TaskViewComponent.js';

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

  // Root, and display list of projects.
  // /projects/:id display Kanban of tasks, categorised by status
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