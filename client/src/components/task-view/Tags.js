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

    removeTag = (e) => {
        const { tagsArr, commitTagRemoval } = this.props;
        const flaggedTag = e.target.id;
        
        const arrIndex = tagsArr.findIndex(tag => tag === flaggedTag);
        const newTagsArr = tagsArr.slice(0, arrIndex).concat(tagsArr.slice(arrIndex + 1));

        commitTagRemoval(newTagsArr);
    }

    render() {
        const { existingProjectTags, tagsArr, captureNewTagValue, addNewTag} = this.props;
        
        if (this.state.editing === false) {
            return(  
                <div className='tags'>
                    <div className='flex-child'>
                        <strong>Tags:</strong> 
                        {
                            tagsArr.map((tag, i) => {
                                return <span className='tag' onClick={this.removeTag} key={i} id={tag}> {tag} </span>
                            })
                        }
                    </div>
                    <div className='flex-child'>
                        <button onClick={this.toggleEditing}>Add Tag</button>
                    </div>
                </div>
            );
        } else {
            return(
                <div className='flex-child'>
                    <div>
                        <select onChange={captureNewTagValue} >
                            <option value=''>Choose existing tag</option>
                            {
                                existingProjectTags.map((tag, i) => {
                                    return <option key={i}>{tag}</option>
                                })
                            }
                        </select>
                    </div>
                        <textarea placeholder='Enter a new tag' onChange={captureNewTagValue}></textarea>
                        <button onClick={addNewTag}>Add</button>
                        <button onClick={this.toggleEditing}>Cancel</button>
                    <div>

                    </div>
                </div>
            );
        }

        
    }
}

export default Tags;