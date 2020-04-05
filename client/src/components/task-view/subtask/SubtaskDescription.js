import React from 'react'

class SubtaskDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.description,
            editing: false
        }
    }       

    toggleEditing = () => {
        this.setState({ editing: !this.state.editing });
    }

    render() {
        const { onDescriptionChange } = this.props;

        if (this.state.editing === false) {
            return(
                <div className='flex-child' onClick={this.toggleEditing}>{this.state.description}</div>
            );
        } else {
            return(
                <div className='flex-child'>
                    <textarea defaultValue={this.state.description} onChange={onDescriptionChange}></textarea>
                    <button onClick={this.toggleEditing}> X Cancel </button>
                </div>
            );
        }
    }        
}

export default SubtaskDescription;