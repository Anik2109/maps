import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faBookmark, faMapMarkerAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons';

const CustomControl = () => {
    return (
        <div style={{ zIndex: 10000, position: 'absolute' }} className="bottom-4 left-4 flex space-x-4 bg-white p-2 rounded-lg shadow-lg">
            <button className="flex flex-col items-center text-sm">
                <FontAwesomeIcon icon={faLayerGroup} className="text-xl mb-1" />
                <span>Layers</span>
            </button>
            <button className="flex flex-col items-center text-sm">
                <FontAwesomeIcon icon={faBookmark} className="text-xl mb-1" />
                <span>Saved</span>
            </button>
            <button className="flex flex-col items-center text-sm">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xl mb-1" />
                <span>Explore</span>
            </button>
            <button className="flex flex-col items-center text-sm">
                <FontAwesomeIcon icon={faShareAlt} className="text-xl mb-1" />
                <span>Share</span>
            </button>
        </div>
    );
};

export default CustomControl;