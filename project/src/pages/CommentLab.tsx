import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface AnimatedTextProps {
  text: string;
  delay: number;
  duration?: number;
  stayDuration?: number;
  fadeOutDuration?: number;
  persist?: boolean;
}

function AnimatedText({ text, delay, duration = 0.3, stayDuration = 1.5, fadeOutDuration = 0.2, persist = false}: AnimatedTextProps) {
  const [opacity, setOpacity] = useState(0);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    const showText = setTimeout(() => {
      setOpacity(1);
    }, delay * 1000);

    const hideText = setTimeout(() => {
      setOpacity(0);
    }, (delay + stayDuration + duration) * 1000);

    const removeText = setTimeout(() => {
      setDisplay(false);
    }, (delay + stayDuration + duration + fadeOutDuration) * 1000);

    return () => {
      clearTimeout(showText);
      clearTimeout(hideText);
      clearTimeout(removeText);
    };
  }, [delay, duration, stayDuration, fadeOutDuration]);

  if (!display) return null;

  return (
    <div
      className="text-xl text-gray-800"
      style={{
        opacity,
        transition: `opacity ${duration}s ease-in-out`,
      }}
    >
      {text}
    </div>
  );
}

function CommentLab() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const handleAnalysis = () => {
    if (!url) return;
    setIsAnalyzing(true);
    setAnalysisStep(1);

    // Simulate analysis steps
    setTimeout(() => setAnalysisStep(2), 2000);
    setTimeout(() => setAnalysisStep(3), 4000);
    setTimeout(() => setAnalysisStep(4), 6000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xl p-6">
        <div className="text-center space-y-8">
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="YouTube 영상의 URL을 넣어주세요"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              disabled={isAnalyzing}
            />
            {!isAnalyzing && (
              <button
                onClick={handleAnalysis}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
              >
                분석 시작
              </button>
            )}
          </div>

          {isAnalyzing && (
            <div className="space-y-4">
              <div className="w-32 h-48 bg-white rounded-b-full border-2 border-gray-300 relative mx-auto">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-blue-400 rounded-b-full transition-all duration-1000"
                  style={{ height: `${analysisStep * 25}%` }}
                ></div>
              </div>
              {analysisStep >= 1 && <AnimatedText text="영상을 가져오는 중입니다.." delay={0} />}
              {analysisStep >= 2 && <AnimatedText text="영상을 분석하는 중입니다.." delay={2} />}
              {analysisStep >= 3 && <AnimatedText text="댓글을 분석하는 중입니다.." delay={4} />}
              {analysisStep >= 4 && <AnimatedText text="잠시만 기다려주세요.." delay={6} persist={true} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentLab;