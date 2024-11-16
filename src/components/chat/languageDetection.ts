// Simple language detection based on common words and patterns
export async function detectLanguage(audioBlob: Blob): Promise<string> {
  try {
    const text = await simulateSpeechToText(audioBlob);
    
    // Simple language detection based on common words
    const frenchWords = ['bonjour', 'merci', 'oui', 'non', 'je', 'tu', 'nous', 'vous'];
    const words = text.toLowerCase().split(/\s+/);
    
    const frenchWordCount = words.filter(word => frenchWords.includes(word)).length;
    
    return frenchWordCount > 0 ? 'fr' : 'en';
  } catch (error) {
    console.error('Language detection error:', error);
    return 'en'; // Default to English
  }
}

// Simulate speech-to-text conversion
async function simulateSpeechToText(audioBlob: Blob): Promise<string> {
  // In a real implementation, you would:
  // 1. Send the audio to a speech-to-text service
  // 2. Get back the transcribed text
  
  // For demo, return sample text in different languages
  const samples = [
    'Hello, how are you today?',
    'Bonjour, comment allez-vous aujourd\'hui?'
  ];
  return samples[Math.floor(Math.random() * samples.length)];
}

export function getLanguageLabel(code: string): string {
  const languages: Record<string, string> = {
    en: 'English',
    fr: 'French'
  };
  return languages[code] || code;
}