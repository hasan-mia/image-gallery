import _ from 'lodash';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'ITEM';

export default function GalleryItem({
    index,
    id,
    moveItem,
    image,
    isSelected,
    handleSelect,
    handleSetFeature,
}) {
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
            throttledMoveItem(draggedItem.index, index);
            // const updatedItem = { ...draggedItem, index };
        },
    });

    // -----------select image handler------------------
    const handleItemClick = () => {
        handleSelect(id);
    };
    // -----------select feture image handler------------------
    const handleSetFeatureClick = (e) => {
        e.stopPropagation();
        handleSetFeature(id);
    };
    return (
        <div
            className={`${
                image.isFeatured
                    ? 'col-span-2 row-span-2 border border-blue-500 h-full'
                    : 'col-span-1'
            } relative h-64 bg-cover bg-center border rounded-md`}
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
            <div className="h-full w-full gallery-image">
                <div className="absolute inset-0 bg-gray-600 opacity-0 hover:opacity-75 transition duration-300">
                    <p className="text-white text-center py-2">{image.alt}</p>
                </div>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onClick={handleItemClick}
                    className={`absolute start-2 top-2 hover:text-white hover:outline-white ${
                        isSelected ? 'opacity-100' : 'select-input'
                    } transition-opacity duration-300`}
                />
                <img src={image.url} alt={image.alt} className="w-full h-full rounded-md" />
                <button
                    onClick={handleSetFeatureClick}
                    type="button"
                    className="absolute bottom-0 w-full bg-blue-500 text-white border-none rounded-b-md p-2 cursor-pointer select-btn"
                >
                    {image.isFeatured ? 'Featured' : 'Set as Feature'}
                </button>
            </div>
        </div>
    );
}
