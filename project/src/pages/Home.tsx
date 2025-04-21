import React, { useState, useEffect } from 'react';
import { Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AnimatedText({ text, delay, duration = 0.3, stayDuration = 0.8, fadeOutDuration = 0.2, persist = false }) {
  const [opacity, setOpacity] = useState(0);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    const showText = setTimeout(() => {
      setOpacity(1);
    }, delay * 1000);

    if (!persist) {
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
    }

    return () => clearTimeout(showText);
  }, [delay, duration, stayDuration, fadeOutDuration, persist]);

  if (!display) return null;

  return (
    <div
      className="text-3xl font-semibold text-gray-800"
      style={{
        opacity,
        transition: `opacity ${duration}s ease-in-out`,
      }}
    >
      {text}
    </div>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center"> {/* 수정된 부분 */}
      <div className="text-center space-y-4">
        <AnimatedText text="어서오세요" delay={0} />
        <AnimatedText text="SSokLab입니다" delay={1.3} />
        <div className="space-y-6">
          <AnimatedText text="입장하시겠습니까?" delay={2.6} persist={true} />
          <button 
            className="mt-4 opacity-0 animate-[fadeIn_0.3s_ease-in-out_2.6s_forwards] hover:scale-110 transition-transform"
            onClick={() => navigate('/auth')}
          >
            <Youtube size={64} className="text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;