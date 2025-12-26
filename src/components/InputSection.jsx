// src/components/InputSection.jsx
import { useState } from 'react';
import { Camera, Upload, X, Image as ImageIcon } from 'lucide-react';
import WebcamCapture from './WebcamCapture';

export default function InputSection({ onScan }) {
    const [mode, setMode] = useState('select'); // 'select' | 'camera' | 'preview'
    const [selectedImage, setSelectedImage] = useState(null);

    // Handle File Upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setMode('preview');
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle Webcam Capture
    const handleCapture = (imageSrc) => {
        setSelectedImage(imageSrc);
        setMode('preview');
    };

    return (
        <div className="w-full max-w-2xl bg-surface rounded-2xl shadow-card border border-ui/5 p-6 md:p-10 text-center transition-all">

            {/* MODE 1: SELECTION MENU */}
            {mode === 'select' && (
                <div className="animate-fade-in">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-heading">New Inventory Scan</h2>
                        <p className="text-subtext">Identify product and get real-time pricing.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Open Camera Option */}
                        <button
                            onClick={() => setMode('camera')}
                            className="flex flex-col items-center justify-center gap-3 h-48 border-2 border-dashed border-ui/20 rounded-xl hover:border-accent hover:bg-accent/5 transition group"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                <Camera className="w-6 h-6 text-accent" />
                            </div>
                            <span className="font-semibold text-heading">Use Camera</span>
                        </button>

                        {/* Upload File Option */}
                        <label className="flex flex-col items-center justify-center gap-3 h-48 border-2 border-dashed border-ui/20 rounded-xl hover:border-accent hover:bg-accent/5 transition cursor-pointer group relative">
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                <Upload className="w-6 h-6 text-green-700" />
                            </div>
                            <span className="font-semibold text-heading">Upload Image</span>
                        </label>
                    </div>
                </div>
            )}

            {/* MODE 2: WEBCAM ACTIVE */}
            {mode === 'camera' && (
                <WebcamCapture onCapture={handleCapture} onClose={() => setMode('select')} />
            )}

            {/* MODE 3: PREVIEW & CONFIRM */}
            {mode === 'preview' && selectedImage && (
                <div className="animate-fade-in">
                    <div className="relative w-full h-64 bg-black rounded-xl overflow-hidden mb-6 group">
                        <img src={selectedImage} alt="Preview" className="w-full h-full object-contain" />
                        <button
                            onClick={() => { setSelectedImage(null); setMode('select'); }}
                            className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full hover:bg-red-500 transition"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={() => onScan(selectedImage)}
                        className="w-full bg-accent text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:shadow-accent/50 hover:-translate-y-1 transition flex items-center justify-center gap-2"
                    >
                        <ImageIcon className="w-5 h-5" />
                        Analyze Product
                    </button>
                </div>
            )}
        </div>
    );
}