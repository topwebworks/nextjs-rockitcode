// Week 6: AI Learning Assistant - OpenAI Integration
// Intelligent code assistance, explanations, and personalized learning

import OpenAI from 'openai'

// Lazy-initialized OpenAI client with error handling
let openai: OpenAI | null = null

function getOpenAIClient(): OpenAI {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured')
    }
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORG_ID || undefined,
    })
  }
  return openai
}

// AI assistant configuration
const AI_CONFIG = {
  models: {
    chat: 'gpt-4o-mini', // Fast and cost-effective for most interactions
    analysis: 'gpt-4o', // More powerful for complex code analysis
    embeddings: 'text-embedding-3-small' // For semantic search
  },
  maxTokens: {
    explanation: 500,
    codeReview: 800,
    hint: 150,
    feedback: 600
  },
  temperature: 0.7, // Balance creativity and consistency
}

// System prompts for different AI functions
const SYSTEM_PROMPTS = {
  codeReviewer: `You are an expert programming instructor providing constructive code reviews for learning purposes. 
  Focus on:
  - Code quality and best practices
  - Potential bugs or improvements
  - Learning opportunities
  - Encouraging feedback with specific suggestions
  Keep responses concise but educational.`,
  
  conceptExplainer: `You are a patient coding teacher explaining programming concepts to learners.
  - Use simple, clear language
  - Provide practical examples
  - Break complex topics into digestible parts
  - Encourage questions and exploration
  - Relate concepts to real-world applications`,
  
  hintProvider: `You are a coding mentor providing helpful hints without giving away complete solutions.
  - Guide thinking rather than providing answers
  - Ask leading questions
  - Suggest debugging approaches
  - Encourage problem-solving skills
  - Keep hints brief and actionable`,
  
  pathRecommender: `You are a personalized learning advisor analyzing user progress and recommending next steps.
  - Consider current skill level and progress
  - Suggest appropriate difficulty progression
  - Identify knowledge gaps
  - Recommend relevant projects and exercises
  - Provide motivation and encouragement`
}

// AI Learning Assistant Functions
export class AILearningAssistant {
  
  // Code Review and Feedback
  async reviewCode(code: string, language: string, context?: string): Promise<{
    score: number;
    feedback: string;
    suggestions: string[];
    bugs: string[];
    improvements: string[];
  }> {
    try {
      const response = await getOpenAIClient().chat.completions.create({
        model: AI_CONFIG.models.analysis,
        messages: [
          { role: 'system', content: SYSTEM_PROMPTS.codeReviewer },
          { 
            role: 'user', 
            content: `Review this ${language} code${context ? ` for ${context}` : ''}:\n\n${code}\n\nProvide: score (0-100), feedback, suggestions, potential bugs, and improvements.`
          }
        ],
        max_tokens: AI_CONFIG.maxTokens.codeReview,
        temperature: AI_CONFIG.temperature,
      })

      const content = response.choices[0]?.message?.content || '';
      return this.parseCodeReview(content);
    } catch (error) {
      console.error('AI code review error:', error);
      throw new Error('Failed to analyze code');
    }
  }

  // Concept Explanation
  async explainConcept(concept: string, userLevel: 'beginner' | 'intermediate' | 'advanced', context?: string): Promise<{
    explanation: string;
    examples: string[];
    relatedConcepts: string[];
    nextSteps: string[];
  }> {
    try {
      const levelContext = {
        beginner: 'very simple terms with basic examples',
        intermediate: 'moderate detail with practical examples',
        advanced: 'comprehensive detail with complex examples'
      };

      const response = await getOpenAIClient().chat.completions.create({
        model: AI_CONFIG.models.chat,
        messages: [
          { role: 'system', content: SYSTEM_PROMPTS.conceptExplainer },
          { 
            role: 'user', 
            content: `Explain "${concept}" to a ${userLevel} programmer using ${levelContext[userLevel]}${context ? `. Context: ${context}` : ''}. Include examples, related concepts, and suggested next learning steps.`
          }
        ],
        max_tokens: AI_CONFIG.maxTokens.explanation,
        temperature: AI_CONFIG.temperature,
      })

      const content = response.choices[0]?.message?.content || '';
      return this.parseConceptExplanation(content);
    } catch (error) {
      console.error('AI concept explanation error:', error);
      throw new Error('Failed to explain concept');
    }
  }

