import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import TasteAnalysis from './pages/TasteAnalysis';
import VideoLab from './pages/VideoLab';
import CommentLab from './pages/CommentLab';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="fixed w-full bg-white shadow-md z-50">
          <div className="container mx-auto px-4 py-3 flex items-center">
            <Link to="/" className="text-blue-600 text-xl font-bold">SSokLab</Link>
            <nav className="ml-auto space-x-6 text-gray-600">
              <Link to="/taste-analysis" className="hover:text-blue-600 transition-colors">취향분석실</Link>
              <Link to="/video-lab" className="hover:text-blue-600 transition-colors">영상실험실</Link>
              <Link to="/comment-lab" className="hover:text-blue-600 transition-colors">댓글분석실</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/taste-analysis" element={<TasteAnalysis />} />
            <Route path="/video-lab" element={<VideoLab />} />
            <Route path="/comment-lab" element={<CommentLab />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;