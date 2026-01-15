"use client";

import { useState } from "react";
import Sentinel from "@/components/Sentinel";
import StateToggle from "@/components/StateToggle";
import ScrollyCanvas from "@/components/ScrollyCanvas";

type SentinelState = "idle" | "detecting" | "executing" | "inactive";

import ExecutionContext from "@/components/ExecutionContext";

export default function Home() {
  const [currentState, setCurrentState] = useState<SentinelState>("idle");
  const [highlightedState, setHighlightedState] = useState<SentinelState | SentinelState[] | null>(null);
  const [selectedContext, setSelectedContext] = useState<SentinelState | SentinelState[] | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const stateDescriptions: Record<SentinelState, string> = {
    idle: "System operational. Monitoring event stream. Awaiting signal.",
    detecting: "Signal detected. Validating conditions. Payload signature confirmed.",
    executing: "Event verified. Execution pipeline engaged.",
    inactive: "No valid signal. System dormant.",
  };

  return (
    <>
      <ScrollyCanvas />

      {/* Spacer to separate animation from grid */}
      <div className="h-[8vh] w-full bg-transparent pointer-events-none" />

      {/* Separator Line */}
      <div className="w-full max-w-[1600px] mx-auto px-8 relative z-20">
        <div className="w-full h-px bg-[#e8e3d5]/10 mb-[30px]" />
      </div>

      {/* Main Content - Allow scrolling on desktop now */}
      <main className="relative min-h-screen flex flex-col items-center justify-start text-center selection:bg-[#e8e3d5] selection:text-[#010101] lg:p-0 p-8">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10 fixed" />

        <div id="main-stage" className="relative z-20 flex flex-col items-center justify-start w-full min-h-screen">

          <section className="w-full flex flex-col items-center lg:block">

            {/* Desktop Grid View (Visible on Large Screens) - Full Width/Height */}
            <div className="hidden lg:grid grid-cols-4 w-full h-[85vh] items-center">
              {(["idle", "detecting", "executing", "inactive"] as SentinelState[]).map((state) => {
                // Dim if something is highlighted AND it is not THIS state (checking array or single match)
                // Priority: Hover (highlighted) > Clicked Context (selected) > Current System State (fallback)
                const focusState = highlightedState || selectedContext || currentState;

                const isHighlighted = Array.isArray(focusState)
                  ? focusState.includes(state)
                  : focusState === state;

                // Dim only if user has interacted AND this column isn't the focused one.
                // If hasInteracted is false, isDimmed is false -> All columns glow.
                const isDimmed = hasInteracted && !isHighlighted;

                return (
                  <div
                    key={state}
                    className={`flex flex-col items-center justify-center h-full w-full gap-8 group hover:bg-white/5 transition-all duration-500 border-r border-white/5 last:border-r-0 relative ${isDimmed ? 'opacity-30 blur-sm scale-95' : 'opacity-100 scale-100'}`}
                  >
                    {/* Sentinel - Top 70% to prevent overlap */}
                    <div className="absolute top-0 left-0 right-0 h-[70%] flex items-center justify-center p-8">
                      <Sentinel
                        state={state}
                        className="w-full h-full max-w-none object-contain group-hover:scale-110 drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                      />
                    </div>

                    {/* Label - Bottom 30% reserved */}
                    <div className="absolute bottom-0 left-0 right-0 h-[30%] flex flex-col items-center justify-start pt-4 space-y-4 z-20 pointer-events-none px-4">
                      <h3 className="text-[#e8e3d5] tracking-[0.2em] font-bold uppercase text-3xl xl:text-5xl opacity-90 group-hover:opacity-100 transition-all duration-500 drop-shadow-xl text-center break-words w-full">
                        {state}
                      </h3>
                      <p className="text-[#e8e3d5]/60 font-mono text-sm xl:text-xl max-w-[90%] mx-auto leading-relaxed opacity-60 group-hover:opacity-100 transition-all duration-500 font-medium">
                        {stateDescriptions[state]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile/Tablet Focus View (Visible on Smaller Screens) */}
            <div className="lg:hidden flex flex-col items-center justify-center w-full min-h-[80vh] gap-8">
              <Sentinel
                state={currentState}
                className="w-[80vw] h-[80vw] max-w-[400px] max-h-[400px] md:max-w-[600px] md:max-h-[600px]"
              />

              <div className="w-full flex items-center justify-center px-4 min-h-[4rem] h-auto py-2">
                <p className="text-sm md:text-lg font-mono text-[#e8e3d5] max-w-xs md:max-w-xl leading-relaxed animate-pulse tracking-wide transition-all duration-300">
                  {stateDescriptions[currentState]}
                </p>
              </div>

              <StateToggle
                currentState={currentState}
                onStateChange={setCurrentState}
              />
            </div>
          </section>

          {/* Execution Context Section (Scrolls into view) */}
          <ExecutionContext
            onHighlight={(s) => {
              setHighlightedState(s);
              // Don't set hasInteracted on hover alone. 
              // We want the "All Glowing" state to persist until a selection is made.
            }}
            onStateChange={(s) => {
              setCurrentState(s);
              setHasInteracted(true);
            }}
            onSelectContext={(s) => {
              setSelectedContext(s);
              setHasInteracted(true);
            }}
          />

        </div>

        <footer className="w-full py-8 z-20 text-xs text-[#e8e3d5]/40 text-center px-4 mt-auto">
          Sigil is an unofficial sentinel concept inspired by Rialo’s event-driven execution model.
        </footer>
      </main>
    </>
  );
}
