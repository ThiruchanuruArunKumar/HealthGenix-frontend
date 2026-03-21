import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import API from '../api';

function Chatbot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([{
    role:'bot',
    text:"👋 Hi! I'm your HealthGenix AI Assistant. I can answer any health question you have — ask me anything about your risk scores, symptoms, nutrition, exercise, or general health advice!"
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [healthData, setHealthData] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => { fetchHealthData(); }, []);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({behavior:'smooth'}); }, [messages]);

  const fetchHealthData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/health/data', {headers:{Authorization:`Bearer ${token}`}});
      setHealthData(res.data.riskScores);
    } catch {}
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, {role:'user', text:userMessage}]);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await API.post('/chat/message', {message:userMessage, healthData}, {
        headers:{Authorization:`Bearer ${token}`}
      });
      setMessages(prev => [...prev, {role:'bot', text:res.data.reply}]);
    } catch {
      setMessages(prev => [...prev, {role:'bot', text:'❌ Sorry, I encountered an error. Please try again!'}]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "What does my diabetes risk mean?",
    "How can I improve my wellbeing score?",
    "What foods should I avoid?",
    "How to reduce stress naturally?",
    "What exercises help heart health?",
    "How much sleep do I need?",
  ];

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:'#FEFAF5',fontFamily:"'Inter',system-ui,sans-serif",color:'#1E2A2E'}}>
      <style>{`
        * { box-sizing:border-box; }
        .input-field {
          flex:1; background:white;
          border:1.5px solid #E8DDD0; border-radius:60px;
          padding:14px 20px; color:#1E2A2E; font-size:14px;
          outline:none; transition:all 0.2s; font-family:'Inter',sans-serif;
        }
        .input-field:focus { border-color:#2A5C4A; box-shadow:0 0 0 3px rgba(42,92,74,0.08); }
        .input-field::placeholder { color:#B2A692; }
        .suggestion-btn {
          background:white; border:1.5px solid #E8DDD0;
          color:#4A5B5E; font-size:12px; padding:7px 14px;
          border-radius:60px; cursor:pointer; transition:all 0.2s;
          white-space:nowrap; font-family:'Inter',sans-serif; font-weight:500;
        }
        .suggestion-btn:hover { border-color:#2A5C4A; color:#2A5C4A; background:#F0F4EC; }
        @keyframes typing { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        .dot { width:6px; height:6px; border-radius:50%; background:#2A5C4A; display:inline-block; margin:0 2px; }
        .dot:nth-child(1){animation:typing 1.2s ease infinite}
        .dot:nth-child(2){animation:typing 1.2s ease 0.2s infinite}
        .dot:nth-child(3){animation:typing 1.2s ease 0.4s infinite}
      `}</style>

      {/* NAV */}
      <nav style={{background:'rgba(254,250,245,0.92)',backdropFilter:'blur(16px)',borderBottom:'1px solid #ECE3D8',padding:'0 40px',height:'68px',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer'}} onClick={() => navigate('/')}>
          <div style={{width:'38px',height:'38px',background:'#2A5C4A',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'800',fontSize:'16px'}}>H</div>
          <span style={{fontSize:'18px',fontWeight:'800',color:'#1F2F2C'}}>Health<span style={{color:'#C2593A'}}>Genix</span></span>
          <span style={{fontSize:'11px',fontWeight:'700',padding:'3px 10px',borderRadius:'20px',background:'#F1EAE1',color:'#A55639',marginLeft:'4px'}}>AI Assistant</span>
        </div>
        <button onClick={() => navigate('/dashboard')}
          style={{background:'none',border:'none',color:'#8F9B96',cursor:'pointer',fontSize:'14px',fontWeight:'500'}}>
          ← Back to Dashboard
        </button>
      </nav>

      {/* Health Data Banner */}
      {healthData && (
        <div style={{background:'#F0F4EC',borderBottom:'1px solid #D4E4D0',padding:'10px 40px'}}>
          <div style={{maxWidth:'800px',margin:'0 auto',display:'flex',alignItems:'center',gap:'24px',fontSize:'12px',flexWrap:'wrap'}}>
            <span style={{fontWeight:'700',color:'#2A5C4A'}}>Your health data:</span>
            <span style={{color:'#4A5B5E'}}>Wellbeing: <strong style={{color:'#1F2F2C'}}>{healthData.wellbeing_score}/100</strong></span>
            <span style={{color:'#4A5B5E'}}>Diabetes: <strong style={{color:'#C2593A'}}>{healthData.diabetes_risk}%</strong></span>
            <span style={{color:'#4A5B5E'}}>Cardiovascular: <strong style={{color:'#E68A5E'}}>{healthData.cardiovascular_risk}%</strong></span>
            <span style={{color:'#4A5B5E'}}>Hypertension: <strong style={{color:'#7E9A76'}}>{healthData.hypertension_risk}%</strong></span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div style={{flex:1,overflowY:'auto',padding:'24px 40px'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',display:'flex',flexDirection:'column',gap:'16px'}}>
          {messages.map((msg,i) => (
            <div key={i} style={{display:'flex',justifyContent:msg.role==='user'?'flex-end':'flex-start',alignItems:'flex-end',gap:'10px'}}>
              {msg.role === 'bot' && (
                <div style={{width:'32px',height:'32px',borderRadius:'10px',background:'#2A5C4A',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'700',color:'white',fontSize:'11px',flexShrink:0}}>AI</div>
              )}
              <div style={{
                maxWidth:'70%',padding:'14px 18px',fontSize:'14px',lineHeight:'1.6',
                background:msg.role==='user'?'#C2593A':'white',
                color:msg.role==='user'?'white':'#1E2A2E',
                borderRadius:msg.role==='user'?'20px 20px 4px 20px':'20px 20px 20px 4px',
                boxShadow:msg.role==='user'?'0 2px 8px rgba(194,89,58,0.2)':'0 2px 8px rgba(0,0,0,0.04)',
                border:msg.role==='user'?'none':'1px solid #EFE6DC',
                whiteSpace:'pre-wrap'
              }}>
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div style={{width:'32px',height:'32px',borderRadius:'10px',background:'#F1EAE1',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'700',color:'#A55639',fontSize:'11px',flexShrink:0}}>You</div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-end',gap:'10px'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'10px',background:'#2A5C4A',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'700',color:'white',fontSize:'11px'}}>AI</div>
              <div style={{padding:'14px 18px',background:'white',border:'1px solid #EFE6DC',borderRadius:'20px 20px 20px 4px',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}/>
        </div>
      </div>

      {/* Suggestions */}
      <div style={{padding:'12px 40px',flexShrink:0}}>
        <div style={{maxWidth:'800px',margin:'0 auto',display:'flex',gap:'8px',overflowX:'auto',paddingBottom:'4px'}}>
          {suggestions.map((s,i) => (
            <button key={i} className="suggestion-btn" onClick={() => setInput(s)}>{s}</button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={{padding:'16px 40px 24px',background:'rgba(254,250,245,0.95)',backdropFilter:'blur(16px)',borderTop:'1px solid #ECE3D8',flexShrink:0}}>
        <div style={{maxWidth:'800px',margin:'0 auto',display:'flex',gap:'12px',alignItems:'center'}}>
          <input className="input-field"
            placeholder="Ask me anything about your health..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}/>
          <button onClick={sendMessage} disabled={loading || !input.trim()}
            style={{background:input.trim()&&!loading?'#C2593A':'#D9CFC2',color:input.trim()&&!loading?'white':'#8F9B96',fontWeight:'600',padding:'14px 24px',borderRadius:'60px',border:'none',cursor:input.trim()&&!loading?'pointer':'not-allowed',fontSize:'14px',transition:'all 0.2s',whiteSpace:'nowrap',fontFamily:"'Inter',sans-serif"}}>
            Send →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;