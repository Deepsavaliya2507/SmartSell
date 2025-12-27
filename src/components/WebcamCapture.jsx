import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, X } from 'lucide-react';

export default function WebcamCapture({ onCapture, onClose }) {
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc);
    }, [webcamRef, onCapture]);

    return (
        <div className="relative w-full h-full bg-black rounded-xl overflow-hidden flex flex-col items-center justify-center">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-64 md:h-96 object-cover"
                videoConstraints={{ facingMode: "environment" }}
            />

            <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-6 w-full flex justify-center">
                <button
                    onClick={capture}
                    className="w-16 h-16 rounded-full border-4 border-white bg-accent/80 hover:bg-accent transition flex items-center justify-center shadow-lg"
                >
                    <Camera className="w-8 h-8 text-white" />
                </button>
            </div>
        </div>
    );
}