import React, { useState } from 'react';
import { FlipVertical2 } from 'lucide-react';
import TextInput from '../../components/TextInput';
import ClipboardMenu from '../../components/ClipboardMenu';
import { invertText } from '../../utils/textTransformers';
import { shareContent } from '../../utils/shareUtils';

export default function UpsideDownText() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const getFormattedText = (format: 'text' | 'html' | 'svg' | 'markdown') => {
    const upsideDown = invertText(input);
    switch (format) {
      case 'html':
        return `<div style="font-family: system-ui; background: #111827; color: #34D399; padding: 1rem; border-radius: 0.5rem;">${upsideDown}</div>`;
      case 'markdown':
        return '> ' + upsideDown + ' 🙃';
      case 'svg':
        return `<svg width="${upsideDown.length * 14}" height="40" xmlns="http://www.w3.org/2000/svg">
          <style>text { font-family: system-ui; font-size: 24px; }</style>
          <text x="10" y="30" fill="#34D399">${upsideDown}</text>
        </svg>`;
      default:
        return upsideDown;
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
      a.download = `upside-down-text-${Date.now()}.${format}`;
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
      title: 'Upside Down Text',
      text: getFormattedText('text'),
      url: window.location.href
    });
    
    if (!success) {
      // Fallback to clipboard if sharing fails
      handleCopy('text');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <FlipVertical2 className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Upside Down Text Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create fun and unique upside-down text for social media, messages, or creative content. 
            Perfect for standing out online and adding a playful twist to your writing.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-6">
            <TextInput
              value={input}
              onChange={setInput}
              onCopy={() => handleCopy('text')}
              onReset={() => setInput('')}
              placeholder="Type your text here to flip it upside down..."
              label="Original Text"
            />

            <div className="border-t pt-6">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Upside Down Result
                </label>
              </div>
              <div className="relative bg-gray-900 rounded-lg p-4 min-h-[8rem] overflow-x-auto">
                <div className="text-green-400 font-mono whitespace-pre">
                  {input ? invertText(input) : 'Your upside down text will appear here...'}
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
            <h3 className="font-semibold text-gray-900 mb-2">Multiple Formats</h3>
            <p className="text-gray-600">
              Copy as plain text, HTML, SVG, or markdown for different use cases.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Easy Sharing</h3>
            <p className="text-gray-600">
              Share directly or download in various formats.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Styled Export</h3>
            <p className="text-gray-600">
              Download with styling preserved for web and design use.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Tips for Using Upside Down Text
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">1</span>
              <p>Use HTML format to preserve styling when sharing on websites</p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">2</span>
              <p>Download as SVG for high-quality graphics in design tools</p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">3</span>
              <p>Mix regular and upside-down text for creative effects</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}