import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import TextInput from '../../components/TextInput';
import ClipboardMenu from '../../components/ClipboardMenu';
import { toGlitchText } from '../../utils/textTransformers';
import { shareContent } from '../../utils/shareUtils';

export default function GlitchText() {
  const [input, setInput] = useState('');
  const [intensity, setIntensity] = useState(2);
  const [copied, setCopied] = useState(false);

  const getFormattedText = (format: 'text' | 'html' | 'svg' | 'markdown') => {
    const glitched = toGlitchText(input, intensity);
    switch (format) {
      case 'html':
        return `<div style="font-family: system-ui; background: #111827; color: #34D399; padding: 1rem; border-radius: 0.5rem;">${glitched}</div>`;
      case 'markdown':
        return '> ' + glitched + ' ⚡';
      case 'svg':
        return `<svg width="${glitched.length * 14}" height="40" xmlns="http://www.w3.org/2000/svg">
          <style>text { font-family: system-ui; font-size: 24px; }</style>
          <text x="10" y="30" fill="#34D399">${glitched}</text>
        </svg>`;
      default:
        return glitched;
    }
  };

  const handleCopy = async (format: 'text' | 'html' | 'svg' | 'markdown') => {
    try {
      const text = getFormattedText(format);
      if (format === 'html') {
        const type = 'text/html';
        const blob = new Blob([text], { type });
        const data = [new ClipboardItem({ [type]: blob })];
        await navigator.clipboard.write(data);
      } else {
        await navigator.clipboard.writeText(text);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Failed to copy:', err);
    }
  };

  const handleDownload = (format: 'txt' | 'html' | 'svg') => {
    try {
      const text = getFormattedText(format === 'txt' ? 'text' : format);
      const mimeTypes = {
        txt: 'text/plain',
        html: 'text/html',
        svg: 'image/svg+xml'
      };
      const blob = new Blob([text], { type: mimeTypes[format] });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `glitch-text-${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.warn('Failed to download:', err);
    }
  };

  const handleShare = async () => {
    const success = await shareContent({
      title: 'Glitch Text',
      text: getFormattedText('text'),
      url: window.location.href
    });
    
    if (!success) {
      handleCopy('text');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Zap className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Glitch Text Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform your text into glitchy, corrupted-looking characters. Perfect for 
            creating unique effects, cyberpunk aesthetics, or adding a touch of chaos.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-6">
            <TextInput
              value={input}
              onChange={setInput}
              onCopy={() => handleCopy('text')}
              onReset={() => setInput('')}
              placeholder="Enter your text to glitch it..."
              label="Original Text"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Glitch Intensity: {intensity}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtle</span>
                <span>Extreme</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Glitch Result
                </label>
              </div>
              <div className="relative bg-gray-900 rounded-lg p-4 min-h-[8rem] overflow-x-auto">
                <div className="text-green-400 font-mono whitespace-pre">
                  {input ? toGlitchText(input, intensity) : 'Your glitched text will appear here...'}
                </div>
                
                <ClipboardMenu
                  onCopy={handleCopy}
                  onDownload={handleDownload}
                  onShare={handleShare}
                  copied={copied}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Adjustable Effects</h3>
            <p className="text-gray-600">
              Control the intensity of the glitch effect with the slider.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Multiple Formats</h3>
            <p className="text-gray-600">
              Export as plain text, HTML, SVG, or markdown.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Easy Sharing</h3>
            <p className="text-gray-600">
              Share your glitched text directly or download it.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Tips for Using Glitch Text
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">1</span>
              <p>Adjust intensity for different effects - subtle for readability, extreme for chaos</p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">2</span>
              <p>Use HTML format to preserve styling when sharing on websites</p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">3</span>
              <p>Mix regular and glitched text for emphasis</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}