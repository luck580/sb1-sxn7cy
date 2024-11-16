import React, { useState, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';
import ChatMessage from './ChatMessage';
import FilePreview from './FilePreview';
import VoiceRecorder from './VoiceRecorder';
import { AIResponseGenerator } from './AIResponseGenerator';
import { detectLanguage, getLanguageLabel } from './languageDetection';

interface ChatInterfaceProps {
  darkMode: boolean;
}

interface Message {
  id: string;
  type: 'text' | 'file' | 'voice';
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  fileType?: string;
  fileName?: string;
  language?: string;
  suggestedActions?: string[];
}

function ChatInterface({ darkMode }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!input.trim() && files.length === 0) return;

    const newMessages: Message[] = [];
    const userLanguage = detectUserLanguage(input);

    if (input.trim()) {
      newMessages.push({
        id: Date.now().toString(),
        type: 'text',
        content: input.trim(),
        sender: 'user',
        timestamp: new Date(),
        language: userLanguage,
      });

      // Generate AI response
      const aiResponse = AIResponseGenerator.generateResponse(input.trim(), userLanguage);
      newMessages.push({
        id: `ai-${Date.now()}`,
        type: 'text',
        content: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        language: userLanguage,
        suggestedActions: aiResponse.suggestedActions,
      });
    }

    // Handle files
    for (const file of files) {
      newMessages.push({
        id: `file-${Date.now()}-${file.name}`,
        type: 'file',
        content: URL.createObjectURL(file),
        sender: 'user',
        timestamp: new Date(),
        fileType: file.type,
        fileName: file.name,
      });

      // Generate AI response for file
      const aiResponse = AIResponseGenerator.generateResponse(
        `analyze ${file.type.split('/')[0]}`,
        userLanguage
      );
      newMessages.push({
        id: `ai-${Date.now()}`,
        type: 'text',
        content: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        language: userLanguage,
        suggestedActions: aiResponse.suggestedActions,
      });
    }

    setMessages((prev) => [...prev, ...newMessages]);
    setInput('');
    setFiles([]);
    setSelectedAction(null);
  };

  const handleVoiceRecording = async (audioBlob: Blob, language: string) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    
    setMessages((prev) => [
      ...prev,
      {
        id: `voice-${Date.now()}`,
        type: 'voice',
        content: audioUrl,
        sender: 'user',
        timestamp: new Date(),
        language,
      },
    ]);

    // Generate AI response for voice message
    const aiResponse = AIResponseGenerator.generateResponse('voice message', language);
    setMessages((prev) => [
      ...prev,
      {
        id: `ai-${Date.now()}`,
        type: 'text',
        content: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        language,
        suggestedActions: aiResponse.suggestedActions,
      },
    ]);
  };

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    setInput(action);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const detectUserLanguage = (text: string): string => {
    const frenchPattern = /[àáâãäçèéêëìíîïñòóôõöùúûüý]|(\b(je|tu|il|nous|vous|ils|le|la|les|un|une|des|du|de|à|au|aux)\b)/i;
    return frenchPattern.test(text) ? 'fr' : 'en';
  };

  return (
    <div className={`flex flex-col h-[600px] rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          AI Assistant
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <ChatMessage message={message} darkMode={darkMode} />
            {message.suggestedActions && message.sender === 'ai' && (
              <div className="flex flex-wrap gap-2 mt-2">
                {message.suggestedActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleActionClick(action)}
                    className={`text-sm px-3 py-1 rounded-full ${
                      darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <div className={`p-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-wrap gap-2">
            {files.map((file) => (
              <FilePreview
                key={file.name}
                file={file}
                onRemove={() => removeFile(file.name)}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      )}

      <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className={`flex-1 p-2 rounded-lg border ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
          <VoiceRecorder onRecordingComplete={handleVoiceRecording} darkMode={darkMode} />
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`p-2 rounded-lg ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <Paperclip className={darkMode ? 'text-white' : 'text-gray-600'} size={20} />
          </button>
          <button
            onClick={handleSend}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;