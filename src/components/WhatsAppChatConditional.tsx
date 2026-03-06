"use client";

import { usePathname } from "next/navigation";
import WhatsAppChat from "@/components/WhatsAppChat";

/**
 * Renders the WhatsApp chat widget everywhere EXCEPT on routes
 * where we want a clean, standalone page (e.g. /linksdeapps).
 */
export default function WhatsAppChatConditional() {
    const pathname = usePathname();

    const hidden = pathname?.startsWith("/linksdeapps");

    if (hidden) return null;

    return <WhatsAppChat />;
}
