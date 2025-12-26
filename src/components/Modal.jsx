// src/components/Modal.jsx
import { X } from 'lucide-react';

export default function Modal({ title, isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop (Darken the background) */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* The Modal Content */}
            <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-md border border-ui/10 overflow-hidden transform transition-all scale-100">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-ui/5 bg-bg/50">
                    <h3 className="font-bold text-heading text-lg">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-ui/10 transition">
                        <X className="w-5 h-5 text-subtext" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {children}
                </div>

                {/* Footer (Optional Action) */}
                <div className="px-6 py-4 bg-bg/50 border-t border-ui/5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition text-sm shadow-lg shadow-accent/20"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}