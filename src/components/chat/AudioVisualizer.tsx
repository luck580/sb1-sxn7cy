import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  audioUrl: string;
  darkMode: boolean;
}

function AudioVisualizer({ audioUrl, darkMode }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext>();
  const analyserRef = useRef<AnalyserNode>();
  const sourceRef = useRef<MediaElementAudioSourceNode>();
  const rafIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const audio = new Audio(audioUrl);
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    sourceRef.current = audioContextRef.current.createMediaElementSource(audio);

    sourceRef.current.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);

    analyserRef.current.fftSize = 256;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;
    const barWidth = width / bufferLength;

    function draw() {
      rafIdRef.current = requestAnimationFrame(draw);

      analyserRef.current!.getByteFrequencyData(dataArray);
      ctx.fillStyle = darkMode ? '#1F2937' : '#F3F4F6';
      ctx.fillRect(0, 0, width, height);

      dataArray.forEach((value, i) => {
        const barHeight = (value / 255) * height;
        const x = i * barWidth;
        const y = height - barHeight;

        ctx.fillStyle = darkMode ? '#6366F1' : '#4F46E5';
        ctx.fillRect(x, y, barWidth - 1, barHeight);
      });
    }

    audio.play();
    draw();

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      audio.pause();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [audioUrl, darkMode]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={60}
      className="rounded-lg"
    />
  );
}

export default AudioVisualizer;