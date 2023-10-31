import React from 'react';

export default function GalleryItem({ image, isSelected, onSelect, onSetFeature }) {
    const handleItemClick = () => {
        onSelect(image.id);
    };

    const handleSetFeatureClick = (e) => {
        e.stopPropagation();
        onSetFeature(e, image.id);
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
        >
            <input
                type="checkbox"
                checked={isSelected}
                onClick={handleItemClick}
                className="absolute start-2 top-2"
            />
            <div className={`relative ${image.isFeatured ? 'featured-image' : ''}`}>
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
