export interface AIResponse {
  text: string;
  confidence: number;
  suggestedActions?: string[];
}

export class AIResponseGenerator {
  private static readonly TOPICS = {
    greeting: ['hello', 'hi', 'hey', 'bonjour', 'salut'],
    farewell: ['goodbye', 'bye', 'au revoir', 'ciao'],
    help: ['help', 'aide', 'assist', 'support'],
    analysis: ['analyze', 'examine', 'study', 'check'],
  };

  private static readonly RESPONSES = {
    greeting: [
      "Hello! I'm your AI assistant. How can I help you today?",
      "Bonjour! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui?",
    ],
    farewell: [
      "Goodbye! Feel free to return if you need more assistance.",
      "Au revoir! N'hésitez pas à revenir si vous avez besoin d'aide.",
    ],
    help: [
      "I can help you with:\n- Data analysis\n- Model training\n- Performance optimization\n- Technical questions",
      "Je peux vous aider avec:\n- L'analyse de données\n- L'entraînement de modèles\n- L'optimisation des performances\n- Les questions techniques",
    ],
    default: [
      "I understand you're interested in {topic}. Could you provide more details about what you'd like to know?",
      "Je comprends que vous vous intéressez à {topic}. Pourriez-vous me donner plus de détails sur ce que vous souhaitez savoir?",
    ],
  };

  static generateResponse(input: string, language: string = 'en'): AIResponse {
    const normalizedInput = input.toLowerCase();
    const topicMatch = this.detectTopic(normalizedInput);
    const isEnglish = language === 'en';
    
    if (topicMatch) {
      const responses = this.RESPONSES[topicMatch];
      return {
        text: responses[isEnglish ? 0 : 1],
        confidence: 0.9,
        suggestedActions: this.generateSuggestedActions(topicMatch, language),
      };
    }

    // Generate a contextual response
    return this.generateContextualResponse(normalizedInput, language);
  }

  private static detectTopic(input: string): string | null {
    for (const [topic, keywords] of Object.entries(this.TOPICS)) {
      if (keywords.some(keyword => input.includes(keyword))) {
        return topic;
      }
    }
    return null;
  }

  private static generateContextualResponse(input: string, language: string): AIResponse {
    const isEnglish = language === 'en';
    const words = input.split(' ');
    
    // Extract potential topics from input
    const topic = words.find(word => word.length > 4) || 'this topic';
    
    return {
      text: this.RESPONSES.default[isEnglish ? 0 : 1].replace('{topic}', topic),
      confidence: 0.7,
      suggestedActions: [
        isEnglish ? 'Tell me more' : 'Dites-m\'en plus',
        isEnglish ? 'Show examples' : 'Montrer des exemples',
        isEnglish ? 'Explain differently' : 'Expliquer différemment',
      ],
    };
  }

  private static generateSuggestedActions(topic: string, language: string): string[] {
    const isEnglish = language === 'en';
    const commonActions = {
      greeting: [
        isEnglish ? 'Start a new project' : 'Démarrer un nouveau projet',
        isEnglish ? 'View tutorials' : 'Voir les tutoriels',
      ],
      help: [
        isEnglish ? 'Show documentation' : 'Afficher la documentation',
        isEnglish ? 'Contact support' : 'Contacter le support',
      ],
      analysis: [
        isEnglish ? 'Upload data' : 'Télécharger des données',
        isEnglish ? 'View reports' : 'Voir les rapports',
      ],
    };

    return commonActions[topic as keyof typeof commonActions] || [];
  }
}