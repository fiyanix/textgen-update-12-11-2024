import React, { useState } from 'react';
import { Copy, Download, Share2, Code, FileText, Image, FileEdit } from 'lucide-react';

interface ClipboardMenuProps {
  onCopy: (format: 'text' | 'html' | 'svg' | 'markdown') => void;
  onDownload: (format: 'txt' | 'html' | 'svg') => void;
  onShare?: () => Promise<void>;
  copied: boolean;
}

export default function ClipboardMenu({ onCopy, onDownload, onShare, copied }: ClipboardMenuProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');

  const showTip = (text: string) => {
    setTooltipText(text);
    setShowTooltip(true);
  };

  const hideTip = () => {
    setShowTooltip(false);
  };

  // Only show share button if Web Share API is supported
  const canShare = typeof navigator !== 'undefined' && 
                  navigator.share && 
                  navigator.canShare && 
                  onShare;

  return (
    <div className="absolute top-2 right-2 flex items-center space-x-2">
      {showTooltip && (
        <div className="absolute -top-8 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded">
          {tooltipText}
        </div>
      )}
      
      <div className="flex items-center space-x-1 bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => onCopy('text')}
          onMouseEnter={() => showTip('Copy as Text')}
          onMouseLeave={hideTip}
          className="p-1 text-gray-400 hover:text-white transition-colors"
        >
          <Copy className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => onCopy('html')}
          onMouseEnter={() => showTip('Copy as HTML')}
          onMouseLeave={hideTip}
          className="p-1 text-gray-400 hover:text-white transition-colors"
        >
          <Code className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => onCopy('svg')}
          onMouseEnter={() => showTip('Copy as SVG')}
          onMouseLeave={hideTip}
          className="p-1 text-gray-400 hover:text-white transition-colors"
        >
          <Image className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => onCopy('markdown')}
          onMouseEnter={() => showTip('Copy as Markdown')}
          onMouseLeave={hideTip}
          className="p-1 text-gray-400 hover:text-white transition-colors"
        >
          <FileEdit className="h-4 w-4" />
        </button>

        <div className="w-px h-4 bg-gray-700" />
        
        <button
          onClick={() => onDownload('txt')}
          onMouseEnter={() => showTip('Download as TXT')}
          onMouseLeave={hideTip}
          className="p-1 text-gray-400 hover:text-white transition-colors"
        >
          <FileText className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => onDownload('svg')}
          onMouseEnter={() => showTip('Download as SVG')}
          onMouseLeave={hideTip}
          className="p-1 text-gray-400 hover:text-white transition-colors"
        >
          <Download className="h-4 w-4" />
        </button>

        {canShare && (
          <>
            <div className="w-px h-4 bg-gray-700" />
            <button
              onClick={onShare}
              onMouseEnter={() => showTip('Share')}
              onMouseLeave={hideTip}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {copied && (
        <span className="text-sm text-green-400 ml-2">Copied!</span>
      )}
    </div>
  );
}