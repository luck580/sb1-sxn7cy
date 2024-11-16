import React from 'react';
import { FileText, Image, Volume2 } from 'lucide-react';
import { getLanguageLabel } from './languageDetection';
import AudioVisualizer from './AudioVisualizer';

interface MessageProps {
  message: {
    type: 'text' | 'file' | 'voice';
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    fileType?: string;
    fileName?: string;
    language?: string;
    transcript?: string;
  };
  darkMode: boolean;
}

function ChatMessage({ message, darkMode }: MessageProps) {
  const isUser = message.sender === 'user';

  const renderContent = () => {
    switch (message.type) {
      case 'text':
        return <p className="text-sm">{message.content}</p>;
      
      case 'voice':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Volume2 size={20} />
              <audio src={message.content} controls className="h-8" />
            </div>
            <AudioVisualizer audioUrl={message.content} darkMode={darkMode} />
            {message.transcript && (
              <p className="text-xs italic">
                Transcript: {message.transcript}
              </p>
            )}
            {message.language && (
              <p className="text-xs opacity-75">
                Language: {getLanguageLabel(message.language)}
              </p>
            )}
          </div>
        );
      
      case 'file':
        if (message.fileType?.startsWith('image/')) {
          return (
            <div className="relative">
              <img
                src={message.content}
                alt={message.fileName}
                className="max-w-xs rounded-lg"
              />
              <span className="text-xs mt-1 opacity-75">{message.fileName}</span>
            </div>
          );
        }
        return (
          <div className="flex items-center space-x-2">
            <FileText size={20} />
            <span className="text-sm">{message.fileName}</span>
          </div>
        );
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser
            ? `bg-indigo-600 text-white ${darkMode ? 'bg-opacity-90' : ''}`
            : darkMode
            ? 'bg-gray-700 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        {renderContent()}
        <div className={`text-xs mt-1 ${isUser ? 'text-indigo-200' : 'opacity-50'}`}>
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;