import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const messages = [
    "Identifying Product...",
    "Scanning Amazon...",
    "Calculating Profit..."
];

export default function LoadingState() {
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIndex((prev) => (prev + 1) % messages.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center space-y-8 p-10 min-h-[400px]">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="w-32 h-32 bg-navy-blue rounded-full"
            />

            <motion.p
                key={msgIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xl font-medium text-navy-blue"
            >
                {messages[msgIndex]}
            </motion.p>
        </div>
    );
}
