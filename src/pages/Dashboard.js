import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../api';

function Dashboard() {
  const navigate = useNavigate();
  const [riskScores, setRiskScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/health/data', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRiskScores(res.data.riskScores);
    } catch (error) {
      console.error('Error fetching health data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen"
      style={{background:'linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #0a1628 100%)'}}>

      <style>{`
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-30px)}}
        @keyframes float2{0%,100%{transform:translate(0,0)}50%{transform:translate(-30px,30px)}}
        .slide-up{animation:slideUp 0.6s ease forwards}
        .slide-up-1{animation:slideUp 0.6s ease 0.1s forwards;opacity:0}
        .slide-up-2{animation:slideUp 0.6s ease 0.2s forwards;opacity:0}
        .slide-up-3{animation:slideUp 0.6s ease 0.3s forwards;opacity:0}
        .glass{background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08)}
        .card-hover{transition:all 0.3s ease}
        .card-hover:hover{transform:translateY(-4px);box-shadow:0 0 30px rgba(20,184,166,0.15)}
        .btn-nav{
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          color:white;font-weight:600;
          padding:8px 16px;border-radius:10px;
          cursor:pointer;font-size:13px;
          transition:all 0.3s ease;
        }
        .btn-nav:hover{background:rgba(20,184,166,0.1);border-color:rgba(20,184,166,0.3)}
        .btn-logout{
          background:linear-gradient(135deg,#14b8a6,#3b82f6);
          color:white;font-weight:600;
          padding:8px 16px;border-radius:10px;
          cursor:pointer;font-size:13px;border:none;
          transition:all 0.3s ease;
          box-shadow:0 0 15px rgba(20,184,166,0.3);
        }
        .btn-logout:hover{transform:translateY(-1px);box-shadow:0 0 25px rgba(20,184,166,0.5)}
        .btn-whatsapp{
          display:flex;align-items:center;gap:6px;
          background:rgba(37,211,102,0.1);
          border:1px solid rgba(37,211,102,0.3);
          color:#25D166;font-weight:600;
          padding:8px 16px;border-radius:10px;
          cursor:pointer;font-size:13px;
          text-decoration:none;
          transition:all 0.3s ease;
        }
        .btn-whatsapp:hover{background:rgba(37,211,102,0.2);border-color:rgba(37,211,102,0.5)}
      `}</style>

      {/* Background orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
          style={{background:'radial-gradient(circle,rgba(20,184,166,0.5),transparent)',animation:'float1 10s ease-in-out infinite'}}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-15"
          style={{background:'radial-gradient(circle,rgba(139,92,246,0.5),transparent)',animation:'float2 12s ease-in-out infinite'}}></div>
        <div className="absolute inset-0"
          style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',backgroundSize:'50px 50px'}}></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4"
        style={{background:'rgba(10,15,30,0.8)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-sm"
            style={{background:'linear-gradient(135deg,#14b8a6,#8b5cf6)',boxShadow:'0 0 15px rgba(20,184,166,0.4)'}}>H</div>
          <span className="text-lg font-black text-white">Health<span style={{color:'#14b8a6'}}>Genix</span></span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button className="btn-nav" onClick={() => navigate('/health-input')}>
            + Add Health Data
          </button>
          <button className="btn-nav" onClick={() => navigate('/report-upload')}>
            📄 Upload Report
          </button>
          <button className="btn-nav" onClick={() => navigate('/history')}>
            📈 Health History
          </button>
          <button className="btn-nav" onClick={() => navigate('/chat')}>
            🤖 AI Assistant
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white"
              style={{background:'linear-gradient(135deg,#14b8a6,#8b5cf6)'}}>
              {user?.name?.charAt(0)}
            </div>
            <span className="text-gray-400 text-sm">{user?.name}</span>
          </div>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 p-6 max-w-6xl mx-auto">

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{background:'rgba(20,184,166,0.1)',border:'1px solid rgba(20,184,166,0.3)'}}>
                <svg className="animate-spin w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#14b8a6" strokeWidth="4"/>
                  <path className="opacity-75" fill="#14b8a6" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              </div>
              <p className="text-gray-400">Loading your health matrix...</p>
            </div>
          </div>
        )}

        {/* No data */}
        {!loading && !riskScores && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-8xl mb-6">🏥</div>
            <h2 className="text-3xl font-black text-white mb-4">No Health Data Yet!</h2>
            <p className="text-gray-400 mb-8 max-w-md">Add your health parameters to get your personalised risk scores and AI recommendations.</p>
            <button
              onClick={() => navigate('/health-input')}
              className="text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 text-lg"
              style={{background:'linear-gradient(135deg,#14b8a6,#3b82f6)',boxShadow:'0 0 30px rgba(20,184,166,0.4)'}}>
              + Add Health Data Now
            </button>
          </div>
        )}

        {/* Real data */}
        {!loading && riskScores && (
          <>
            {/* Welcome */}
            <div className="slide-up mb-8">
              <h1 className="text-3xl font-black text-white mb-1">
                Welcome back, <span style={{color:'#14b8a6'}}>{user?.name}!</span>
              </h1>
              <p className="text-gray-500 text-sm">Here's your latest health intelligence report</p>
            </div>

            {/* Top row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

              {/* Wellbeing Score */}
              <div className="slide-up-1 glass rounded-3xl p-6 card-hover"
                style={{boxShadow:'0 0 40px rgba(20,184,166,0.1)'}}>
                <div className="text-xs font-bold tracking-widest mb-4" style={{color:'#14b8a6'}}>WELLBEING SCORE</div>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#dashGrad)" strokeWidth="3"
                        strokeDasharray={`${riskScores.wellbeing_score} ${100 - riskScores.wellbeing_score}`}
                        strokeLinecap="round"/>
                      <defs>
                        <linearGradient id="dashGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#14b8a6"/>
                          <stop offset="100%" stopColor="#8b5cf6"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-black" style={{color:'#14b8a6'}}>{riskScores.wellbeing_score}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-white">{riskScores.wellbeing_score}<span className="text-gray-600 text-2xl">/100</span></div>
                    <div className="mt-2">
                      <span className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{
                          background: riskScores.wellbeing_score >= 70 ? 'rgba(34,197,94,0.1)' : riskScores.wellbeing_score >= 50 ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                          color: riskScores.wellbeing_score >= 70 ? '#22c55e' : riskScores.wellbeing_score >= 50 ? '#f59e0b' : '#ef4444',
                          border: `1px solid ${riskScores.wellbeing_score >= 70 ? 'rgba(34,197,94,0.2)' : riskScores.wellbeing_score >= 50 ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)'}`
                        }}>
                        {riskScores.wellbeing_score >= 70 ? '✓ Good' : riskScores.wellbeing_score >= 50 ? '⚠ Fair' : '↓ Needs Attention'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="lg:col-span-2 grid grid-cols-3 gap-4">
                {[
                  {label:'Diabetes Risk',value:`${riskScores.diabetes_risk}%`,color:'#ef4444',icon:'🍬'},
                  {label:'Cardiovascular Risk',value:`${riskScores.cardiovascular_risk}%`,color:'#f59e0b',icon:'🫀'},
                  {label:'Hypertension Risk',value:`${riskScores.hypertension_risk}%`,color:'#818cf8',icon:'💉'},
                ].map((stat,i) => (
                  <div key={i} className="slide-up-2 glass rounded-2xl p-4 card-hover text-center">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-black mb-1" style={{color:stat.color}}>{stat.value}</div>
                    <div className="text-gray-500 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disease Risk Cards */}
            <div className="slide-up-2 mb-6">
              <h2 className="text-lg font-black text-white mb-4">5-Year Disease Risk Forecast</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {name:'Type 2 Diabetes',risk:riskScores.diabetes_risk,icon:'🍬',color:'#ef4444'},
                  {name:'Cardiovascular Disease',risk:riskScores.cardiovascular_risk,icon:'🫀',color:'#f59e0b'},
                  {name:'Hypertension',risk:riskScores.hypertension_risk,icon:'💉',color:'#818cf8'},
                ].map((item,i) => (
                  <div key={i} className="glass rounded-2xl p-5 card-hover">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <div className="text-white font-bold text-sm">{item.name}</div>
                          <div className="text-gray-500 text-xs">5-year risk</div>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{background:`${item.color}15`,color:item.color,border:`1px solid ${item.color}30`}}>
                        {item.risk >= 40 ? 'Elevated' : item.risk >= 20 ? 'Moderate' : 'Low'}
                      </span>
                    </div>
                    <div className="w-full rounded-full h-2 mb-2" style={{background:'rgba(255,255,255,0.06)'}}>
                      <div className="h-2 rounded-full transition-all duration-1000"
                        style={{width:`${item.risk}%`,background:item.color,boxShadow:`0 0 10px ${item.color}60`}}></div>
                    </div>
                    <div className="text-2xl font-black" style={{color:item.color}}>{item.risk}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="slide-up-3 glass rounded-2xl p-6 card-hover mb-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xl" style={{color:'#8b5cf6'}}>✦</span>
                <h2 className="text-lg font-black text-white">AI Recommendations</h2>
                <span className="text-xs px-2 py-1 rounded-full"
                  style={{background:'rgba(139,92,246,0.1)',color:'#8b5cf6',border:'1px solid rgba(139,92,246,0.2)'}}>
                  Personalised
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {riskScores.diabetes_risk >= 30 && (
                  <div className="flex items-start gap-3 p-4 rounded-xl"
                    style={{background:'rgba(239,68,68,0.05)',border:'1px solid rgba(239,68,68,0.1)'}}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{background:'#ef4444'}}></span>
                    <p className="text-gray-300 text-sm">Reduce refined carbohydrate intake — target less than 150g/day to lower diabetes risk by up to 14 points.</p>
                  </div>
                )}
                {riskScores.cardiovascular_risk >= 25 && (
                  <div className="flex items-start gap-3 p-4 rounded-xl"
                    style={{background:'rgba(245,158,11,0.05)',border:'1px solid rgba(245,158,11,0.1)'}}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{background:'#f59e0b'}}></span>
                    <p className="text-gray-300 text-sm">Add 20 minutes of daily cardio exercise to improve cardiovascular health and reduce inflammation markers.</p>
                  </div>
                )}
                {riskScores.hypertension_risk >= 25 && (
                  <div className="flex items-start gap-3 p-4 rounded-xl"
                    style={{background:'rgba(129,140,248,0.05)',border:'1px solid rgba(129,140,248,0.1)'}}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{background:'#818cf8'}}></span>
                    <p className="text-gray-300 text-sm">Reduce sodium intake to less than 2300mg/day and monitor blood pressure weekly to manage hypertension risk.</p>
                  </div>
                )}
                <div className="flex items-start gap-3 p-4 rounded-xl"
                  style={{background:'rgba(20,184,166,0.05)',border:'1px solid rgba(20,184,166,0.1)'}}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{background:'#14b8a6'}}></span>
                  <p className="text-gray-300 text-sm">Keep logging health data regularly for more accurate predictions and personalised insights.</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="slide-up-3 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {icon:'➕',label:'Add Health Data',action:() => navigate('/health-input'),color:'#14b8a6'},
                {icon:'📄',label:'Upload Report',action:() => navigate('/report-upload'),color:'#818cf8'},
                {icon:'📈',label:'Health History',action:() => navigate('/history'),color:'#f59e0b'},
                {icon:'🤖',label:'AI Assistant',action:() => navigate('/chat'),color:'#ec4899'},
              ].map((item,i) => (
                <div key={i} className="glass rounded-2xl p-4 text-center card-hover cursor-pointer"
                  onClick={item.action}
                  style={{border:`1px solid ${item.color}20`}}>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-white text-sm font-medium">{item.label}</div>
                </div>
              ))}
            </div>

          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;