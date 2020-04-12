import React from 'react'

class SubtaskName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            editing: false
        }
    }       

    toggleEditing = () => {
        this.setState({ editing: !this.state.editing });
    }

    render() {
        const { onNameChange } = this.props;

        if (this.state.editing === false) {
            return(
                <div className='flex-child' onClick={this.toggleEditing}> <strong> {this.state.name} </strong></div>
            );
        } else {
            return(
                <div className='flex-child'>
                    <textarea defaultValue={this.state.name} onChange={onNameChange}></textarea>
                    <button onClick={this.toggleEditing}> X Cancel </button>
                </div>
            );
        }
    }        

}

export default SubtaskName;