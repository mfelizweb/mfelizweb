"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WA_NUMBER = "19292406734"; // your WhatsApp number (no + or spaces)
const AGENT_NAME = "Maddiel";
const AGENT_TITLE = "mfelizweb";
const REPLY_TIME_EN = "Usually replies in minutes";
const REPLY_TIME_ES = "Responde en minutos";

type Lang = "es" | "en";
type Step = "idle" | "chat" | "sending";

interface Message {
    id: number;
    from: "agent" | "user";
    text: string;
    time: string;
}

function now() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function useLanguage(): Lang {
    const [lang, setLang] = useState<Lang>("en");
    useEffect(() => {
        if (typeof navigator !== "undefined")
            setLang(navigator.language.toLowerCase().startsWith("es") ? "es" : "en");
    }, []);
    return lang;
}

// ── Typing dots ───────────────────────────────────────────────────────────────
function TypingDots() {
    return (
        <div className="flex items-center gap-1 px-3 py-2.5">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="w-2 h-2 rounded-full bg-slate-400"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                />
            ))}
        </div>
    );
}

// ── WhatsApp icon SVG ─────────────────────────────────────────────────────────
function WAIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

// ── Main widget ───────────────────────────────────────────────────────────────
export default function WhatsAppChat() {
    const lang = useLanguage();
    const L = (es: string, en: string) => (lang === "es" ? es : en);

    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<Step>("idle");
    const [showTyping, setShowTyping] = useState(false);
    const [input, setInput] = useState("");
    const [hasGreeted, setHasGreeted] = useState(false);
    const [notifCount, setNotifCount] = useState(1);
    const [messages, setMessages] = useState<Message[]>([]);
    const [dismissed, setDismissed] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Greeting message with delay
    useEffect(() => {
        if (open && !hasGreeted) {
            setHasGreeted(true);
            setStep("chat");
            setShowTyping(true);
            const t1 = setTimeout(() => {
                setShowTyping(false);
                setMessages([
                    {
                        id: 1,
                        from: "agent",
                        text: L(
                            "👋 ¡Hola! ¿Cómo podemos ayudarte hoy?",
                            "👋 Hello! How can we help you today?"
                        ),
                        time: now(),
                    },
                ]);
                setNotifCount(0);
            }, 1200);
            return () => clearTimeout(t1);
        }
        if (open) setNotifCount(0);
    }, [open]);

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, showTyping]);

    // Focus input on open
    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 400);
    }, [open]);

    const handleSend = () => {
        const text = input.trim();
        if (!text) return;

        // Add user message to UI
        setMessages((prev) => [...prev, { id: Date.now(), from: "user", text, time: now() }]);
        setInput("");
        setStep("sending");

        // Agent "seen + typing" effect
        setTimeout(() => setShowTyping(true), 600);

        // Build WhatsApp URL and open after short delay
        const waText = encodeURIComponent(
            L(
                `Hola, te escribo desde mfelizweb.com:\n\n"${text}"`,
                `Hi, I'm writing from mfelizweb.com:\n\n"${text}"`
            )
        );
        const waUrl = `https://wa.me/${WA_NUMBER}?text=${waText}`;

        setTimeout(() => {
            setShowTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    from: "agent",
                    text: L(
                        "✅ ¡Mensaje recibido! Te redirijo a WhatsApp para continuar la conversación.",
                        "✅ Got it! Redirecting you to WhatsApp to continue the chat."
                    ),
                    time: now(),
                },
            ]);

            setTimeout(() => {
                window.open(waUrl, "_blank");
                setStep("chat");
            }, 1200);
        }, 2000);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Dismiss teaser bubble
    const handleDismissTeaser = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDismissed(true);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">

            {/* ── Teaser bubble ── */}
            <AnimatePresence>
                {!open && !dismissed && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 8 }}
                        transition={{ delay: 3, duration: 0.4, ease: "easeOut" }}
                        className="relative max-w-[220px] rounded-2xl rounded-br-sm bg-white shadow-xl border border-slate-100 px-4 py-3 cursor-pointer select-none"
                        onClick={() => setOpen(true)}
                    >
                        {/* Close X */}
                        <button
                            onClick={handleDismissTeaser}
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-300 hover:bg-slate-400 flex items-center justify-center text-white text-[10px] leading-none transition-colors"
                        >
                            ×
                        </button>
                        <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                            {L("👋 ¿Tienes alguna pregunta? ¡Escríbeme!", "👋 Got a question? Let's chat!")}
                        </p>
                        {/* Tail */}
                        <div className="absolute bottom-0 right-4 translate-y-full w-0 h-0 border-l-[8px] border-l-transparent border-r-[0px] border-t-[8px] border-t-white" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Chat panel ── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                        className="w-[340px] sm:w-[380px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-200 flex flex-col"
                        style={{ maxHeight: "520px" }}
                    >
                        {/* Header */}
                        <div className="bg-[#075E54] px-5 py-4 flex items-center gap-3 shrink-0">
                            {/* Avatar */}
                            <div className="relative shrink-0">
                                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-lg">
                                    M
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#075E54]" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-white font-bold text-sm leading-tight">{AGENT_NAME}</p>
                                <p className="text-white/70 text-[11px] truncate">{AGENT_TITLE}</p>
                                <p className="text-[#25D366] text-[10px] font-semibold">
                                    {L(REPLY_TIME_ES, REPLY_TIME_EN)}
                                </p>
                            </div>

                            {/* WhatsApp icon */}
                            <WAIcon className="w-5 h-5 text-white/60 shrink-0" />

                            {/* Close */}
                            <button
                                onClick={() => setOpen(false)}
                                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors shrink-0 ml-1"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages area */}
                        <div
                            className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
                            style={{
                                background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5d5cb' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\"), linear-gradient(135deg, #e5f4e8 0%, #ddf0e8 100%)",
                            }}
                        >
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm text-sm leading-relaxed whitespace-pre-line relative
                      ${msg.from === "agent"
                                                ? "bg-white text-slate-800 rounded-tl-sm"
                                                : "bg-[#DCF8C6] text-slate-800 rounded-tr-sm"}`}
                                    >
                                        {msg.text}
                                        <div className={`text-[10px] mt-1 ${msg.from === "user" ? "text-right text-slate-400" : "text-slate-400"} flex items-center gap-1 ${msg.from === "user" ? "justify-end" : ""}`}>
                                            {msg.time}
                                            {msg.from === "user" && (
                                                <svg className="w-3.5 h-3.5 text-[#53bdeb]" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M18 7l-1.41-1.42-6.34 6.34 1.41 1.41L18 7zm4.24-1.42L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.42zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            <AnimatePresence>
                                {showTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm">
                                            <TypingDots />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div ref={bottomRef} />
                        </div>

                        {/* Input area */}
                        <div className="bg-[#f0f0f0] px-3 py-3 flex items-end gap-2 shrink-0">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={step === "sending"}
                                placeholder={L("Escribe un mensaje…", "Type a message…")}
                                rows={1}
                                className="flex-1 resize-none rounded-full bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none border border-slate-200 focus:border-[#25D366] transition-colors leading-snug max-h-24 overflow-y-auto disabled:opacity-50"
                                style={{ scrollbarWidth: "none" }}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || step === "sending"}
                                className="shrink-0 w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md shadow-green-500/30"
                            >
                                <svg className="w-5 h-5 text-white translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                </svg>
                            </button>
                        </div>

                        {/* WhatsApp branding */}
                        <div className="bg-[#f0f0f0] pb-2 flex items-center justify-center gap-1.5 border-t border-slate-200">
                            <WAIcon className="w-3 h-3 text-[#25D366]" />
                            <span className="text-[10px] text-slate-400">
                                {L("Continúa en WhatsApp", "Continue on WhatsApp")}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── FAB button ── */}
            <motion.button
                onClick={() => setOpen((v) => !v)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-[60px] h-[60px] rounded-full bg-[#25D366] shadow-xl shadow-green-500/40 flex items-center justify-center transition-colors hover:bg-[#1ebe5d]"
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.svg
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-6 h-6 text-white"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </motion.svg>
                    ) : (
                        <motion.div
                            key="wa"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <WAIcon className="w-7 h-7 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Notification badge */}
                <AnimatePresence>
                    {notifCount > 0 && !open && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-black text-white shadow-md"
                        >
                            {notifCount}
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Pulse ring */}
                {!open && (
                    <>
                        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
                        <span className="absolute inset-[-4px] rounded-full border border-[#25D366]/30" />
                    </>
                )}
            </motion.button>
        </div>
    );
}
