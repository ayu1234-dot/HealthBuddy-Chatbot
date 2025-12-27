# HealthBuddy AI - Public Health Assistant

HealthBuddy AI is a multilingual, AI-driven public health assistant designed for rural and semi-urban communities. It leverages the Google Gemini API to provide real-time symptom guidance, vaccination information, and health alerts.

## 🚀 Features

- **AI-Driven Health Chat**: Real-time conversation with Gemini 3 Flash for symptom awareness and preventive healthcare education.
- **Multilingual Support**: Supports English, Hindi, Bengali, Telugu, Marathi, and Tamil.
- **Text-to-Speech (TTS)**: Integrated voice output for users with varying literacy levels using Gemini 2.5 Flash TTS.
- **Multimodal (Vision)**: Ability to analyze images of symptoms (e.g., rashes, eye redness) for preliminary guidance.
- **Health Dashboard**: Real-time alerts for local outbreaks and vaccination schedules.
- **Emergency Integration**: One-tap access to emergency services (e.g., National Ambulance Service).
- **Google Search Grounding**: All health information is grounded in real-time search results for accuracy.

## 🛠️ Technology Stack

- **Frontend**: React (v19)
- **Styling**: Tailwind CSS
- **AI Engine**: [Google Gemini API (@google/genai)](https://ai.google.dev/)
- **Icons**: Font Awesome 6
- **Type Safety**: TypeScript

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/healthbuddy-ai.git
   cd healthbuddy-ai
   ```

2. **Environment Variables**:
   Ensure you have a Gemini API key. Set it in your environment:
   ```bash
   # Create a .env file or set in your environment
   API_KEY=your_gemini_api_key_here
   ```

3. **Open index.html**:
   Since the app uses ES6 modules and a custom import map, you can serve the root directory using any local web server (e.g., `npx serve .`).

## ⚠️ Disclaimer

HealthBuddy AI is an experimental tool designed for **educational and awareness purposes only**. It does not provide medical diagnosis or treatment. Users should always consult with a qualified healthcare professional for medical concerns.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
