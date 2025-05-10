import confetti from "canvas-confetti";
import { useEffect } from "react";

type Props = {
  time: number;
  best: number;
  recentRecords: number[];
  onRetry: () => void;
};

export default function ResultScreen({ time, best, recentRecords, onRetry }: Props) {
  const diff = Math.abs(7.77 - time);
  const isSuccess = diff <= 0.1;

  useEffect(() => {
    if (isSuccess) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [isSuccess]);

  return (
    <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4">
            당신의 기록: {time.toFixed(2)}초
        </h2>
        <p className="mb-2 text-xl">
            {isSuccess ? "🎉 성공! 행운의 시간에 도달했습니다!" : "😢 아쉽습니다!"}
        </p>
        <p className="mb-2">최고 근접 기록: {best.toFixed(2)}초</p>
        <p className="mb-4">최근 기록: {recentRecords.map(r => r.toFixed(2)).join(" / ")}</p>
        <button
            className="w-full max-w-xs text-lg py-4 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
            onClick={onRetry}
            >
            다시 도전하기
        </button>
    </div>
  );
}
