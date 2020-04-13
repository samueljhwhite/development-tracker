import React from 'react';

class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        };
    }

    toggleEditing = () => {
        this.setState({ editing: !this.state.editing });
    }

    render() {
        
        const { onChangeDescription, taskDescription, pushChangesToDatabase } = this.props;

        if (this.state.editing === false) {
            return(
                <div className='task-section'>
                    <span> <strong> Description </strong> </span>
                    <br></br>
                    <p onClick={this.toggleEditing}> {taskDescription} </p>
                </div>
            );
        } else {
            return(
                <form className='task-section'>
                    <span> <strong> Description </strong> </span>
                    <textarea 
                        placeholder='Enter task details' 
                        defaultValue={taskDescription} 
                        onChange={onChangeDescription}
                    ></textarea>
                    
                    <div className='newTaskSubmissionOptions'>
                        <button onClick={pushChangesToDatabase}>Update</button>
                        <button onClick={this.toggleEditing}>Cancel</button>
                    </div>
                </form>
            );
        }

    }
}

export default Description;