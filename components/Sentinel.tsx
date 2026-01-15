import Image from "next/image";

type SentinelState = "idle" | "detecting" | "executing" | "inactive";

interface SentinelProps {
  state: SentinelState;
  className?: string;
}

export default function Sentinel({ state, className = "" }: SentinelProps) {
  const getAnimationClass = (s: SentinelState) => {
    switch (s) {
      case "idle":
        return "animate-breathe opacity-90";
      case "detecting":
        return "animate-scan opacity-100";
      case "executing":
        return "animate-execute opacity-100";
      case "inactive":
        return "opacity-20 grayscale brightness-50";
      default:
        return "";
    }
  };

  return (
    <div className={`relative transition-all duration-500 ease-in-out ${getAnimationClass(state)} ${className}`}>
      <Image
        src={`/images/${state}.png`}
        alt={`Sigil State: ${state}`}
        fill
        className="object-contain"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
