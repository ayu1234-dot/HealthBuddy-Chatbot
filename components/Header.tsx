
import React from 'react';
import { Language, AppView } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, selectedLanguage, onLanguageChange }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(AppView.CHAT)}>
          <div className="bg-emerald-500 p-2 rounded-lg text-white">
            <i className="fas fa-hand-holding-medical"></i>
          </div>
          <h1 className="font-bold text-xl tracking-tight text-emerald-700 hidden sm:block">HealthBuddy</h1>
        </div>

        <nav className="flex items-center gap-1 sm:gap-4">
          <button 
            onClick={() => setView(AppView.CHAT)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${currentView === AppView.CHAT ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Chat
          </button>
          <button 
            onClick={() => setView(AppView.DASHBOARD)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${currentView === AppView.DASHBOARD ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Alerts
          </button>
        </nav>

        <select 
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {SUPPORTED_LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.nativeName}</option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;
