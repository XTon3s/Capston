import { useState, useEffect } from 'react';
import { Youtube } from 'lucide-react';
interface AnimatedTextProps {
  text: string;
  delay: number;
  duration?: number;
  stayDuration?: number;
  fadeOutDuration?: number;
  persist?: boolean;
}

function AnimatedText({
  text,
  delay,
  duration = 0.3,
  stayDuration = 0.8,
  fadeOutDuration = 0.2,
  persist = false
}: AnimatedTextProps) {
  const [opacity, setOpacity] = useState(0);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    const showText = setTimeout(() => setOpacity(1), delay * 1000);

    if (!persist) {
      const hideText = setTimeout(() => setOpacity(0), (delay + stayDuration + duration) * 1000);
      const removeText = setTimeout(() => setDisplay(false), (delay + stayDuration + duration + fadeOutDuration) * 1000);
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
      style={{ opacity, transition: `opacity ${duration}s ease-in-out` }}
    >
      {text}
    </div>
  );
}

function openGoogleLogin() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

  const scope = [
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ].join(' ');

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${encodeURIComponent(scope)}`;

  window.location.href = url;
}

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <AnimatedText text="어서오세요" delay={0} />
        <AnimatedText text="SSokLab입니다" delay={1.3} />
        <div className="space-y-6">
          <AnimatedText text="입장하시겠습니까?" delay={2.6} persist />
          <button
            className="mt-4 opacity-0 animate-[fadeIn_0.3s_ease-in-out_2.6s_forwards] hover:scale-110 transition-transform"
            onClick={openGoogleLogin}
          >
            <Youtube size={64} className="text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
