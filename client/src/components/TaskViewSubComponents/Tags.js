import React from 'react';

class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }

    toggleEditing = () => {
        this.setState({ editing: !this.state.editing });
    }

    render() {
        const { tagsArr } = this.props; 
        
        return(
            <div className='flex-child'>
                <span>Tags:</span>
                <br></br>
                {
                    tagsArr.map((tag, i) => {
                        return <span key={i}>{tag}</span>
                    })
                }
            </div>
        );
    }
}

export default Tags;