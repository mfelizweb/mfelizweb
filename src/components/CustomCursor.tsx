"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };

        const growCursor = () => {
            cursorRef.current?.setAttribute("data-hover", "true");
        };

        const shrinkCursor = () => {
            cursorRef.current?.removeAttribute("data-hover");
        };

        window.addEventListener("mousemove", move);

        const links = document.querySelectorAll("a, button, [data-cursor]");
        links.forEach((el) => {
            el.addEventListener("mouseenter", growCursor);
            el.addEventListener("mouseleave", shrinkCursor);
        });

        return () => {
            window.removeEventListener("mousemove", move);
            links.forEach((el) => {
                el.removeEventListener("mouseenter", growCursor);
                el.removeEventListener("mouseleave", shrinkCursor);
            });
        };
    }, [x, y]);

    return (
        <>
            {/* Trailing ring */}
            <motion.div
                ref={cursorRef}
                style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
                className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
            >
                <motion.div
                    className="w-10 h-10 rounded-full border border-blue-500 transition-all duration-150"
                    whileHover={{ scale: 2.5 }}
                    style={{ marginLeft: "-20px", marginTop: "-20px" }}
                />
            </motion.div>

            {/* Sharp dot */}
            <motion.div
                style={{ x, y, translateX: "-50%", translateY: "-50%" }}
                className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
            >
                <div className="w-2 h-2 rounded-full bg-blue-600" style={{ marginLeft: "-4px", marginTop: "-4px" }} />
            </motion.div>
        </>
    );
}
