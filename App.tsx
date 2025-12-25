
import React, { useState } from 'react';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import HealthDashboard from './components/HealthDashboard';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.CHAT);
  const [language, setLanguage] = useState('en');

  const renderView = () => {
    switch (currentView) {
      case AppView.CHAT:
        return <ChatInterface language={language} />;
      case AppView.DASHBOARD:
        return <HealthDashboard />;
      default:
        return <ChatInterface language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header 
        currentView={currentView} 
        setView={setCurrentView} 
        selectedLanguage={language}
        onLanguageChange={setLanguage}
      />
      
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>

      {/* Floating Action for Emergencies (Only on Chat View) */}
      {currentView === AppView.CHAT && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-40">
          <button 
            onClick={() => window.open('tel:102')} // Example national ambulance number
            className="group relative flex items-center justify-center w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all hover:scale-110 active:scale-95"
            title="Emergency Call"
          >
            <i className="fas fa-phone-alt animate-pulse"></i>
            <span className="absolute right-16 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              EMERGENCY CALL
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
