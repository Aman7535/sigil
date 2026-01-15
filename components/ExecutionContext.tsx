"use client";

import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

type SentinelState = "idle" | "detecting" | "executing" | "inactive";

interface ExecutionContextProps {
    onHighlight: Dispatch<SetStateAction<SentinelState | SentinelState[] | null>>;
    onStateChange: (state: SentinelState) => void;
    onSelectContext: Dispatch<SetStateAction<SentinelState | SentinelState[] | null>>;
}

export default function ExecutionContext({ onHighlight, onStateChange, onSelectContext }: ExecutionContextProps) {
    const cards = [
        {
            title: "Event Ingress",
            description: "Incoming events from users, chains, and external systems enter the execution context.",
            state: ["idle", "detecting"] as SentinelState[], // Highlight Ingress flow
            targetState: "idle" as SentinelState,
            clickSequence: ["idle", "detecting"] as SentinelState[], // Sequence for mobile/click
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M12 3v12" />
                    <path d="M8 11l4 4 4-4" />
                    <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
                </svg>
            ),
        },
        {
            title: "Condition Verification",
            description: "Signals are evaluated and validated before execution is permitted.",
            state: "detecting" as SentinelState,
            targetState: "detecting" as SentinelState,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            ),
        },
        {
            title: "Execution Fabric",
            description: "Verified events are executed deterministically across connected environments.",
            state: "executing" as SentinelState,
            targetState: "executing" as SentinelState,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <rect x="2" y="2" width="20" height="20" rx="2" />
                    <path d="M2 12h20" />
                    <path d="M12 2v20" />
                </svg>
            ),
        },
        {
            title: "External Integration",
            description: "Execution can trigger actions across on-chain and off-chain systems.",
            state: ["executing", "inactive"] as SentinelState[], // Highlight Egress flow
            targetState: "inactive" as SentinelState, // Flow to inactive/completion
            clickSequence: ["executing", "inactive"] as SentinelState[], // Sequence for mobile/click
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
            ),
        },
    ];

    return (
        <section className="w-full max-w-[1600px] px-8 py-[30px] flex flex-col gap-12 z-20 relative bg-[#010101]">
            <div className="w-full h-px bg-[#e8e3d5]/10 mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="group relative flex flex-col gap-4 p-8 border border-[#e8e3d5]/10 bg-[#0a0a0a] hover:bg-[#e8e3d5]/5 hover:border-[#e8e3d5]/20 transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => onHighlight(card.state)}
                        onMouseLeave={() => onHighlight(null)}
                        onClick={() => {
                            const isMobile = window.innerWidth < 1024;

                            // Always scroll to stage for better visibility
                            const element = document.getElementById('main-stage');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }

                            if (isMobile && card.clickSequence) {
                                // Mobile: Play sequence to show flow
                                // @ts-ignore
                                onStateChange(card.clickSequence[0]);
                                onSelectContext(card.state); // Also match context
                                setTimeout(() => {
                                    // @ts-ignore
                                    onStateChange(card.clickSequence[1]);
                                }, 1200);
                            } else {
                                // Desktop: Direct state transition + Lock Context
                                onStateChange(card.targetState);
                                onSelectContext(card.state);
                            }
                        }}
                    >
                        {/* Visual Highlight Bar */}
                        <div className={`absolute top-0 left-0 w-full h-1 bg-[#e8e3d5]/20 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${Array.isArray(card.state) ? card.state.includes('executing') : card.state === 'executing' ? 'bg-[#a9ddd3]' : ''}`} />

                        <div className={`text-[#e8e3d5]/40 group-hover:text-[#e8e3d5] transition-colors duration-300 ${Array.isArray(card.state) ? card.state.includes('executing') : card.state === 'executing' ? 'group-hover:text-[#a9ddd3]' : ''}`}>
                            {card.icon}
                        </div>

                        <h4 className="text-[#e8e3d5] tracking-[0.2em] font-bold uppercase text-lg">
                            {card.title}
                        </h4>

                        <p className="text-[#e8e3d5]/60 font-mono text-xs leading-relaxed">
                            {card.description}
                        </p>
                    </div>
                ))}
            </div>

        </section>
    );
}
