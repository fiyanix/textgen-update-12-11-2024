import React from 'react';
import { Copy, RotateCcw } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onCopy: () => void;
  onReset: () => void;
  placeholder: string;
  label: string;
}

export const TextInput = ({
  value,
  onChange,
  onCopy,
  onReset,
  placeholder,
  label,
}: TextInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none"
        />
        <div className="absolute bottom-2 right-2 flex space-x-2">
          <button
            onClick={onReset}
            className="p-1 text-gray-400 hover:text-gray-600"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={onCopy}
            className="p-1 text-gray-400 hover:text-gray-600"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextInput;