import React, { useState } from 'react';
import { Image, Upload, Share2, Sparkles, Twitter, Facebook, Linkedin } from 'lucide-react';

export default function AsciiPicture() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result as string;
        img.onload = () => {
          const ascii = convertImageToAscii(img);
          setResult(ascii);
          setLoading(false);
        };
      };

      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to process image');
      setLoading(false);
    }
  };

  const convertImageToAscii = (img: HTMLImageElement): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const asciiChars = '@%#*+=-:. ';
    const maxWidth = 100;
    const ratio = img.height / img.width;
    const width = Math.min(maxWidth, img.width);
    const height = Math.floor(width * ratio);

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let ascii = '';

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const idx = (i * width + j) * 4;
        const brightness = (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3;
        const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
        ascii += asciiChars[charIndex];
      }
      ascii += '\n';
    }

    return ascii;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Check out this ASCII art I created!');
    const text = encodeURIComponent('Created with ASCII Picture Generator');

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${text}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tool Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Image className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ASCII Picture Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform your images into beautiful ASCII art. Convert photos into text-based 
            masterpieces perfect for sharing, documentation, or creative projects.
          </p>
        </div>

        {/* Upload Interface */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-6">
            <div className="flex justify-center">
              <label className="w-full max-w-lg flex flex-col items-center px-4 py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100">
                <Upload className="h-12 w-12 text-gray-400" />
                <span className="mt-2 text-base text-gray-600">Upload an image</span>
                <span className="mt-1 text-sm text-gray-500">PNG, JPG up to 5MB</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {error && (
              <div className="text-red-600 text-center">{error}</div>
            )}

            {loading && (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="border-t pt-6">
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    ASCII Art Result
                  </label>
                  {copied && (
                    <span className="text-sm text-green-600">Copied to clipboard!</span>
                  )}
                </div>
                <div className="relative">
                  <pre
                    className="bg-gray-50 rounded-lg p-4 font-mono text-xs leading-[0.6rem] overflow-x-auto whitespace-pre"
                    style={{ lineHeight: '0.6rem', letterSpacing: '0.1em' }}
                  >
                    {result}
                  </pre>
                  <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-2 bg-white rounded-md shadow-sm hover:bg-gray-50"
                    title="Copy to clipboard"
                  >
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                {/* Social Share Buttons */}
                <div className="mt-4 flex items-center justify-center space-x-4">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
                  >
                    <Twitter className="h-5 w-5 mr-2" />
                    Tweet
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center px-4 py-2 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors"
                  >
                    <Facebook className="h-5 w-5 mr-2" />
                    Share
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-colors"
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Upload className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Easy Upload</h3>
            </div>
            <p className="text-gray-600">
              Simply drag and drop or select your image to convert it to ASCII art.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Sparkles className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Instant Conversion</h3>
            </div>
            <p className="text-gray-600">
              See your image transform into ASCII art in seconds.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Share2 className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Easy Sharing</h3>
            </div>
            <p className="text-gray-600">
              Copy and share your ASCII art directly to social media.
            </p>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Creative Uses for ASCII Pictures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Documentation</h3>
              <p className="text-gray-600">Add visual elements to text-only documentation</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Social Media</h3>
              <p className="text-gray-600">Create unique posts that stand out</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Terminal Art</h3>
              <p className="text-gray-600">Design CLI interfaces with ASCII graphics</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Digital Art</h3>
              <p className="text-gray-600">Create unique text-based artwork</p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Tips for Better ASCII Pictures
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">1</span>
              <p>Use high-contrast images for better results</p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">2</span>
              <p>Simple images work better than complex ones</p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm mr-3">3</span>
              <p>Use monospace fonts when displaying the result</p>
            </li>
          </ul>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            About ASCII Picture Generator
          </h2>
          <div className="prose prose-indigo max-w-none">
            <p className="text-gray-600 mb-4">
              Our ASCII Picture Generator transforms your images into beautiful text art using ASCII characters. This technique, known as ASCII art, has been a popular form of digital art since the early days of computing, allowing artists to create visual representations using only text characters.
            </p>
            <p className="text-gray-600 mb-4">
              The generator works by analyzing the brightness values of your image and mapping them to appropriate ASCII characters. Darker areas are represented by denser characters like '@' and '#', while lighter areas use more sparse characters like '.' and ' '. This creates a gradient effect that preserves the visual essence of your original image.
            </p>
            <p className="text-gray-600">
              Whether you're looking to add unique visuals to your documentation, create interesting social media content, or explore the artistic possibilities of text-based art, our ASCII Picture Generator provides an easy and powerful way to transform your images into ASCII masterpieces.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}