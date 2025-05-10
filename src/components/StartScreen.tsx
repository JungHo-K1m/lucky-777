type Props = { onStart: () => void };

export default function StartScreen({ onStart }: Props) {
  return (
    <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">🎯 행운의 7.77초 잡기</h1>
        <p className="mb-4">버튼을 눌렀다 7.77초쯤에 손을 떼보세요!</p>
        <button
            className="w-full max-w-xs text-lg py-4 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
            onClick={onStart}
            >
            시작하기
        </button>
    </div>
  );
}
