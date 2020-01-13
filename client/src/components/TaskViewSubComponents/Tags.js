import React from 'react';

class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }

    toggleEditing = () => {
        this.setState({ editing: !this.state.editing });
    }

    render() {
        const { existingProjectTags, tagsArr, captureNewTagValue, addNewTag} = this.props;
        
        if (this.state.editing === false) {
            return(
                <div className='flex-child'>
                    <span>Tags:</span> <button onClick={this.toggleEditing}>Add Tag</button>
                    <br></br>
                    {
                        tagsArr.map((tag, i) => {
                            return <span key={i}>{tag}</span>
                        })
                    }
                </div>
            );
        } else {
            return(
                <div className='flex-child'>
                    <div>
                        <textarea placeholder='Enter a new tag' onChange={captureNewTagValue}></textarea>
                        <button onClick={addNewTag}>ADD</button>
                    </div>
                    <div>
                        <select onChange={captureNewTagValue} >
                            <option></option>
                        {
                            existingProjectTags.map((tag, i) => {
                                return <option key={i}>{tag}</option>
                            })
                        }
                        </select>
                    </div>
                </div>
            );
        }

        
    }
}

export default Tags;