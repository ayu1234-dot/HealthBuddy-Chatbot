
export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  sources?: Array<{
    title: string;
    uri: string;
  }>;
}

export interface HealthAlert {
  id: string;
  type: 'outbreak' | 'vaccination' | 'preventive';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export enum AppView {
  CHAT = 'chat',
  DASHBOARD = 'dashboard',
  VACCINATION = 'vaccination',
  OUTBREAKS = 'outbreaks'
}
