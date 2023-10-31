/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Image1 from '../assets/images/image-1.webp';
import Image10 from '../assets/images/image-10.jpeg';
import Image11 from '../assets/images/image-11.jpeg';
import Image2 from '../assets/images/image-2.webp';
import Image3 from '../assets/images/image-3.webp';
import Image4 from '../assets/images/image-4.webp';
import Image5 from '../assets/images/image-5.webp';
import Image6 from '../assets/images/image-6.webp';
import Image7 from '../assets/images/image-7.webp';
import Image8 from '../assets/images/image-8.webp';
import Image9 from '../assets/images/image-9.webp';
import Gallery from '../components/gallery/Gallery';

export default function Home() {
    // all images list
    const [images, setImages] = useState([
        { id: 1, url: Image1, alt: 'Image 1', isFeatured: true },
        { id: 2, url: Image2, alt: 'Image 2', isFeatured: false },
        { id: 3, url: Image3, alt: 'Image 3', isFeatured: false },
        { id: 4, url: Image4, alt: 'Image 4', isFeatured: false },
        { id: 5, url: Image5, alt: 'Image 5', isFeatured: false },
        { id: 6, url: Image6, alt: 'Image 6', isFeatured: false },
        { id: 7, url: Image7, alt: 'Image 7', isFeatured: false },
        { id: 8, url: Image8, alt: 'Image 8', isFeatured: false },
        { id: 9, url: Image9, alt: 'Image 9', isFeatured: false },
        { id: 10, url: Image10, alt: 'Image 10', isFeatured: false },
        { id: 11, url: Image11, alt: 'Image 11', isFeatured: false },
    ]);
    const [selectedImages, setSelectedImages] = useState([]);

    // handle image select
    const handleSelect = (id) => {
        if (selectedImages.includes(id)) {
            setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
        } else {
            setSelectedImages([...selectedImages, id]);
        }
    };

    // handle image delete
    const handleDelete = () => {
        setImages(images.filter((image) => !selectedImages.includes(image.id)));
        setSelectedImages([]);
    };

    // handle feature image select
    const handleSetFeature = (e, id) => {
        e.stopPropagation();
        e.stopPropagation();
        setImages((prevImages) => {
            const updatedImages = prevImages.map((image) =>
                image.id === id ? { ...image, isFeatured: true } : { ...image, isFeatured: false }
            );
            const featuredImage = updatedImages.find((image) => image.id === id);
            const nonFeaturedImages = updatedImages.filter((image) => image.id !== id);
            return [featuredImage, ...nonFeaturedImages];
        });
    };

    // drag and drop functionality
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedImages = Array.from(images);
        const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, reorderedItem);

        setImages(reorderedImages);
    };
    return (
        <Gallery
            images={images}
            selectedImages={selectedImages}
            onSelect={handleSelect}
            onDelete={handleDelete}
            onSetFeature={handleSetFeature}
            onDragEnd={onDragEnd}
        />
    );
}
