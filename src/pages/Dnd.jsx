import _ from 'lodash';
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'ITEM';

function DraggableItem({ id, name, index, moveItem }) {
    const [, ref] = useDrag({
        type: ItemType,
        item: { id, index },
    });

    const throttledMoveItem = _.throttle(moveItem, 200);

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index === index) {
                return;
            }
            // const updatedItem = { ...draggedItem, index };
            throttledMoveItem(draggedItem.index, index);
        },
    });

    return (
        <div ref={(node) => ref(drop(node))} className="draggable-element">
            {name}
        </div>
    );
}

export default function Dnd() {
    const [items, setItems] = useState([
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
    ]);

    const debouncedSetItems = _.debounce(setItems, 300);

    const moveItem = (fromIndex, toIndex) => {
        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(fromIndex, 1);
        updatedItems.splice(toIndex, 0, movedItem);
        debouncedSetItems(updatedItems);
    };

    return (
        <div className="flex gap-2">
            {items.map((item, index) => (
                <DraggableItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    index={index}
                    moveItem={moveItem}
                />
            ))}
        </div>
    );
}
