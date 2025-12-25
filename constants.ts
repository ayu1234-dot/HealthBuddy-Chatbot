
import { Language, HealthAlert } from './types';

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' }
];

export const MOCK_ALERTS: HealthAlert[] = [
  {
    id: '1',
    type: 'outbreak',
    title: 'Dengue Awareness',
    description: 'Rising cases reported in urban sectors. Please ensure no stagnant water around homes.',
    severity: 'high',
    date: '2024-05-20'
  },
  {
    id: '2',
    type: 'vaccination',
    title: 'Polio Drive 2024',
    description: 'National Immunization Day scheduled for children under 5 years on June 15th.',
    severity: 'medium',
    date: '2024-06-15'
  },
  {
    id: '3',
    type: 'preventive',
    title: 'Heatwave Warning',
    description: 'Stay hydrated and avoid direct sun exposure between 12 PM and 4 PM.',
    severity: 'medium',
    date: '2024-05-22'
  }
];

export const SYSTEM_PROMPT = `
You are HealthBuddy, an AI-driven public health assistant specifically designed for rural and semi-urban populations.
Your goals:
1. Educate users about preventive healthcare.
2. Explain disease symptoms clearly using simple, non-medical language.
3. Provide information about standard vaccination schedules.
4. Advise on when to seek professional medical help (always emphasize that you are an AI assistant and not a doctor).
5. Support multiple Indian languages.

Rules:
- Be empathetic, culturally sensitive, and easy to understand.
- Use bullet points for symptoms and steps.
- If a user reports severe symptoms (e.g., chest pain, difficulty breathing), immediately advise them to call emergency services or visit the nearest hospital.
- Use Google Search to check for real-time health outbreaks if asked about local news or current diseases.
- When answering about vaccinations, follow the WHO and National Health Mission guidelines.
`;
