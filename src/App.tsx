import { useState } from "react";
import StartScreen from "./components/StartScreen";
import TimerScreen from "./components/TimerScreen";
import ResultScreen from "./components/ResultScreen";

export default function App() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "result">("idle");
  const [currentTime, setCurrentTime] = useState<number>(0); // 단위: 초
  const [bestRecord, setBestRecord] = useState<number>(() => {
    return parseFloat(localStorage.getItem("bestRecord") || "999");
  });
  const [recentRecords, setRecentRecords] = useState<number[]>(() => {
  const saved = localStorage.getItem("recentRecords");
  return saved ? JSON.parse(saved) : [];
});


  const handleStart = () => setGameState("playing");

  const handleStop = (time: number) => {
    setCurrentTime(time);
    const updatedRecords = [time, ...recentRecords].slice(0, 5);
    setRecentRecords(updatedRecords);
    localStorage.setItem("recentRecords", JSON.stringify(updatedRecords));


    if (Math.abs(7.77 - time) < Math.abs(7.77 - bestRecord)) {
      localStorage.setItem("bestRecord", time.toFixed(2));
      setBestRecord(time);
    }

    setGameState("result");
  };

  const handleRetry = () => setGameState("idle");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
      {gameState === "idle" && <StartScreen onStart={handleStart} />}
      {gameState === "playing" && <TimerScreen onStop={handleStop} />}
      {gameState === "result" && (
        <ResultScreen
          time={currentTime}
          best={bestRecord}
          recentRecords={recentRecords}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
