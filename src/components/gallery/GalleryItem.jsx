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
    onSelect,
    onSetFeature,
}) {
    // -----------drugable image hanlde------------------
    const [, ref] = useDrag({
        type: ItemType,
        item: { id, index },
    });
    const throttledMoveItem = _.throttle(moveItem, 200);
    const [, drop] = useDrop({
        accept: ItemType,
        hover: (e, draggedItem) => {
            if (draggedItem.index === index) {
                return;
            }
            const updatedItem = { ...draggedItem, index };
            throttledMoveItem(draggedItem.index, index);
            onSetFeature(id);
            console.log('Updated Item:', updatedItem);
        },
    });

    // -----------select image handler------------------
    const handleItemClick = () => {
        onSelect(id);
    };
    const handleSetFeatureClick = (e) => {
        e.stopPropagation();
        onSetFeature(id);
    };

    return (
        <div
            className={`gallery-item ${isSelected ? 'selected' : ''} ${
                image.isFeatured ? 'featured' : ''
            }`}
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
            <div className={`relative ${image.isFeatured ? 'featured-image' : ''}`}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onClick={handleItemClick}
                    className="absolute start-2 top-2"
                />
                <img src={image.url} alt={image.alt} className="w-full h-auto" />
                <button
                    onClick={handleSetFeatureClick}
                    type="button"
                    className="set-feature-button absolute bottom-0 w-full bg-blue-500 text-white border-none p-2 cursor-pointer"
                >
                    {image.isFeatured ? 'Featured' : 'Set as Feature'}
                </button>
            </div>
        </div>
    );
}
