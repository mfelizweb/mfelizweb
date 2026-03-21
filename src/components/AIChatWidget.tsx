"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChat, UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const AGENT_NAME = "Maddi";
const AGENT_TITLE = "mfelizweb AI";
const REPLY_TIME_EN = "Usually replies instantly";
const REPLY_TIME_ES = "Responde al instante";

type Lang = "es" | "en";

function useLanguage(): Lang {
    const [lang, setLang] = useState<Lang>("en");
    useEffect(() => {
        if (typeof navigator !== "undefined")
            setLang(navigator.language.toLowerCase().startsWith("es") ? "es" : "en");
    }, []);
    return lang;
}

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

function AIIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
        </svg>
    );
}

export default function AIChatWidget() {
    const lang = useLanguage();
    const L = (es: string, en: string) => (lang === "es" ? es : en);

    const [open, setOpen] = useState(false);
    const [hasGreeted, setHasGreeted] = useState(false);
    const [notifCount, setNotifCount] = useState(1);
    const [dismissed, setDismissed] = useState(false);
    const [input, setInput] = useState("");

    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // RESTAURADO A TU CÓDIGO ORIGINAL (SDK v6)
    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({ api: "/api/chat" }),
    });

    const isLoading = status === "submitted" || status === "streaming";

    useEffect(() => {
        if (open && !hasGreeted) {
            setHasGreeted(true);
            setNotifCount(0);

            const currentUrl = window.location.href;
            const pageTitle = document.title;

            sendMessage({
                text: `[SYSTEM: El usuario acaba de abrir el chat en la URL: ${currentUrl} - Título: ${pageTitle}. Por favor, saluda breve y naturalmente en ${lang === "es" ? "Español" : "Inglés"}. No digas 'Como IA...', solo di hola como Maddi.]`
            });
        }
        if (open) setNotifCount(0);
    }, [open, hasGreeted, sendMessage, lang]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 400);
    }, [open]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ('key' in e && e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            // PARCHE: input?.trim()
            if (!input?.trim() || isLoading) return;
            sendMessage({ text: input });
            setInput("");
        } else if ('preventDefault' in e && !('key' in e)) {
            e.preventDefault();
            // PARCHE: input?.trim()
            if (!input?.trim() || isLoading) return;
            sendMessage({ text: input });
            setInput("");
        }
    };

    const displayMessages = messages.filter((m: UIMessage) => {
        const textParts = m.parts?.filter((p): p is { type: 'text', text: string } => p.type === 'text') || [];
        if (textParts.length > 0 && textParts[0].text.startsWith("[SYSTEM:")) return false;
        return true;
    });

    const handleDismissTeaser = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDismissed(true);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 font-sans">
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
                        <button onClick={handleDismissTeaser} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-300 hover:bg-slate-400 flex items-center justify-center text-white text-[10px] leading-none transition-colors">×</button>
                        <p className="text-xs font-semibold text-slate-800 leading-relaxed">{L("👋 ¿Tienes alguna pregunta? ¡Escríbeme!", "👋 Got a question? Let's chat!")}</p>
                        <div className="absolute bottom-0 right-4 translate-y-full w-0 h-0 border-l-[8px] border-l-transparent border-r-[0px] border-t-[8px] border-t-white" />
                    </motion.div>
                )}
            </AnimatePresence>

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
                        <div className="bg-slate-900 px-5 py-4 flex items-center gap-3 shrink-0">
                            <div className="relative shrink-0">
                                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white font-black"><AIIcon className="w-6 h-6" /></div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-slate-900" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-bold text-sm leading-tight">{AGENT_NAME}</p>
                                <p className="text-white/70 text-[11px] truncate">{AGENT_TITLE}</p>
                                <p className="text-[#25D366] text-[10px] font-semibold">{L(REPLY_TIME_ES, REPLY_TIME_EN)}</p>
                            </div>
                            <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors shrink-0 ml-1">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-slate-50">
                            {displayMessages.map((msg: UIMessage) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm text-sm leading-relaxed whitespace-pre-line relative ${msg.role !== "user" ? "bg-white border border-slate-100 text-slate-800 rounded-tl-sm font-medium" : "bg-slate-900 border border-slate-900 text-slate-100 rounded-tr-sm font-medium"}`}>
                                        {msg.parts?.filter((p): p is { type: 'text', text: string } => p.type === 'text').map((p) => p.text).join('')}
                                    </div>
                                </motion.div>
                            ))}

                            <AnimatePresence>
                                {isLoading && messages[messages.length - 1]?.role === "user" && (
                                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-start">
                                        <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm shadow-sm"><TypingDots /></div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div ref={bottomRef} className="h-1 flex-shrink-0" />
                        </div>

                        <form onSubmit={handleFormSubmit} className="bg-white px-3 py-3 flex items-end gap-2 shrink-0 border-t border-slate-100 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.03)]">
                            <textarea
                                ref={inputRef}
                                value={input || ""}
                                onChange={handleInputChange}
                                onKeyDown={handleFormSubmit}
                                disabled={isLoading}
                                placeholder={L("Escribe un mensaje…", "Type a message…")}
                                rows={1}
                                className="flex-1 resize-none rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-slate-900/10 transition-shadow leading-snug max-h-24 overflow-y-auto disabled:opacity-50"
                                style={{ scrollbarWidth: "none" }}
                            />
                            {/* PARCHE: input?.trim() */}
                            <button type="submit" disabled={!input?.trim() || isLoading} className="shrink-0 w-11 h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md shadow-slate-900/20">
                                <svg className="w-5 h-5 text-white translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                            </button>
                        </form>

                        <div className="bg-white pb-3 pt-1 flex items-center justify-center gap-1.5">
                            <span className="text-[10px] text-slate-400 font-medium tracking-wide">{L("Potenciado por IA Autónoma", "Powered by Autonomous AI")}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button onClick={() => setOpen((v) => !v)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="relative w-[60px] h-[60px] rounded-full bg-slate-900 shadow-xl shadow-slate-900/30 flex items-center justify-center transition-colors hover:bg-slate-800">
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </motion.svg>
                    ) : (
                        <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><AIIcon className="w-7 h-7 text-white" /></motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {notifCount > 0 && !open && (<motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-black text-white shadow-md">{notifCount}</motion.span>)}
                </AnimatePresence>
                {!open && (<><span className="absolute inset-0 rounded-full bg-slate-900 animate-ping opacity-20" /><span className="absolute inset-[-4px] rounded-full border border-slate-900/20" /></>)}
            </motion.button>
        </div>
    );
}