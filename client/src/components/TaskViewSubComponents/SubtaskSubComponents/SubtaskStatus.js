import React from 'react'

class SubtaskStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status,
            statusesArr: this.props.statusesArr,
            editing: false
        }
    }       

    componentDidMount() {
        const statusesArr = this.props.statusesArr;

        this.setState({ statusesArr: statusesArr });
    }
    
    toggleEditing = () => {
        this.setState({ editing: !this.state.editing });
    }

    render() {
        const { statusesArr, onStatusChange } = this.props;

        if (this.state.editing === false) {
            return(
                <div onClick={this.toggleEditing}>Status: {this.state.status}</div>
            );
        } else {
            return(
                <div>
                    Statuses: 
                    <select onChange={onStatusChange} >
                        {
                            statusesArr.map((status, i) => {
                                return <option key={i}>{status.name}</option>
                            })
                        }
                    </select>
                </div>
            );
        }
    }        

}

export default SubtaskStatus;