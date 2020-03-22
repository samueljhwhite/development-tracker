import React from 'react';
import axios from 'axios';

import '../styles/projectBoard.css';

import StatusColumnsGenerator from './StatusColumnsGenerator.js';
import SortAndSearchCards from './SortAndSearchCards.js';

class ProjectBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeProject: '', // All queried project data (kept for reference)
            projectID: '', // String, converted to Mongo ObjID
            description: '', // Project description
            name: '', // Project name
            projectStatuses: [], // Arr of Objs (name & index)
            tasks: [], // Queried on component load from DB. Updated by Drag & Drop at StatusColumn
            sortBy: 'alphabetical', // Altered by SortAndSearchCards
            filterTag: '', // Altered by SortAndSearchCards
            searchInput: '', // Altered by SortAndSearchCards
            existingProjectTags: []
        }
    }

    // Calls to server to set state.
    componentDidMount() {
        const projectID = this.props.match.params.id;

        // Call server, query DB for project data & assign to component state.
        axios.get(`http://localhost:5000/projects/${projectID}`).then(res => {
            this.setState({
                activeProject: res.data,
                projectID: res.data._id,
                description: res.data.description,
                name: res.data.name,
                projectStatuses: res.data.statuses
            });
        })
        .catch(err => console.log(err));

        // Call server, query DB for all tasks assigned to project, calculate unique tags, and set state. 
        axios.get(`http://localhost:5000/tasks/project/${projectID}`).then(res => {
            const allArrItems = []

            res.data.forEach(taskObj => {
                const tagsArr = taskObj.tags;
                    
                tagsArr.forEach(tag => {
                    allArrItems.push(tag);
                });
            });
                
            const uniqueTags = [...new Set(allArrItems)];

            this.setState({ 
                tasks: res.data,
                existingProjectTags: uniqueTags
            })
        })
        .catch(err => console.log(err));
    }

        // Drag and Drop
    // Recieves array from StatusColumn, reflecting drag/drop changes, and updates state.
    editTasksArrOnDrop = (tasksArr) => {
        this.setState({ tasks: tasksArr });
    }

        // Sort & Search
    // Capture search from SortAndSearchCards
    handleSearchInput = (e) => {
        this.setState({ searchInput: e.target.value });
    }

    // Capture sort by from SortAndSearchCards
    handleSortByChange = (e) => {
        this.setState({ sortBy: e.target.value });
    }

    // Capture tag selection from SortAndSearchCards
    handleTagChange = (e) => {
        this.setState({ filterTag: e.target.value });
    }

    // Create column for each status of the project. Columns contain tasks based on asssignment.
    render() {
        const { tasks, projectStatuses, projectID, name, description, sortBy, searchInput, existingProjectTags, filterTag } = this.state;
        const lowerCaseName = name.toLowerCase();

            // Apply user entered filters - tags, search, and sort, and finally pass down orderedTasks to children components.
        // All tasks filtered against filterTag, assigned to tasksWithTag
        let tasksWithTag = []
        if (filterTag !== '') {
            tasksWithTag = tasks.filter(task => {
                return task.tags.includes(filterTag);
            });
        } else {
            tasksWithTag = tasks
        }

        // tasks that meet Tag filter, filtered against user's search input
        const filteredTasks = tasksWithTag.filter(task => {
            return task.name.toLowerCase().includes(searchInput.toLowerCase());
        });

        // Sort filteredTasks (tag filter & search input), and assign to orderedtasks.
        let orderedTasks = [] // Passed down through children components
        if (sortBy === 'createdAt') {
            orderedTasks = filteredTasks.sort(function(a, b) {
                const createdAtA = a.createdAt;
                const createdAtB = b.createdAt;
                if (createdAtA < createdAtB) {
                    return -1
                } else if (createdAtB < createdAtA) {
                    return 1
                } else {
                    return 0
                }
            });
        } else if (sortBy === 'updatedAt') {
            orderedTasks = filteredTasks.sort(function(a, b) {
                const updatedAtA = a.updatedAt;
                const updatedAtB = b.updatedAt;
    
                if (updatedAtA < updatedAtB) {
                    return -1
                } else if (updatedAtB < updatedAtA) {
                    return 1
                } else {
                    return 0
                }
            });
        } else { // default, sort alphabetically
            orderedTasks = filteredTasks.sort(function(a, b) {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) {
                    return -1
                } else if (nameB < nameA) {
                    return 1
                } else {
                    return 0
                }
            });
        }

        return(
            <div>
                <div className='directory-indication'>
                    devtracker > <span>{lowerCaseName}</span>
                </div>

                <SortAndSearchCards 
                    existingProjectTags={ existingProjectTags } 
                    handleSearchInput={ this.handleSearchInput } 
                    handleSortByChange={ this.handleSortByChange }  
                    handleTagChange={ this.handleTagChange } 
                />
                
                <StatusColumnsGenerator 
                    tasks={tasks} 
                    projectStatuses={projectStatuses} 
                    projectID={ projectID } 
                    projectName={ name } 
                    projectDescription={description} 
                    editTasksArrOnDrop = {this.editTasksArrOnDrop} 
                    orderedTasks={orderedTasks}
                />
            </div>
        );
    }
}

export default ProjectBoard;