import React from 'react';

import ListItem from './ListItem';

export default function List({ data, fieldsToShow }) {
  
    function createTableEntryRecursive(keys) {
        return Object.entries(keys).map( ([key, value]) => {
            if(typeof value != 'number' && typeof value != 'object') {
                return null;
            }

            if(value === 1) {
                return (
                    <td key={`table-head-${key}`}>{key}</td>
                )
            }
            // value is an object with additional fields to show...
            else {
                return createTableEntryRecursive(value);
            }
        });
    }

    return (
        <table>
            <thead>
                <tr>
                {
                    createTableEntryRecursive(fieldsToShow)
                }
                </tr>
            </thead>
            <tbody>
            {
                data.map( item => (
                    <tr
                        key={`${item.id}-tr-list-item`}
                    >
                        <ListItem
                            item={item}
                            fieldsToShow={fieldsToShow}
                        />
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}
