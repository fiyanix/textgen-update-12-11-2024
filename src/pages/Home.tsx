import React from 'react';
import { Link } from 'react-router-dom';
import {
  FlipVertical,
  FlipHorizontal,
  RotateCcw,
  Type,
  Terminal,
  FlipVertical2,
  Circle,
  TextCursor,
  CircleDot,
  Sparkles,
  Share2,
  Palette,
  Zap
} from 'lucide-react';

const tools = [
  {
    name: 'Big Text Generator',
    description: 'Create eye-catching block letters and ASCII art text',
    icon: Type,
    path: '/big-text-generator',
    features: ['Multiple sizes', 'Block letter style', 'Perfect for banners']
  },
  {
    name: 'ASCII Art Generator',
    description: 'Transform text into stunning ASCII art patterns',
    icon: Terminal,
    path: '/ascii-art-generator',
    features: ['Pixel-perfect art', 'Multiple styles', 'Export options']
  },
  {
    name: 'Mirror Text Generator',
    description: 'Create mirror image text that reads backwards',
    icon: FlipHorizontal,
    path: '/mirror-text-generator',
    features: ['Perfect reflection', 'Unicode support', 'Creative designs']
  },
  {
    name: 'Inverted Text Generator',
    description: 'Flip your text upside down for creative effects',
    icon: FlipVertical,
    path: '/inverted-text-generator',
    features: ['Full character support', 'Instant preview', 'Easy sharing']
  },
  {
    name: 'Reverse Text Generator',
    description: 'Write text in reverse order',
    icon: RotateCcw,
    path: '/reverse-text-generator',
    features: ['Character by character', 'Preserve formatting', 'Multiple formats']
  },
  {
    name: 'Upside Down Text Generator',
    description: 'Turn text upside down character by character',
    icon: FlipVertical2,
    path: '/upside-down-text-generator',
    features: ['Unicode characters', 'Social media ready', 'Copy & share']
  },
  {
    name: 'Bubble Text Generator',
    description: 'Create bubble-style text effects',
    icon: Circle,
    path: '/bubble-text-generator',
    features: ['Rounded letters', 'Playful style', 'Perfect for social']
  },
  {
    name: 'Small Caps Generator',
    description: 'Convert text to elegant small capital letters',
    icon: TextCursor,
    path: '/small-caps-generator',
    features: ['Professional look', 'Typography focus', 'Multiple formats']
  },
  {
    name: 'Circle Text Generator',
    description: 'Generate text with circular decorations',
    icon: CircleDot,
    path: '/circle-text-generator',
    features: ['Outlined & filled', 'Unicode support', 'Instant preview']
  },
  {
    name: 'Glitch Text Generator',
    description: 'Create corrupted, glitchy text effects',
    icon: Zap,
    path: '/glitch-text-generator',
    features: ['Adjustable intensity', 'Unique effects', 'Cyberpunk style']
  }
];

const features = [
  {
    icon: Sparkles,
    title: 'Real-time Preview',
    description: 'See your text transform instantly as you type'
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Copy, download, or share directly to social media'
  },
  {
    icon: Palette,
    title: 'Multiple Formats',
    description: 'Export as plain text, HTML, SVG, or markdown'
  }
];

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Text Generators
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Transform your text into creative styles with our collection of text generators. 
              Perfect for social media, design projects, and creative content.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <feature.icon className="h-6 w-6 text-indigo-600" />
                  <h3 className="ml-3 text-lg font-medium text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Choose Your Generator
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Select from our collection of text generators to create unique and engaging content
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <tool.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h3>
                </div>
                <p className="text-gray-500 mb-4">{tool.description}</p>
                <ul className="space-y-2">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to transform your text?
            </h2>
            <p className="mt-4 text-xl text-indigo-100">
              Choose any generator above to get started with your text transformation journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;