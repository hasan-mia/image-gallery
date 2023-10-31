import React from 'react';
import GalleryItem from './GalleryItem';

export default function Gallery({ images, selectedImages, onSelect, onDelete, onSetFeature }) {
    return (
        <div>
            <div className="flex justify-between border-b pb-2">
                <div className="flex gap-2">
                    <input
                        type="checkbox"
                        checked={selectedImages.length > 0}
                        className="checkbox checkbox-xs"
                    />
                    <p>
                        {selectedImages.length} {selectedImages.length > 1 ? 'Files' : 'File'}{' '}
                        Selected
                    </p>
                </div>
                <button onClick={onDelete} type="button" className="text-red-500">
                    Delete Files
                </button>
            </div>
            <div className="gallery-container">
                {images?.map((image) => (
                    <GalleryItem
                        key={image.id}
                        image={image}
                        isSelected={selectedImages.includes(image.id)}
                        onSelect={onSelect}
                        onSetFeature={onSetFeature}
                    />
                ))}
            </div>
        </div>
    );
}
