import React from 'react';

function UnsavedChanges(props) {
    
    const { hasBeenEdited, pushChangesToDatabase } = props;

    if (hasBeenEdited === true) {
        return(
            <div>
                <p>You have unsaved changes</p>
                <button onClick={pushChangesToDatabase}>SAVE!</button>
            </div>
        );
    } else {
        return (null);
    }
}

export default UnsavedChanges;