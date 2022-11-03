//----------------------------
//React
//----------------------------
import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { ComponentStyles } from '@fluentui/react';

import { GroupedList, IGroup } from '@fluentui/react/lib/GroupedList';
import { IColumn, DetailsRow } from '@fluentui/react/lib/DetailsList';
import { Selection, SelectionMode, SelectionZone } from '@fluentui/react/lib/Selection';
import { Toggle, IToggleStyles } from '@fluentui/react/lib/Toggle';
import { useBoolean, useConst } from '@fluentui/react-hooks';
import { createListItems, createGroups, IExampleItem } from '@fluentui/example-data';

//----------------------------
//Testing/System/DataSource
//----------------------------
var DATA_SOURCE = "CRM"
let href = window!.top!.location.href;
if(href.indexOf("127.") > -1 || href.indexOf("localhost") > -1) {
    DATA_SOURCE="TEST";
}
var CRM_TEST_MODE = 0;

//----------------------------
//Component styles
//----------------------------
const toggleStyles: Partial<IToggleStyles> = { root: { marginBottom: '20px' } };
const groupCount = 3;
const groupDepth = 3;
const items = createListItems(Math.pow(groupCount, groupDepth + 1));
                /*
                color: "green"
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in"
                height: 151
                key: "item-2 Lorem ipsum dolor sit"
                location: "New York"
                name: "Lorem ipsum dolor sit amet,"
                shape: "triangle"
                thumbnail: "//via.placeholder.com/151x151"
                width: 151
                */
const columns = Object.keys(items[0])
                .slice(0, 3)
                .map(
                    (key: string): IColumn => ({
                        key: key,
                        name: key,
                        fieldName: key,
                        minWidth: 300,
                    }),
                );
                /*
                fieldName: "thumbnail"
                key: "thumbnail"
                minWidth: 300
                name: "thumbnail"                
                */

  const groups = createGroups(groupCount, groupDepth, 0, groupCount);
                /*
                children: (3) [{…}, {…}, {…}]
                count:27
                isCollapsed:undefined
                key:"group0"
                level:0
                name:"group 0"
                startIndex:0
                */

//----------------------------
//GroupedListControl
//----------------------------
function GroupedListControl(props:any) {

    const [isCompactMode, { toggle: toggleIsCompactMode }] = useBoolean(false);

    const selection = useConst(() => {
        const s = new Selection({
            onSelectionChanged: () => {
                s.getSelection().forEach((p1:any,p2:any,selectedItems:any) => {
                    
                    let cols = columns;
                    let itm = items;
                    let grp = groups;
                    
                    let selItems = selectedItems;

                    debugger;
                    
                });
            }
        });
        
        s.setItems(items, true);
        
        return s;
    });


    const onRenderCell = (
        nestingDepth?: number,
        item?: IExampleItem,
        itemIndex?: number,
        group?: IGroup,
    ): React.ReactNode => {
        return item && typeof itemIndex === 'number' && itemIndex > -1 ? (
            <DetailsRow
                columns={columns}
                groupNestingDepth={nestingDepth}
                item={item}
                itemIndex={itemIndex}
                selection={selection}
                selectionMode={SelectionMode.multiple}
                compact={isCompactMode}
                group={group}
            />
        ) : null;
    };    
    
    function _onChange() {
        let args = arguments;
        //props.theobj.changeFunction();
    }

    return (
        <div>
            <Toggle
                label="Enable compact mode"
                checked={isCompactMode}
                onChange={toggleIsCompactMode}
                onText="Compact"
                offText="Normal"
                styles={toggleStyles}
            />
            <SelectionZone selection={selection} selectionMode={SelectionMode.multiple}>
            <GroupedList
                items={items}
                // eslint-disable-next-line react/jsx-no-bind
                onRenderCell={onRenderCell}
                selection={selection}
                selectionMode={SelectionMode.multiple}
                groups={groups}
                compact={isCompactMode}
            />
            </SelectionZone>
        </div>
    )
}

export function Render(context:any, container:any, theobj:object) {
    ReactDOM.render(
        <div><GroupedListControl context={context} theobj={theobj} /></div>
      , container
    );
}


