import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import TextInput from '../../components/TextInput';
import { toAsciiArt } from '../../utils/textTransformers';

export default function AsciiArt() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const asciiArt = toAsciiArt(input);
      if (asciiArt && asciiArt.length > 0) {
        await navigator.clipboard.writeText(asciiArt.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleReset = () => {
    setInput('');
  };

  const asciiResult = toAsciiArt(input);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Terminal className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ASCII Art Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform your text into stunning ASCII art. Perfect for creating 
            unique digital art, adding retro flair to your content, or just having fun with text.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-6">
            <TextInput
              value={input}
              onChange={setInput}
              onCopy={handleCopy}
              onReset={handleReset}
              placeholder="Enter your text here..."
              label="Text to Convert"
            />

            <div className="border-t pt-6">
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  ASCII Art Result
                </label>
                {copied && (
                  <span className="text-sm text-green-600">Copied to clipboard!</span>
                )}
              </div>
              <div className="bg-black rounded-lg p-4 min-h-[8rem] font-mono whitespace-pre overflow-x-auto">
                {input ? (
                  <pre className="text-white">
                    {asciiResult.map((line, index) => (
                      <div key={index} className="leading-none">{line}</div>
                    ))}
                  </pre>
                ) : (
                  <p className="text-gray-400 italic">Your ASCII art will appear here...</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the component remains unchanged */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Tips for Great ASCII Art
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">1</span>
              <p>Use simple, clear text for the best results</p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">2</span>
              <p>Capital letters work best for ASCII art style</p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">3</span>
              <p>Keep it simple - less is more with ASCII art</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}