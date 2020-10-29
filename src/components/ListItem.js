import React from 'react';

export default function ListItem({ item, fieldsToShow, }) {

    function flatFieldsToShow(keys, listObj, objID) {
        const parsedObjArr = Object.entries(keys).map( ([key, value]) => {
            if(typeof value != 'number' && typeof value != 'object') {
                return null;
            }

            if(value === 1) {
                if(key === 'avatar_url') {
                    return(
                        <td 
                            key={`${objID}-item-${key}`}
                        >
                            <img style={{margin: 'auto 0'}} width="100px" height="100px" className="thumbnail" src={listObj[key]} />
                        </td>
                    );
                }
                else {
                    return (
                        <td 
                            key={`${objID}-item-${key}`}
                        >
                            {listObj[key]}
                        </td>
                    );
                }
            }
            // value is an object with additional fields to show...
            else {
                return (flatFieldsToShow(value, listObj[key], objID));
            }
        });
        return parsedObjArr;
    }

    return (
        <React.Fragment>
            {
                flatFieldsToShow(fieldsToShow, item, item.id)
            }
        </React.Fragment>
    )
}
