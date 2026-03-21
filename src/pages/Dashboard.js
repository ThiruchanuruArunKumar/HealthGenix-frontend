import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../api';

function Dashboard() {
  const navigate = useNavigate();
  const [riskScores, setRiskScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => { fetchHealthData(); }, []);

  const fetchHealthData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/health/data', { headers: { Authorization: `Bearer ${token}` } });
      setRiskScores(res.data.riskScores);
    } catch (error) {
      console.error(error);
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
    <div style={{minHeight:'100vh',background:'#FEFAF5',fontFamily:"'Inter',system-ui,sans-serif",color:'#1E2A2E'}}>
      <style>{`
        * { box-sizing:border-box; }
        .btn-nav {
          background:white; border:1.5px solid #E8DDD0;
          color:#4A5B5E; font-weight:500; padding:8px 16px;
          border-radius:40px; cursor:pointer; font-size:13px;
          transition:all 0.2s; font-family:'Inter',sans-serif;
        }
        .btn-nav:hover { border-color:#2A5C4A; color:#2A5C4A; }
        .btn-logout {
          background:#1F2F2C; color:white; font-weight:600;
          padding:8px 18px; border-radius:40px;
          cursor:pointer; font-size:13px; border:none;
          transition:0.2s; font-family:'Inter',sans-serif;
        }
        .btn-logout:hover { background:#2A5C4A; }
        .card {
          background:white; border-radius:24px;
          border:1px solid #EFE6DC; padding:24px;
          box-shadow:0 2px 8px rgba(0,0,0,0.04);
          transition:all 0.2s;
        }
        .card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.07); }
        .section-tag { font-size:11px; font-weight:700; color:#C2593A; letter-spacing:1px; margin-bottom:8px; }
      `}</style>

      {/* NAV */}
      <nav style={{background:'rgba(254,250,245,0.92)',backdropFilter:'blur(16px)',borderBottom:'1px solid #ECE3D8',padding:'0 40px',height:'68px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer'}} onClick={() => navigate('/')}>
          <div style={{width:'38px',height:'38px',background:'#2A5C4A',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'800',fontSize:'16px'}}>H</div>
          <span style={{fontSize:'18px',fontWeight:'800',color:'#1F2F2C'}}>Health<span style={{color:'#C2593A'}}>Genix</span></span>
        </div>
        <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
          <button className="btn-nav" onClick={() => navigate('/health-input')}>+ Add Data</button>
          <button className="btn-nav" onClick={() => navigate('/report-upload')}>📄 Upload Report</button>
          <button className="btn-nav" onClick={() => navigate('/history')}>📈 History</button>
          <button className="btn-nav" onClick={() => navigate('/chat')}>🤖 AI Assistant</button>
          <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'6px 14px',background:'#F1EAE1',borderRadius:'40px'}}>
            <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#2A5C4A',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',color:'white'}}>
              {user?.name?.charAt(0)}
            </div>
            <span style={{fontSize:'13px',color:'#4A5B5E',fontWeight:'500'}}>{user?.name}</span>
          </div>
          <button className="btn-logout" onClick={handleLogout}>Sign out</button>
        </div>
      </nav>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'40px'}}>

        {/* Loading */}
        {loading && (
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'120px 0'}}>
            <div style={{textAlign:'center'}}>
              <div style={{width:'48px',height:'48px',border:'3px solid #EFE6DC',borderTopColor:'#C2593A',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto 16px'}}></div>
              <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
              <p style={{color:'#8F9B96',fontSize:'14px'}}>Loading your health matrix...</p>
            </div>
          </div>
        )}

        {/* No data */}
        {!loading && !riskScores && (
          <div style={{textAlign:'center',padding:'120px 0'}}>
            <div style={{fontSize:'64px',marginBottom:'20px'}}>🌱</div>
            <h2 style={{fontSize:'28px',fontWeight:'800',color:'#1F2F2C',marginBottom:'12px',letterSpacing:'-0.5px'}}>No health data yet</h2>
            <p style={{color:'#8F9B96',fontSize:'15px',marginBottom:'32px',maxWidth:'400px',margin:'0 auto 32px'}}>Add your health parameters to get your personalised risk scores and AI recommendations.</p>
            <button onClick={() => navigate('/health-input')}
              style={{background:'#C2593A',color:'white',fontWeight:'600',padding:'14px 32px',borderRadius:'60px',border:'none',cursor:'pointer',fontSize:'15px',boxShadow:'0 4px 12px rgba(194,89,58,0.25)'}}>
              + Add health data now →
            </button>
          </div>
        )}

        {/* Data */}
        {!loading && riskScores && (
          <>
            {/* Welcome */}
            <div style={{marginBottom:'32px'}}>
              <div style={{fontSize:'13px',fontWeight:'600',color:'#C2593A',marginBottom:'4px'}}>— your health dashboard</div>
              <h1 style={{fontSize:'32px',fontWeight:'800',color:'#1F2F2C',letterSpacing:'-1px'}}>
                Welcome back, {user?.name}! 👋
              </h1>
              <p style={{color:'#8F9B96',fontSize:'14px',marginTop:'6px'}}>Here's your latest health intelligence report</p>
            </div>

            {/* Top row */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'20px',marginBottom:'24px'}}>

              {/* Wellbeing Score */}
              <div className="card" style={{gridColumn:'span 1'}}>
                <div className="section-tag">WELLBEING SCORE</div>
                <div style={{display:'flex',alignItems:'center',gap:'16px',marginTop:'8px'}}>
                  <div style={{position:'relative',width:'72px',height:'72px',flexShrink:0}}>
                    <svg width="72" height="72" viewBox="0 0 72 72">
                      <circle cx="36" cy="36" r="30" fill="none" stroke="#EFE6DC" strokeWidth="5"/>
                      <circle cx="36" cy="36" r="30" fill="none" stroke="#2A5C4A" strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={`${2*Math.PI*30} ${2*Math.PI*30}`}
                        strokeDashoffset={2*Math.PI*30*(1-riskScores.wellbeing_score/100)}
                        transform="rotate(-90 36 36)"/>
                    </svg>
                    <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',fontWeight:'800',color:'#2A5C4A'}}>
                      {riskScores.wellbeing_score}
                    </div>
                  </div>
                  <div>
                    <div style={{fontSize:'36px',fontWeight:'800',color:'#1F2F2C',lineHeight:'1'}}>{riskScores.wellbeing_score}<span style={{fontSize:'16px',color:'#B2A692',fontWeight:'400'}}>/100</span></div>
                    <span style={{
                      fontSize:'11px',fontWeight:'600',padding:'3px 10px',borderRadius:'20px',marginTop:'6px',display:'inline-block',
                      background: riskScores.wellbeing_score >= 70 ? '#E5F2E8' : riskScores.wellbeing_score >= 50 ? '#FEF3C7' : '#FEE2E2',
                      color: riskScores.wellbeing_score >= 70 ? '#2A5C4A' : riskScores.wellbeing_score >= 50 ? '#92400E' : '#DC2626'
                    }}>
                      {riskScores.wellbeing_score >= 70 ? '✓ Good' : riskScores.wellbeing_score >= 50 ? '⚠ Fair' : '↓ Needs attention'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Risk cards */}
              {[
                {label:'DIABETES RISK',value:riskScores.diabetes_risk,color:'#C2593A',icon:'🩸'},
                {label:'CARDIOVASCULAR',value:riskScores.cardiovascular_risk,color:'#E68A5E',icon:'🫀'},
                {label:'HYPERTENSION',value:riskScores.hypertension_risk,color:'#7E9A76',icon:'💉'},
              ].map((item,i) => (
                <div key={i} className="card" style={{textAlign:'center'}}>
                  <div style={{fontSize:'28px',marginBottom:'8px'}}>{item.icon}</div>
                  <div className="section-tag">{item.label}</div>
                  <div style={{fontSize:'32px',fontWeight:'800',color:item.color}}>{item.value}%</div>
                  <span style={{fontSize:'11px',fontWeight:'600',padding:'3px 10px',borderRadius:'20px',marginTop:'6px',display:'inline-block',background:`${item.color}15`,color:item.color}}>
                    {item.value >= 40 ? 'Elevated' : item.value >= 20 ? 'Moderate' : 'Low'}
                  </span>
                </div>
              ))}
            </div>

            {/* Disease Risk Forecast */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px',marginBottom:'24px'}}>
              {[
                {name:'Type 2 Diabetes',risk:riskScores.diabetes_risk,icon:'🩸',color:'#C2593A'},
                {name:'Cardiovascular Disease',risk:riskScores.cardiovascular_risk,icon:'🫀',color:'#E68A5E'},
                {name:'Hypertension',risk:riskScores.hypertension_risk,icon:'💉',color:'#7E9A76'},
              ].map((item,i) => (
                <div key={i} className="card">
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <span style={{fontSize:'24px'}}>{item.icon}</span>
                      <div>
                        <div style={{fontWeight:'700',color:'#1F2F2C',fontSize:'14px'}}>{item.name}</div>
                        <div style={{fontSize:'12px',color:'#8F9B96'}}>5-year risk</div>
                      </div>
                    </div>
                    <span style={{fontSize:'11px',fontWeight:'600',padding:'3px 10px',borderRadius:'6px',background:`${item.color}15`,color:item.color}}>
                      {item.risk >= 40 ? 'Elevated' : item.risk >= 20 ? 'Moderate' : 'Low'}
                    </span>
                  </div>
                  <div style={{background:'#F1EAE1',borderRadius:'4px',height:'8px',marginBottom:'8px'}}>
                    <div style={{width:`${item.risk}%`,height:'8px',borderRadius:'4px',background:item.color,transition:'width 1s ease'}}></div>
                  </div>
                  <div style={{fontSize:'28px',fontWeight:'800',color:item.color}}>{item.risk}%</div>
                </div>
              ))}
            </div>

            {/* AI Recommendations */}
            <div className="card" style={{marginBottom:'24px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px'}}>
                <div style={{fontSize:'11px',fontWeight:'700',color:'#C2593A',letterSpacing:'1px'}}>— AI RECOMMENDATIONS</div>
                <span style={{fontSize:'11px',fontWeight:'600',padding:'3px 10px',borderRadius:'20px',background:'#F1EAE1',color:'#A55639'}}>Personalised</span>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                {riskScores.diabetes_risk >= 30 && (
                  <div style={{display:'flex',gap:'12px',padding:'14px',borderRadius:'14px',background:'#FEF9F7',border:'1px solid #EFE6DC',borderLeft:'3px solid #C2593A'}}>
                    <span style={{fontSize:'16px'}}>🍽️</span>
                    <p style={{fontSize:'14px',color:'#4A5B5E',lineHeight:'1.6'}}>Reduce refined carbohydrate intake — target less than 150g/day to lower diabetes risk by up to 14 points.</p>
                  </div>
                )}
                {riskScores.cardiovascular_risk >= 25 && (
                  <div style={{display:'flex',gap:'12px',padding:'14px',borderRadius:'14px',background:'#FEF9F7',border:'1px solid #EFE6DC',borderLeft:'3px solid #E68A5E'}}>
                    <span style={{fontSize:'16px'}}>🚶</span>
                    <p style={{fontSize:'14px',color:'#4A5B5E',lineHeight:'1.6'}}>Add 20 minutes of daily cardio exercise to improve cardiovascular health and reduce inflammation markers.</p>
                  </div>
                )}
                {riskScores.hypertension_risk >= 25 && (
                  <div style={{display:'flex',gap:'12px',padding:'14px',borderRadius:'14px',background:'#FEF9F7',border:'1px solid #EFE6DC',borderLeft:'3px solid #7E9A76'}}>
                    <span style={{fontSize:'16px'}}>🧂</span>
                    <p style={{fontSize:'14px',color:'#4A5B5E',lineHeight:'1.6'}}>Reduce sodium intake to less than 2300mg/day and monitor blood pressure weekly to manage hypertension risk.</p>
                  </div>
                )}
                <div style={{display:'flex',gap:'12px',padding:'14px',borderRadius:'14px',background:'#F0F4EC',border:'1px solid #D4E4D0',borderLeft:'3px solid #2A5C4A'}}>
                  <span style={{fontSize:'16px'}}>📊</span>
                  <p style={{fontSize:'14px',color:'#4A5B5E',lineHeight:'1.6'}}>Keep logging health data regularly for more accurate predictions and personalised insights.</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px'}}>
              {[
                {icon:'➕',label:'Add Health Data',action:() => navigate('/health-input'),color:'#2A5C4A'},
                {icon:'📄',label:'Upload Report',action:() => navigate('/report-upload'),color:'#C2593A'},
                {icon:'📈',label:'Health History',action:() => navigate('/history'),color:'#E68A5E'},
                {icon:'🤖',label:'AI Assistant',action:() => navigate('/chat'),color:'#5B6E6B'},
              ].map((item,i) => (
                <div key={i} onClick={item.action}
                  style={{background:'white',borderRadius:'20px',padding:'20px',textAlign:'center',border:'1px solid #EFE6DC',cursor:'pointer',transition:'all 0.2s'}}
                  onMouseEnter={e => {e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.borderColor=item.color}}
                  onMouseLeave={e => {e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.borderColor='#EFE6DC'}}>
                  <div style={{fontSize:'28px',marginBottom:'8px'}}>{item.icon}</div>
                  <div style={{fontSize:'13px',fontWeight:'600',color:'#4A5B5E'}}>{item.label}</div>
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