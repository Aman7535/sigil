"use client";

import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 120;

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Track scroll progress within the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll (0 to 1) to frame index (0 to 119)
    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            // Sequence is 1-indexed and 4 digits (e.g. frame_0001.png)
            const paddedIndex = (i + 1).toString().padStart(4, '0');
            img.src = `/sequence/frame_${paddedIndex}.png`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Drawing logic
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        // Resize canvas if needed (to match physical pixels)
        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
        }

        // Apply scaling for Retina/High-DPI
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Optimize quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Cover logic
        const cvRatio = width / height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > cvRatio) {
            drawHeight = height;
            drawWidth = height * imgRatio;
            offsetY = 0;
            offsetX = (width - drawWidth) / 2;
        } else {
            drawWidth = width;
            drawHeight = width / imgRatio;
            offsetX = 0;
            offsetY = (height - drawHeight) / 2;
        }

        // Debug log once to check resolution mismatch
        if (index === 0 && Math.random() < 0.01) {
            console.log(`[Sigil] Canvas Logical: ${width}x${height} | Physical: ${canvas.width}x${canvas.height} | Image: ${img.width}x${img.height} | DPR: ${dpr}`);
        }

        // Clear and draw relative to the scaled context
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // initial render when loaded
    useEffect(() => {
        if (isLoaded) {
            renderFrame(0);
        }
    }, [isLoaded]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (isLoaded) {
                renderFrame(Math.round(currentIndex.get()));
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, currentIndex]);

    // Subscribe to scroll updates
    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (isLoaded) {
            renderFrame(Math.round(latest));
        }
    });

    return (
        <div ref={containerRef} className="h-[500vh] relative bg-[#010101]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover block"
                />

                {/* Optional Overlays - Minimal execution data */}
                <motion.div
                    className="absolute bottom-12 left-12 text-[#e8e3d5]/60 font-mono text-xs tracking-widest uppercase pointer-events-none"
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]) }}
                >
                    Sequence Active
                </motion.div>

                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#e8e3d5] font-extralight text-2xl tracking-[0.5em] uppercase pointer-events-none mix-blend-difference"
                    style={{ opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]) }}
                >
                    Processing
                </motion.div>

                {/* Main Title Overlay - Fades out on scroll */}
                <motion.header
                    className="absolute top-12 left-0 right-0 z-50 flex flex-col items-center pointer-events-none mix-blend-difference"
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                >
                    <h1 className="text-6xl md:text-9xl lg:text-8xl font-semibold tracking-[0.2em] uppercase mb-4 text-[#e8e3d5] drop-shadow-2xl opacity-80">
                        Sigil
                    </h1>
                    <p className="text-[10px] md:text-xs text-[#e8e3d5]/60 tracking-tight uppercase font-light">
                        An execution sentinel inspired by Rialo’s event-driven architecture
                    </p>
                </motion.header>
            </div>
        </div>
    );
}
