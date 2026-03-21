import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../api';

function HealthHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/health/history', {headers:{Authorization:`Bearer ${token}`}});
      setHistory(res.data.history);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'});
  };

  return (
    <div style={{minHeight:'100vh',background:'#FEFAF5',fontFamily:"'Inter',system-ui,sans-serif",color:'#1E2A2E'}}>
      <style>{`
        * { box-sizing:border-box; }
        .card { background:white; border-radius:24px; border:1px solid #EFE6DC; padding:24px; transition:all 0.2s; }
        .card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.06); }
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>

      {/* NAV */}
      <nav style={{background:'rgba(254,250,245,0.92)',backdropFilter:'blur(16px)',borderBottom:'1px solid #ECE3D8',padding:'0 40px',height:'68px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer'}} onClick={() => navigate('/')}>
          <div style={{width:'38px',height:'38px',background:'#2A5C4A',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'800',fontSize:'16px'}}>H</div>
          <span style={{fontSize:'18px',fontWeight:'800',color:'#1F2F2C'}}>Health<span style={{color:'#C2593A'}}>Genix</span></span>
        </div>
        <button onClick={() => navigate('/dashboard')}
          style={{background:'none',border:'none',color:'#8F9B96',cursor:'pointer',fontSize:'14px',fontWeight:'500'}}>
          ← Back to Dashboard
        </button>
      </nav>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'40px'}}>
        <div style={{marginBottom:'32px'}}>
          <div style={{fontSize:'13px',fontWeight:'600',color:'#C2593A',marginBottom:'8px'}}>— health timeline</div>
          <h1 style={{fontSize:'32px',fontWeight:'800',color:'#1F2F2C',letterSpacing:'-1px',marginBottom:'8px'}}>Health History</h1>
          <p style={{color:'#8F9B96',fontSize:'14px'}}>Track how your health scores have changed over time</p>
        </div>

        {loading && (
          <div style={{textAlign:'center',padding:'80px 0'}}>
            <div style={{width:'48px',height:'48px',border:'3px solid #EFE6DC',borderTopColor:'#C2593A',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto 16px'}}></div>
            <p style={{color:'#8F9B96'}}>Loading your health history...</p>
          </div>
        )}

        {!loading && history.length === 0 && (
          <div style={{textAlign:'center',padding:'80px 0'}}>
            <div style={{fontSize:'64px',marginBottom:'20px'}}>📊</div>
            <h2 style={{fontSize:'24px',fontWeight:'800',color:'#1F2F2C',marginBottom:'12px'}}>No history yet</h2>
            <p style={{color:'#8F9B96',marginBottom:'28px'}}>Start logging your health data to build your health timeline.</p>
            <button onClick={() => navigate('/health-input')}
              style={{background:'#C2593A',color:'white',fontWeight:'600',padding:'14px 32px',borderRadius:'60px',border:'none',cursor:'pointer',fontSize:'15px'}}>
              + Add health data now
            </button>
          </div>
        )}

        {!loading && history.length > 0 && (
          <>
            {/* Summary */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginBottom:'32px'}}>
              {[
                {icon:'🎯',label:'Latest Score',value:history[0]?.wellbeing_score,sub:'/100',color:'#2A5C4A'},
                {icon:'📊',label:'Total Entries',value:history.length,sub:'entries',color:'#C2593A'},
                {
                  icon:'📈',
                  label:'Overall Trend',
                  value: history.length > 1
                    ? history[0].wellbeing_score > history[history.length-1].wellbeing_score
                      ? '↑ Improving' : '↓ Declining'
                    : 'Keep logging',
                  color: history.length > 1
                    ? history[0].wellbeing_score > history[history.length-1].wellbeing_score
                      ? '#2A5C4A' : '#C2593A'
                    : '#E68A5E'
                },
              ].map((stat,i) => (
                <div key={i} className="card" style={{textAlign:'center'}}>
                  <div style={{fontSize:'28px',marginBottom:'8px'}}>{stat.icon}</div>
                  <div style={{fontSize:'24px',fontWeight:'800',color:stat.color}}>{stat.value}{stat.sub && <span style={{fontSize:'14px',color:'#B2A692',fontWeight:'400'}}> {stat.sub}</span>}</div>
                  <div style={{fontSize:'12px',color:'#8F9B96',marginTop:'4px'}}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Entries */}
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              {history.map((entry,i) => (
                <div key={i} className="card">
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
                      <div style={{width:'44px',height:'44px',borderRadius:'14px',background:'#F1EAE1',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'800',color:'#2A5C4A',fontSize:'16px'}}>
                        {history.length - i}
                      </div>
                      <div>
                        <div style={{fontWeight:'700',color:'#1F2F2C',fontSize:'15px'}}>{formatDate(entry.calculated_at)}</div>
                        <div style={{fontSize:'12px',color:'#8F9B96'}}>Health Check #{history.length - i}</div>
                      </div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontSize:'28px',fontWeight:'800',color:'#2A5C4A'}}>{entry.wellbeing_score}</div>
                      <div style={{fontSize:'11px',color:'#8F9B96'}}>Wellbeing Score</div>
                    </div>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px'}}>
                    {[
                      {label:'Diabetes Risk',value:entry.diabetes_risk,color:'#C2593A'},
                      {label:'Cardiovascular',value:entry.cardiovascular_risk,color:'#E68A5E'},
                      {label:'Hypertension',value:entry.hypertension_risk,color:'#7E9A76'},
                    ].map((risk,j) => (
                      <div key={j} style={{background:'#FAF7F2',borderRadius:'14px',padding:'12px',textAlign:'center'}}>
                        <div style={{fontSize:'20px',fontWeight:'800',color:risk.color,marginBottom:'4px'}}>{risk.value}%</div>
                        <div style={{fontSize:'11px',color:'#8F9B96',marginBottom:'8px'}}>{risk.label}</div>
                        <div style={{height:'4px',background:'#EADFCB',borderRadius:'2px'}}>
                          <div style={{width:`${risk.value}%`,height:'4px',borderRadius:'2px',background:risk.color}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HealthHistory;