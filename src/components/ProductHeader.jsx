import React from 'react';

export default function ProductHeader({ name, image }) {
    // Using a placeholder image if none provided
    const displayImage = image ? URL.createObjectURL(image) : "https://placehold.co/100x100?text=Product";

    return (
        <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 mb-4 bg-white p-2">
                <img src={displayImage} alt={name} className="w-full h-full object-contain" />
            </div>
            <h2 className="text-xl font-bold text-prussian-blue text-center">{name || "Unknown Product"}</h2>
        </div>
    );
}