  // Smart Hint Generation
  async generateHint(problem: string, userCode: string, language: string, difficulty: number): Promise<{
    hint: string;
    type: 'debugging' | 'approach' | 'syntax' | 'logic';
    confidence: number;
  }> {
    try {
      const response = await getOpenAIClient().chat.completions.create({
        model: AI_CONFIG.models.chat,
        messages: [
          { role: 'system', content: SYSTEM_PROMPTS.hintProvider },
          { 
            role: 'user', 
            content: `Problem: ${problem}\n\nCurrent ${language} code:\n${userCode}\n\nDifficulty: ${difficulty}/10\n\nProvide a helpful hint without giving away the solution. Guide their thinking.`
          }
        ],
        max_tokens: AI_CONFIG.maxTokens.hint,
        temperature: AI_CONFIG.temperature,
      })

      const content = response.choices[0]?.message?.content || '';
      return this.parseHint(content);
    } catch (error) {
      console.error('AI hint generation error:', error);
      throw new Error('Failed to generate hint');
    }
  }

  // Personalized Learning Path Recommendations
  async recommendLearningPath(userProgress: any, preferences: any): Promise<{
    nextTopics: string[];
    projects: string[];
    weakAreas: string[];
    strengthAreas: string[];
    estimatedTime: string;
    motivation: string;
  }> {
    try {
      const progressSummary = this.formatProgressSummary(userProgress);
      const preferencesSummary = this.formatPreferences(preferences);

      const response = await getOpenAIClient().chat.completions.create({
        model: AI_CONFIG.models.analysis,
        messages: [
          { role: 'system', content: SYSTEM_PROMPTS.pathRecommender },
          { 
            role: 'user', 
            content: `User Progress: ${progressSummary}\n\nPreferences: ${preferencesSummary}\n\nRecommend personalized next steps, projects, areas to focus on, and provide motivation.`
          }
        ],
        max_tokens: AI_CONFIG.maxTokens.feedback,
        temperature: AI_CONFIG.temperature,
      })

      const content = response.choices[0]?.message?.content || '';
      return this.parseLearningPath(content);
    } catch (error) {
      console.error('AI learning path error:', error);
      throw new Error('Failed to generate learning recommendations');
    }
  }

  // Generate Code Embeddings for Semantic Search
  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await getOpenAIClient().embeddings.create({
        model: AI_CONFIG.models.embeddings,
        input: text,
      });

