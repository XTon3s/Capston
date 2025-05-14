import { useState } from 'react';
import { Search } from 'lucide-react';

interface AnimatedTextProps {
  text: string;
  delay: number;
  duration?: number;
  stayDuration?: number;
  fadeOutDuration?: number;
  persist?: boolean;
}

function AnimatedText({ text, delay = 0, duration = 0.3, persist = false}:AnimatedTextProps) {
  return (
    <div
      className="text-3xl font-semibold text-gray-800 opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]"
      style={{ animationDelay: `${delay}s` }}
    >
      {text}
    </div>
  );
}

function TasteAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    // Add analysis logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-8">
      <AnimatedText text="취향분석을 시작하시겠습니까?" delay={0.5} />
      {!isAnalyzing && (
        <button
          onClick={handleStartAnalysis}
          className="mt-6 opacity-0 animate-[fadeIn_0.3s_ease-in-out_1s_forwards] hover:scale-110 transition-transform"
        >
          <Search size={64} className="text-blue-600" />
        </button>
      )}
        {isAnalyzing && (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600">분석 중입니다...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TasteAnalysis;