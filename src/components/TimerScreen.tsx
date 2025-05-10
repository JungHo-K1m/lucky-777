import { useEffect, useRef, useState } from "react";

type Props = { onStop: (time: number) => void };

export default function TimerScreen({ onStop }: Props) {
  const [time, setTime] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    onStop(parseFloat(elapsed.toFixed(2)));
  };

  useEffect(() => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      setTime(parseFloat(elapsed.toFixed(2)));
    }, 10);

    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      clearInterval(timerRef.current!);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="text-center">
        <p className="text-5xl sm:text-7xl font-bold font-orbitron mb-6">
            {time.toFixed(2)}초
        </p>
        <p className="text-base sm:text-lg text-gray-300 mb-4">
            버튼을 누르고 손을 떼면 기록됩니다!
        </p>
    </div>
  );
}
