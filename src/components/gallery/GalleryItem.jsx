/* eslint-disable no-unused-vars */
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'ITEM';

export default function GalleryItem({
    index,
    id,
    moveItem,
    image,
    isSelected,
    onSelect,
    onSetFeature,
}) {
    const [firstItem, setFirstItem] = useState(null);
    // -----------drugable image hanlde------------------
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
            const updatedItem = { ...draggedItem, index };
            throttledMoveItem(draggedItem.index, index);
            if (index === 0) {
                setFirstItem(updatedItem);
            } else {
                setFirstItem(null);
            }
            console.log('Updated Item:', updatedItem, index);
        },
    });

    // -----------select image handler------------------
    const handleItemClick = () => {
        onSelect(id);
    };
    // -----------select feture image handler------------------
    const handleSetFeatureClick = (e) => {
        e.stopPropagation();
        onSetFeature(id);
    };

    useEffect(() => {
        if (firstItem && index === 0) {
            onSetFeature(firstItem.id);
        } else {
            setFirstItem(null);
        }
    }, [onSetFeature, firstItem, index]);
    return (
        <div
            className={`${
                image.isFeatured ? 'col-span-2 border border-blue-500' : 'col-span-1'
            } relative h-64 bg-cover bg-center border`}
            onClick={handleItemClick}
            onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                    handleItemClick();
                }
            }}
            tabIndex={0}
            role="button"
            ref={(node) => ref(drop(node))}
        >
            <div className="h-full w-full">
                <div className="absolute inset-0 bg-gray-500 opacity-0 hover:opacity-75 transition duration-300">
                    <p className="text-white text-center py-2">{image.alt}</p>
                </div>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onClick={handleItemClick}
                    className="absolute start-2 top-2 hover:text-white hover:outline-white"
                />
                <img src={image.url} alt={image.alt} className="w-full h-full" />
                <button
                    onClick={handleSetFeatureClick}
                    type="button"
                    className="absolute bottom-0 w-full bg-blue-500 text-white border-none p-2 cursor-pointer"
                >
                    {image.isFeatured ? 'Featured' : 'Set as Feature'}
                </button>
            </div>
        </div>
    );
}
