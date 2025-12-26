import React from 'react';
import { Upload } from 'lucide-react';

export default function FileUpload({ onUpload }) {
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onUpload(e.target.files[0]);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-2 w-full mt-4">
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center space-y-2 text-slate-500 hover:text-navy-blue transition">
                <Upload className="w-6 h-6" />
                <span className="text-sm font-medium">Or upload a photo</span>
            </label>
            <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
}
