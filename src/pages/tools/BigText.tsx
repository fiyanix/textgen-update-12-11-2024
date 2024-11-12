import React, { useState } from 'react';
import { Type } from 'lucide-react';
import TextInput from '../../components/TextInput';
import ClipboardMenu from '../../components/ClipboardMenu';
import { toBigText } from '../../utils/textTransformers';

export default function BigText() {
  const [input, setInput] = useState('');
  const [size, setSize] = useState<'medium' | 'big'>('big');
  const [copied, setCopied] = useState(false);

  const getFormattedText = (format: 'text' | 'html' | 'svg' | 'markdown') => {
    const blockText = toBigText(input, size);
    switch (format) {
      case 'html':
        return `<pre style="font-family: monospace; white-space: pre; background: #111827; color: #34D399; padding: 1rem; border-radius: 0.5rem;">${blockText}</pre>`;
      case 'markdown':
        return '```\n' + blockText + '\n```';
      case 'svg':
        // Convert to SVG for better quality when pasting into design tools
        const lines = blockText.split('\n');
        const width = Math.max(...lines.map(line => line.length)) * 8;
        const height = lines.length * 16;
        return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <style>text { font-family: monospace; font-size: 14px; }</style>
          ${lines.map((line, i) => `<text x="0" y="${(i + 1) * 16}">${line}</text>`).join('\n')}
        </svg>`;
      default:
        return blockText;
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
      console.error('Failed to copy text:', err);
    }
  };

  const handleDownload = (format: 'txt' | 'html' | 'svg') => {
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
    a.download = `block-text-${Date.now()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Block Text',
          text: getFormattedText('text'),
        });
      }
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Type className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Block Text Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform your text into stylish block letters. Perfect for creating eye-catching 
            headlines, banners, and artistic text displays.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-6">
            <TextInput
              value={input}
              onChange={setInput}
              onCopy={() => handleCopy('text')}
              onReset={() => setInput('')}
              placeholder="Enter your text here..."
              label="Original Text"
            />

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Text Size:</label>
                <div className="flex space-x-2">
                  {(['medium', 'big'] as const).map((sizeOption) => (
                    <button
                      key={sizeOption}
                      onClick={() => setSize(sizeOption)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        size === sizeOption
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {sizeOption.charAt(0).toUpperCase() + sizeOption.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Block Text Result
                </label>
              </div>
              <div className="relative bg-gray-900 rounded-lg p-4 min-h-[8rem] overflow-x-auto">
                <pre className="text-green-400 font-mono whitespace-pre">
                  {input ? toBigText(input, size) : 'Your block text will appear here...'}
                </pre>
                
                <ClipboardMenu
                  onCopy={handleCopy}
                  onDownload={handleDownload}
                  onShare={navigator.share ? handleShare : undefined}
                  copied={copied}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Tips for Using Block Text
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">1</span>
              <p>Choose between medium and big sizes for different effects</p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">2</span>
              <p>Copy as HTML to preserve styling when pasting into websites</p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">3</span>
              <p>Use SVG format for high-quality graphics in design tools</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}