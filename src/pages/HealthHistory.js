import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../api';

function HealthHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/health/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res.data.history);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen"
      style={{background:'linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #0a1628 100%)'}}>

      <style>{`
        @keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-30px)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .slide-up{animation:slideUp 0.6s ease forwards}
        .slide-up-1{animation:slideUp 0.6s ease 0.1s forwards;opacity:0}
        .glass{background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08)}
        .card-hover{transition:all 0.3s ease}
        .card-hover:hover{transform:translateY(-4px);box-shadow:0 0 30px rgba(20,184,166,0.15)}
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
          style={{background:'radial-gradient(circle,rgba(20,184,166,0.5),transparent)',animation:'float1 10s ease-in-out infinite'}}></div>
        <div className="absolute inset-0"
          style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',backgroundSize:'50px 50px'}}></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4"
        style={{background:'rgba(10,15,30,0.8)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-sm"
            style={{background:'linear-gradient(135deg,#14b8a6,#8b5cf6)'}}>H</div>
          <span className="text-lg font-black text-white">Health<span style={{color:'#14b8a6'}}>Genix</span></span>
        </div>
        <button onClick={() => navigate('/dashboard')}
          className="text-gray-400 hover:text-white text-sm transition-colors">
          ← Back to Dashboard
        </button>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="slide-up mb-8">
          <h1 className="text-3xl font-black text-white mb-2">Health History</h1>
          <p className="text-gray-500 text-sm">Track how your health scores have changed over time</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <svg className="animate-spin w-10 h-10 mx-auto mb-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#14b8a6" strokeWidth="4"/>
                <path className="opacity-75" fill="#14b8a6" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              <p className="text-gray-400">Loading your health history...</p>
            </div>
          </div>
        )}

        {/* No history */}
        {!loading && history.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-8xl mb-6">📊</div>
            <h2 className="text-3xl font-black text-white mb-4">No History Yet!</h2>
            <p className="text-gray-400 mb-8 max-w-md">Start logging your health data to build your health timeline.</p>
            <button onClick={() => navigate('/health-input')}
              className="text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105"
              style={{background:'linear-gradient(135deg,#14b8a6,#3b82f6)',boxShadow:'0 0 30px rgba(20,184,166,0.4)'}}>
              + Add Health Data Now
            </button>
          </div>
        )}

        {/* History list */}
        {!loading && history.length > 0 && (
          <div className="slide-up-1">

            {/* Trend summary */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                {
                  label: 'Latest Score',
                  value: history[0]?.wellbeing_score,
                  color: '#14b8a6',
                  icon: '🎯'
                },
                {
                  label: 'Total Entries',
                  value: history.length,
                  color: '#818cf8',
                  icon: '📊'
                },
                {
                  label: 'Trend',
                  value: history.length > 1
                    ? history[0].wellbeing_score > history[history.length-1].wellbeing_score
                      ? '↑ Improving'
                      : '↓ Declining'
                    : 'Keep logging',
                  color: history.length > 1
                    ? history[0].wellbeing_score > history[history.length-1].wellbeing_score
                      ? '#22c55e'
                      : '#ef4444'
                    : '#f59e0b',
                  icon: '📈'
                },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-2xl p-5 text-center card-hover">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-black mb-1" style={{color:stat.color}}>{stat.value}</div>
                  <div className="text-gray-500 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* History entries */}
            <div className="flex flex-col gap-4">
              {history.map((entry, i) => (
                <div key={i} className="glass rounded-2xl p-5 card-hover">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm"
                        style={{background:'linear-gradient(135deg,#14b8a6,#8b5cf6)'}}>
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">
                          {formatDate(entry.calculated_at)}
                        </div>
                        <div className="text-gray-500 text-xs">Health Check #{history.length - i}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black" style={{color:'#14b8a6'}}>
                        {entry.wellbeing_score}
                      </div>
                      <div className="text-gray-500 text-xs">Wellbeing Score</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {label:'Diabetes Risk',value:entry.diabetes_risk,color:'#ef4444'},
                      {label:'Cardiovascular',value:entry.cardiovascular_risk,color:'#f59e0b'},
                      {label:'Hypertension',value:entry.hypertension_risk,color:'#818cf8'},
                    ].map((risk, j) => (
                      <div key={j} className="text-center p-3 rounded-xl"
                        style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.05)'}}>
                        <div className="text-lg font-black mb-1" style={{color:risk.color}}>{risk.value}%</div>
                        <div className="text-gray-500 text-xs">{risk.label}</div>
                        <div className="w-full rounded-full h-1 mt-2" style={{background:'rgba(255,255,255,0.06)'}}>
                          <div className="h-1 rounded-full"
                            style={{width:`${risk.value}%`,background:risk.color,boxShadow:`0 0 6px ${risk.color}`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthHistory;