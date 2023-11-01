import _ from 'lodash';
import React from 'react';
import GalleryItem from './GalleryItem';

export default function Gallery({
    images,
    setImages,
    selectedImages,
    onSelect,
    onDelete,
    onSetFeature,
}) {
    // -----------dnd debounce images------------------
    const debouncedSetItems = _.debounce(setImages, 300);

    // -----------dnd moved image handler------------------
    const moveItem = (fromIndex, toIndex) => {
        const updatedItems = [...images];
        const [movedItem] = updatedItems.splice(fromIndex, 1);
        updatedItems.splice(toIndex, 0, movedItem);
        debouncedSetItems(updatedItems);
    };
    return (
        <>
            <div className="flex justify-between border-b pb-2 gap-4">
                <div className="flex gap-2">
                    <input
                        type="checkbox"
                        checked={selectedImages.length > 0}
                        className="checkbox checkbox-xs"
                    />
                    <p>
                        {selectedImages.length} {selectedImages.length > 1 ? 'Files ' : 'File '}
                        Selected
                    </p>
                </div>
                <button onClick={onDelete} type="button" className="text-red-500">
                    Delete Files
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-2">
                {images?.map((image, index) => (
                    <GalleryItem
                        key={image.id}
                        id={image.id}
                        index={index}
                        image={image}
                        isSelected={selectedImages.includes(image.id)}
                        onSelect={onSelect}
                        onSetFeature={onSetFeature}
                        moveItem={moveItem}
                    />
                ))}
            </div>
        </>
    );
}
