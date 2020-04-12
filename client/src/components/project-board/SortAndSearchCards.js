import React from 'react';


import SearchIcon from '../../assets/icons/search.svg';
import SortIcon from '../../assets/icons/sort.svg';
import TagIcon from '../../assets/icons/icon-tag-white.svg';

class SortAndSearchCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: 'alphabetical',
            // search: ''
        }
    }

    render() {
        const { handleSearchInput, handleSortByChange, existingProjectTags, handleTagChange } = this.props;
        
        return(
            <div className='sort-search'>
                
                <img height='20px' width='20px' src={TagIcon}></img>
                <select onChange={ handleTagChange } className='filter' name='tags'>
                    <option value=''>No Filter</option>
                    {
                        existingProjectTags.map((tag, i) => {
                            return <option value={tag} key={i}> { tag } </option>
                        })
                    }
                </select>

                <img height='20px' width='20px' src={SearchIcon}></img>
                <input onChange={ handleSearchInput } className='search' type='search' placeholder='  ... filter cards by task name'></input>

                <img height='25px' width='25px' src={SortIcon}></img>
                <select onChange={ handleSortByChange } className='filter' name='sort'>
                    <option value='alphabetical'>Alphabetical</option>
                    <option value='createdAt'>Date Created</option>
                    <option value='updatedAt'>Date Updated</option>
                </select>

            </div>
        )
    }
}

export default SortAndSearchCards;