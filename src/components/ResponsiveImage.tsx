import React from 'react';
import { IMedia } from '../interface/type';

interface ResponsiveImageProps {
    media: IMedia[];
    isTypeSidebar: boolean;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ media, isTypeSidebar }) => {
    const imageMetadata = media[0]['media-metadata'];

    const standardThumbnail = imageMetadata.find(meta => meta.format === 'Standard Thumbnail');
    const mediumThreeByTwo210 = imageMetadata.find(meta => meta.format === 'mediumThreeByTwo210');
    const mediumThreeByTwo440 = imageMetadata.find(meta => meta.format === 'mediumThreeByTwo440');

    return (
        <div>
            <img
                src={mediumThreeByTwo210?.url}
                srcSet={`${standardThumbnail?.url} 75w, ${mediumThreeByTwo210?.url} 210w, ${mediumThreeByTwo440?.url} 440w`}
                sizes="(max-width: 600px) 75px, (max-width: 900px) 210px, 440px"
                alt={media[0].caption || 'Responsive Image'}
                className="w-full h-auto"
            />
            {!isTypeSidebar && <div className='flex justify-end mt-2 text-[8px] text-gray-500'>{media[0].copyright}</div>}
        </div>
    );
};
