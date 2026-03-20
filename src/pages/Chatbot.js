import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import API from '../api';

function Chatbot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "👋 Hi! I'm your HealthGenix AI Assistant! I can answer any health question you have. Ask me anything about your health, symptoms, nutrition, exercise, or your risk scores!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [healthData, setHealthData] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchHealthData();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchHealthData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/health/data', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHealthData(res.data.riskScores);
    } catch (error) {
      console.error('Error fetching health data:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');

    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await API.post('/chat/message', {
        message: userMessage,
        healthData
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages(prev => [...prev, { role: 'bot', text: res.data.reply }]);

    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: '❌ Sorry, I encountered an error. Please try again!'
      }]);
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
    "How much sleep do I need?"
  ];

  return (
    <div className="min-h-screen flex flex-col"
      style={{background:'linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #0a1628 100%)'}}>

      <style>{`
        @keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-30px)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes typing{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
        .msg-appear{animation:fadeIn 0.3s ease forwards}
        .glass{background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08)}
        .typing-dot{
          width:6px;height:6px;border-radius:50%;
          background:#14b8a6;display:inline-block;margin:0 2px;
        }
        .typing-dot:nth-child(1){animation:typing 1.2s ease infinite}
        .typing-dot:nth-child(2){animation:typing 1.2s ease 0.2s infinite}
        .typing-dot:nth-child(3){animation:typing 1.2s ease 0.4s infinite}
        .input-field{
          flex:1;background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:14px;padding:14px 18px;
          color:white;font-size:14px;outline:none;
          transition:all 0.3s ease;
        }
        .input-field:focus{
          border-color:rgba(20,184,166,0.6);
          background:rgba(20,184,166,0.06);
          box-shadow:0 0 20px rgba(20,184,166,0.15);
        }
        .input-field::placeholder{color:rgba(255,255,255,0.25)}
        .send-btn{
          background:linear-gradient(135deg,#14b8a6,#3b82f6);
          color:white;font-weight:700;
          padding:14px 24px;border-radius:14px;
          border:none;cursor:pointer;font-size:14px;
          transition:all 0.3s ease;
          box-shadow:0 0 20px rgba(20,184,166,0.3);
          white-space:nowrap;
        }
        .send-btn:hover{transform:translateY(-2px);box-shadow:0 0 30px rgba(20,184,166,0.5)}
        .send-btn:disabled{opacity:0.5;cursor:not-allowed;transform:none}
        .suggestion-btn{
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          color:#a0aec0;font-size:12px;
          padding:8px 14px;border-radius:20px;
          cursor:pointer;transition:all 0.3s ease;
          white-space:nowrap;
        }
        .suggestion-btn:hover{
          background:rgba(20,184,166,0.1);
          border-color:rgba(20,184,166,0.3);
          color:#14b8a6;
        }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
          style={{background:'radial-gradient(circle,rgba(20,184,166,0.5),transparent)',animation:'float1 10s ease-in-out infinite'}}></div>
        <div className="absolute inset-0"
          style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',backgroundSize:'50px 50px'}}></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{background:'rgba(10,15,30,0.8)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-sm"
            style={{background:'linear-gradient(135deg,#14b8a6,#8b5cf6)'}}>H</div>
          <span className="text-lg font-black text-white">Health<span style={{color:'#14b8a6'}}>Genix</span></span>
          <span className="text-xs px-2 py-1 rounded-full font-medium ml-2"
            style={{background:'rgba(20,184,166,0.1)',color:'#14b8a6',border:'1px solid rgba(20,184,166,0.2)'}}>
            AI Assistant
          </span>
        </div>
        <button onClick={() => navigate('/dashboard')}
          className="text-gray-400 hover:text-white text-sm transition-colors">
          ← Back to Dashboard
        </button>
      </nav>

      {/* Health Data Banner */}
      {healthData && (
        <div className="relative z-10 px-6 py-3 flex-shrink-0"
          style={{background:'rgba(20,184,166,0.05)',borderBottom:'1px solid rgba(20,184,166,0.1)'}}>
          <div className="max-w-4xl mx-auto flex items-center gap-6 text-xs">
            <span style={{color:'#14b8a6'}} className="font-bold">Your Health Data:</span>
            <span className="text-gray-400">Wellbeing: <strong className="text-white">{healthData.wellbeing_score}/100</strong></span>
            <span className="text-gray-400">Diabetes: <strong style={{color:'#ef4444'}}>{healthData.diabetes_risk}%</strong></span>
            <span className="text-gray-400">Cardiovascular: <strong style={{color:'#f59e0b'}}>{healthData.cardiovascular_risk}%</strong></span>
            <span className="text-gray-400">Hypertension: <strong style={{color:'#818cf8'}}>{healthData.hypertension_risk}%</strong></span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">

          {messages.map((msg, i) => (
            <div key={i} className={`msg-appear flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'bot' && (
                <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-xs flex-shrink-0 mr-3 mt-1"
                  style={{background:'linear-gradient(135deg,#14b8a6,#8b5cf6)'}}>AI</div>
              )}
              <div className="max-w-2xl">
                <div className="p-4 rounded-2xl text-sm leading-relaxed"
                  style={{
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg,#14b8a6,#3b82f6)'
                      : 'rgba(255,255,255,0.04)',
                    border: msg.role === 'user'
                      ? 'none'
                      : '1px solid rgba(255,255,255,0.08)',
                    color: 'white',
                    borderRadius: msg.role === 'user'
                      ? '20px 20px 4px 20px'
                      : '20px 20px 20px 4px'
                  }}>
                  {msg.text}
                </div>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-xs flex-shrink-0 ml-3 mt-1"
                  style={{background:'linear-gradient(135deg,#8b5cf6,#ec4899)'}}>
                  You
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-xs flex-shrink-0 mr-3"
                style={{background:'linear-gradient(135deg,#14b8a6,#8b5cf6)'}}>AI</div>
              <div className="p-4 rounded-2xl"
                style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef}/>
        </div>
      </div>

      {/* Suggestions */}
      <div className="relative z-10 px-6 py-3 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {suggestions.map((s, i) => (
              <button key={i} className="suggestion-btn flex-shrink-0"
                onClick={() => setInput(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="relative z-10 px-6 py-4 flex-shrink-0"
        style={{background:'rgba(10,15,30,0.8)',backdropFilter:'blur(20px)',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            className="input-field"
            placeholder="Ask me anything about your health..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="send-btn" onClick={sendMessage} disabled={loading || !input.trim()}>
            Send →
          </button>
        </div>
      </div>

    </div>
  );
}

export default Chatbot;