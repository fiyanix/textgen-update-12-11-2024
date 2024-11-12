import React, { useState } from 'react';
import { Skull } from 'lucide-react';
import TextInput from '../../components/TextInput';
import ClipboardMenu from '../../components/ClipboardMenu';
import { toCursedText } from '../../utils/textTransformers';
import { shareContent } from '../../utils/shareUtils';

export default function CursedText() {
  const [input, setInput] = useState('');
  const [intensity, setIntensity] = useState(2);
  const [copied, setCopied] = useState(false);

  const getFormattedText = (format: 'text' | 'html' | 'svg' | 'markdown') => {
    const cursedText = toCursedText(input, intensity);
    switch (format) {
      case 'html':
        return `<div style="font-family: serif; background: #111827; color: #34D399; padding: 1rem; border-radius: 0.5rem;" class="cursed-text">${cursedText}</div>`;
      case 'markdown':
        return '`' + cursedText + '`';
      case 'svg':
        return `<svg width="${cursedText.length * 14}" height="40" xmlns="http://www.w3.org/2000/svg">
          <style>
            @keyframes float {
              0% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-5px) rotate(1deg); }
              100% { transform: translateY(0px) rotate(0deg); }
            }
            .cursed { animation: float 3s ease-in-out infinite; }
          </style>
          <text x="10" y="30" fill="#34D399" class="cursed">${cursedText}</text>
        </svg>`;
      default:
        return cursedText;
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
      a.download = `cursed-text-${Date.now()}.${format}`;
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
      title: 'Cursed Text',
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
              <Skull className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Cursed Text Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform your text into a creepy, distorted version with our cursed text generator. 
            Perfect for creating eerie effects, horror-themed content, or just adding a spooky touch.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-6">
            <TextInput
              value={input}
              onChange={setInput}
              onCopy={() => handleCopy('text')}
              onReset={() => setInput('')}
              placeholder="Type your text here to curse it..."
              label="Original Text"
            />

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Curse Intensity: {intensity}
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
                <span>Mild</span>
                <span>Haunted</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Cursed Result
                </label>
              </div>
              <div className="relative bg-gray-900 rounded-lg p-4 min-h-[8rem] overflow-x-auto">
                <div className="text-green-400 font-serif whitespace-pre">
                  {input ? toCursedText(input, intensity) : 'Your cursed text will appear here...'}
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
            <h3 className="font-semibold text-gray-900 mb-2">Adjustable Intensity</h3>
            <p className="text-gray-600">
              Control how cursed your text becomes with the intensity slider.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Multiple Effects</h3>
            <p className="text-gray-600">
              Combines character substitution and combining marks for maximum creepiness.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Easy Export</h3>
            <p className="text-gray-600">
              Save and share your cursed text in various formats.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Tips for Using Cursed Text
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">1</span>
              <p>Experiment with different intensity levels for varied effects</p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">2</span>
              <p>Use for horror-themed social media posts</p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">3</span>
              <p>Perfect for Halloween or spooky-themed content</p>
            </li>
          </ul>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Popular Uses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Horror Content</h3>
              <p className="text-gray-600">Create creepy text for horror stories or games</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Social Media</h3>
              <p className="text-gray-600">Make spooky posts that stand out</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Halloween</h3>
              <p className="text-gray-600">Perfect for seasonal content and decorations</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Gaming</h3>
              <p className="text-gray-600">Add creepy text effects to game content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}