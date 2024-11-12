import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MirrorText from './pages/tools/MirrorText';
import InvertedText from './pages/tools/InvertedText';
import ReverseText from './pages/tools/ReverseText';
import BigText from './pages/tools/BigText';
import AsciiArt from './pages/tools/AsciiArt';
import UpsideDownText from './pages/tools/UpsideDownText';
import BubbleText from './pages/tools/BubbleText';
import SmallCaps from './pages/tools/SmallCaps';
import CircleText from './pages/tools/CircleText';
import GlitchText from './pages/tools/GlitchText';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mirror-text-generator" element={<MirrorText />} />
            <Route path="/inverted-text-generator" element={<InvertedText />} />
            <Route path="/reverse-text-generator" element={<ReverseText />} />
            <Route path="/big-text-generator" element={<BigText />} />
            <Route path="/ascii-art-generator" element={<AsciiArt />} />
            <Route path="/upside-down-text-generator" element={<UpsideDownText />} />
            <Route path="/bubble-text-generator" element={<BubbleText />} />
            <Route path="/small-caps-generator" element={<SmallCaps />} />
            <Route path="/circle-text-generator" element={<CircleText />} />
            <Route path="/glitch-text-generator" element={<GlitchText />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}