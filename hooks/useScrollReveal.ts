"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollReveal(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // pequeño delay para suavidad perceptual
                    requestAnimationFrame(() => {
                        setVisible(true);
                    });
                    observer.disconnect();
                }
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -80px 0px", // menos agresivo
                ...options,
            }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [options]);

    return { ref, visible };
}
