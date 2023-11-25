import React from 'react';

const UnderConstruction = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="text-center">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlPWWCfznuE_It8mbYB4x3ev8uz9Andw-hK6lMeFYa&s"
                    alt="Under Construction"
                    className="mb-4 mx-auto"
                    style={{ maxWidth: '200px' }}
                />
                <h1 className="text-3xl font-semibold text-gray-800">This Page is Under Construction</h1>
                <p className="text-gray-600 mt-2">We're working hard to bring you something awesome. Stay tuned!</p>
            </div>
        </div>
    );
};

export default UnderConstruction;
