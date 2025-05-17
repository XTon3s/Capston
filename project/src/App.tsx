import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import TasteAnalysis from './pages/TasteAnalysis';
import VideoLab from './pages/VideoLab';
import CommentLab from './pages/CommentLab';
import OauthCallback from './pages/OauthCallback';

function App() {
  const [userInfo, setUserInfo] = useState<any>(null);

  // 인증된 사용자 정보를 URL 해시에서 추출
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get('access_token');

    if (token) {
      fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          setUserInfo(data);
          // 해시 제거 (토큰이 주소에 계속 보이지 않도록)
          window.history.replaceState(null, '', window.location.pathname);
        });
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="fixed w-full bg-white shadow-md z-50">
          <div className="container mx-auto px-4 py-3 flex items-center">
            <Link to="/" className="text-blue-600 text-xl font-bold">SSokLab</Link>
            <nav className="ml-auto space-x-6 text-gray-600 flex items-center">
              <Link to="/taste-analysis" className="hover:text-blue-600 transition-colors">취향분석실</Link>
              <Link to="/video-lab" className="hover:text-blue-600 transition-colors">영상실험실</Link>
              <Link to="/comment-lab" className="hover:text-blue-600 transition-colors">댓글분석실</Link>

              {/* 로그인한 경우 프로필 표시 */}
              {userInfo && (
                <div className="flex items-center space-x-2 ml-6">
                  <img src={userInfo.picture} alt="Profile" className="w-8 h-8 rounded-full" />
                  <span className="text-sm text-gray-700">{userInfo.email}</span>
                </div>
              )}
            </nav>
          </div>
        </header>

        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/taste-analysis" element={<TasteAnalysis />} />
            <Route path="/video-lab" element={<VideoLab />} />
            <Route path="/comment-lab" element={<CommentLab />} />
            <Route path="/OauthCallback" element={<OauthCallback />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
