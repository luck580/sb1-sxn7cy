import React, { useState, useRef } from 'react';
import { Mic, Square, Loader } from 'lucide-react';
import { detectLanguage } from './languageDetection';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob, language: string) => void;
  darkMode: boolean;
}

function VoiceRecorder({ onRecordingComplete, darkMode }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerRef = useRef<number>();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const language = await detectLanguage(audioBlob);
        onRecordingComplete(audioBlob, language);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      startTimer();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      stopTimer();
      setDuration(0);
    }
  };

  const startTimer = () => {
    timerRef.current = window.setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-2 rounded-lg ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600'
            : darkMode
            ? 'hover:bg-gray-700'
            : 'hover:bg-gray-100'
        }`}
      >
        {isRecording ? (
          <Square className="text-white" size={20} />
        ) : (
          <Mic className={darkMode ? 'text-white' : 'text-gray-600'} size={20} />
        )}
      </button>
      {isRecording && (
        <div className="flex items-center space-x-2">
          <div className="animate-pulse">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-600'}`}>
            {formatDuration(duration)}
          </span>
        </div>
      )}
    </div>
  );
}

export default VoiceRecorder;