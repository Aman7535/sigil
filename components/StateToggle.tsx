type SentinelState = "idle" | "detecting" | "executing" | "inactive";

interface StateToggleProps {
    currentState: SentinelState;
    onStateChange: (state: SentinelState) => void;
}

export default function StateToggle({
    currentState,
    onStateChange,
}: StateToggleProps) {
    const states: SentinelState[] = [
        "idle",
        "detecting",
        "executing",
        "inactive",
    ];

    return (
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-2 md:gap-4 mt-8 md:mt-12 bg-white/5 p-1 md:p-2 rounded-xl md:rounded-full backdrop-blur-sm border border-white/5 max-w-[90vw]">
            {states.map((state) => (
                <button
                    key={state}
                    onClick={() => onStateChange(state)}
                    className={`
            px-5 py-3 md:px-8 md:py-3 text-xs md:text-sm font-bold uppercase tracking-[0.2em] rounded-lg md:rounded-full transition-all duration-300
            ${currentState === state
                            ? "bg-[#e8e3d5] text-[#010101] shadow-[0_0_20px_rgba(232,227,213,0.4)] scale-110"
                            : "text-white/40 hover:text-[#e8e3d5] hover:bg-white/10"
                        }
          `}
                >
                    {state}
                </button>
            ))}
        </div>
    );
}