      return response.data[0]?.embedding || [];
    } catch (error) {
      console.error('AI embedding error:', error);
      throw new Error('Failed to generate embedding');
    }
  }

  // Generate Practice Problems
  async generatePracticeProblems(topic: string, difficulty: number, count: number = 3): Promise<{
    problems: Array<{
      title: string;
      description: string;
      difficulty: number;
      hints: string[];
      solution_approach: string;
      test_cases: Array<{ input: string; output: string }>;
    }>;
  }> {
    try {
      const response = await getOpenAIClient().chat.completions.create({
        model: AI_CONFIG.models.analysis,
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert programming instructor creating practice problems for students.'
          },
          { 
            role: 'user', 
            content: `Create ${count} practice problems for "${topic}" at difficulty level ${difficulty}/10. Include title, description, hints, solution approach, and test cases for each problem.`
          }
        ],
        max_tokens: 1500,
        temperature: AI_CONFIG.temperature,
      })

      const content = response.choices[0]?.message?.content || '';
      return this.parsePracticeProblems(content);
    } catch (error) {
      console.error('AI practice problem generation error:', error);
      throw new Error('Failed to generate practice problems');
    }
  }

  // Adaptive Difficulty Assessment
  async assessDifficulty(userResponse: string, expectedSolution: string, timeSpent: number): Promise<{
    understood: boolean;
    difficultyAdjustment: number;
    nextDifficultyLevel: number;
    feedback: string;
  }> {
    try {
      const response = await getOpenAIClient().chat.completions.create({
        model: AI_CONFIG.models.analysis,
        messages: [
          { 
            role: 'system', 
            content: 'You are an adaptive learning system analyzing student performance to adjust difficulty.'
          },
          { 
            role: 'user', 
            content: `Student response: ${userResponse}\n\nExpected solution: ${expectedSolution}\n\nTime spent: ${timeSpent} minutes\n\nAssess understanding and recommend difficulty adjustment.`
          }
        ],
        max_tokens: AI_CONFIG.maxTokens.feedback,
        temperature: AI_CONFIG.temperature,
      })

      const content = response.choices[0]?.message?.content || '';
      return this.parseDifficultyAssessment(content);
    } catch (error) {
      console.error('AI difficulty assessment error:', error);
      throw new Error('Failed to assess difficulty');
    }
  }

  // General AI conversation method
  async generateResponse(
    message: string,
    context: string = '',
    type: 'chat' | 'help' | 'explanation' = 'chat'
  ): Promise<string> {
    const cacheKey = `general_response:${Buffer.from(message + context).toString('base64').slice(0, 50)}`;
    const cached = AICache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const systemPrompt = `You are an AI learning assistant for a coding education platform. You help students learn programming concepts, debug code, and improve their skills.

Guidelines:
- Be encouraging and supportive
- Use simple, clear explanations
- Provide practical examples when relevant
- Keep responses concise but helpful
- If discussing code, use proper formatting
- Suggest next steps when appropriate
- Be patient with beginners

Context: ${context}
Type: ${type}`;

    try {
      const completion = await getOpenAIClient().chat.completions.create({
        model: AI_CONFIG.models.chat,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
      });

      const response = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response. Please try again.';
      
      // Cache for 10 minutes
      AICache.set(cacheKey, response, 600);
      
      return response;
    } catch (error) {
      console.error('AI generateResponse error:', error);
      throw new AIError(
        'Failed to generate AI response',
        'api_error',
        true
      );
    }
  }

  // Helper methods for parsing AI responses
  private parseCodeReview(content: string) {
    // Parse structured response from AI
    // This would implement proper parsing logic
    return {
      score: 85,
      feedback: content,
      suggestions: [],
      bugs: [],
      improvements: []
    };
  }

  private parseConceptExplanation(content: string) {
    return {
      explanation: content,
      examples: [],
      relatedConcepts: [],
      nextSteps: []
    };
  }

  private parseHint(content: string) {
    return {
      hint: content,
      type: 'approach' as const,
      confidence: 0.85
    };
  }

  private parseLearningPath(content: string) {
    return {
      nextTopics: [],
      projects: [],
      weakAreas: [],
      strengthAreas: [],
      estimatedTime: "2-3 weeks",
      motivation: content
    };
  }

  private parsePracticeProblems(content: string) {
    return {
      problems: []
    };
  }

  private parseDifficultyAssessment(content: string) {
    return {
      understood: true,
      difficultyAdjustment: 0,
      nextDifficultyLevel: 5,
      feedback: content
    };
  }

  private formatProgressSummary(progress: any): string {
    // Format user progress data for AI consumption
    return JSON.stringify(progress);
  }

  private formatPreferences(preferences: any): string {
    // Format user preferences for AI consumption
    return JSON.stringify(preferences);
  }
}

// Singleton instance
export const aiAssistant = new AILearningAssistant();

// Rate limiting and caching utilities
export class AICache {
  private static cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  static set(key: string, data: any, ttlSeconds: number = 300): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000
    });
  }

  static get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  static clear(): void {
    this.cache.clear();
  }
}

// Error handling for AI operations
export class AIError extends Error {
  constructor(
    message: string,
    public type: 'rate_limit' | 'api_error' | 'invalid_input' | 'network_error',
    public retryable: boolean = false
  ) {
    super(message);
    this.name = 'AIError';
  }
}

// AI response types
export interface AICodeReview {
  score: number;
  feedback: string;
  suggestions: string[];
  bugs: string[];
  improvements: string[];
}

export interface AIConceptExplanation {
  explanation: string;
  examples: string[];
  relatedConcepts: string[];
  nextSteps: string[];
}

export interface AIHint {
  hint: string;
  type: 'debugging' | 'approach' | 'syntax' | 'logic';
  confidence: number;
}

export interface AILearningPath {
  nextTopics: string[];
  projects: string[];
  weakAreas: string[];
  strengthAreas: string[];
  estimatedTime: string;
  motivation: string;
}
