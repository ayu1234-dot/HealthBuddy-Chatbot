
import React from 'react';
import { MOCK_ALERTS } from '../constants';
import { HealthAlert } from '../types';

const HealthDashboard: React.FC = () => {
  const getSeverityColor = (severity: HealthAlert['severity']) => {
    switch(severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getIcon = (type: HealthAlert['type']) => {
    switch(type) {
      case 'outbreak': return 'fa-virus';
      case 'vaccination': return 'fa-syringe';
      case 'preventive': return 'fa-shield-heart';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <i className="fas fa-bullhorn text-emerald-500"></i>
            Real-time Health Alerts
          </h2>
          <span className="text-xs text-slate-500">Last updated: Today</span>
        </div>
        
        <div className="grid gap-4">
          {MOCK_ALERTS.map(alert => (
            <div key={alert.id} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border ${getSeverityColor(alert.severity)}`}>
                <i className={`fas ${getIcon(alert.type)} text-lg`}></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">{alert.title}</h3>
                  <span className="text-xs text-slate-400">{new Date(alert.date).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{alert.description}</p>
                <div className="mt-3 flex gap-2">
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${getSeverityColor(alert.severity)}`}>
                    {alert.severity} priority
                  </span>
                  <button className="text-[10px] text-emerald-600 font-bold hover:underline">
                    LEARN MORE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-600 rounded-2xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">Vaccination Tracker</h2>
          <p className="text-emerald-100 text-sm mb-4 max-w-md">
            Stay updated with national immunization schedules. Enter your child's age to get personalized reminders.
          </p>
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="Child's age in months" 
              className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-sm placeholder:text-white/60 outline-none focus:bg-white/30 transition-all w-full sm:w-auto"
            />
            <button className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-bold text-sm hover:bg-emerald-50 transition-colors">
              Check Schedule
            </button>
          </div>
        </div>
        <i className="fas fa-baby absolute -bottom-4 -right-4 text-white/10 text-9xl transform rotate-12"></i>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Preventive Care Tips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <i className="fas fa-faucet-drip"></i>
            </div>
            <h4 className="font-bold text-sm mb-1">Safe Drinking Water</h4>
            <p className="text-xs text-slate-500">Always boil or filter water during monsoon to avoid cholera and typhoid.</p>
          </div>
          <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
              <i className="fas fa-carrot"></i>
            </div>
            <h4 className="font-bold text-sm mb-1">Nutrition Matters</h4>
            <p className="text-xs text-slate-500">Include seasonal fruits and green leafy vegetables to boost immunity.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthDashboard;
