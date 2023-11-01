/* eslint-disable jsx-a11y/label-has-associated-control */
import _ from 'lodash';
import React from 'react';
import ImgIcon from '../../assets/icon/image.png';
import GalleryItem from './GalleryItem';

export default function Gallery({
    images,
    setImages,
    selectedImages,
    handleSelect,
    handleDelete,
    handleSetFeature,
}) {
    // -----------dnd debounce images------------------
    const debouncedSetItems = _.debounce(setImages, 300);

    // -----------dnd moved image handler------------------
    const moveItem = (fromIndex, toIndex) => {
        const updatedItems = [...images];
        const [movedItem] = updatedItems.splice(fromIndex, 1);
        updatedItems.splice(toIndex, 0, movedItem);

        if (toIndex === 0) {
            const currentFeaturedImage = updatedItems.find((item) => item.isFeatured);
            if (currentFeaturedImage) {
                currentFeaturedImage.isFeatured = false;
            }
            movedItem.isFeatured = true;
        }
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
                <button onClick={handleDelete} type="button" className="text-red-500">
                    Delete {selectedImages.length > 1 ? 'Files ' : 'File '}
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
                {images?.map((image, index) => (
                    <GalleryItem
                        key={image.id}
                        id={image.id}
                        index={index}
                        image={image}
                        isSelected={selectedImages.includes(image.id)}
                        handleSelect={handleSelect}
                        handleSetFeature={handleSetFeature}
                        moveItem={moveItem}
                    />
                ))}

                {/* ------Image upload options----- */}
                <div className="col-span-1 relative h-64 bg-cover bg-center border rounded-md flex justify-center items-center">
                    <label className="text-gray-800 border-none p-2 cursor-pointer grid justify-items-center">
                        <input
                            type="file"
                            className="hidden"
                            // onChange={(e) => handleFileUpload(e.target.files)}
                        />
                        <img src={ImgIcon} className="w-8 h-8" alt="img-icon" />
                        Add Images
                    </label>
                </div>
            </div>
        </>
    );
}
