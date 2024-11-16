import React from 'react';
import { X, FileText, Image } from 'lucide-react';

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  darkMode: boolean;
}

function FilePreview({ file, onRemove, darkMode }: FilePreviewProps) {
  const isImage = file.type.startsWith('image/');

  return (
    <div
      className={`relative group flex items-center p-2 rounded-lg ${
        darkMode ? 'bg-gray-700' : 'bg-gray-100'
      }`}
    >
      {isImage ? <Image size={20} /> : <FileText size={20} />}
      <span className="ml-2 text-sm truncate max-w-[150px]">{file.name}</span>
      <button
        onClick={onRemove}
        className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default FilePreview;