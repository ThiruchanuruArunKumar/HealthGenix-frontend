import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden"
      style={{background:'linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #0a1628 100%)'}}>

      <style>{`
        @keyframes float1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(80px,-60px) scale(1.1)}66%{transform:translate(-40px,80px) scale(0.9)}}
        @keyframes float2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-80px,60px) scale(1.1)}66%{transform:translate(40px,-80px) scale(0.9)}}
        @keyframes float3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(60px,-60px) scale(1.15)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes pulse-ring{0%{transform:scale(0.8);opacity:1}100%{transform:scale(2);opacity:0}}
        @keyframes scan{0%{transform:translateY(0);opacity:0.8}100%{transform:translateY(300px);opacity:0}}
        .slide-up{animation:slideUp 0.8s ease forwards}
        .slide-up-1{animation:slideUp 0.8s ease 0.1s forwards;opacity:0}
        .slide-up-2{animation:slideUp 0.8s ease 0.2s forwards;opacity:0}
        .slide-up-3{animation:slideUp 0.8s ease 0.3s forwards;opacity:0}
        .slide-up-4{animation:slideUp 0.8s ease 0.4s forwards;opacity:0}
        .shimmer-text{
          background:linear-gradient(90deg,#14b8a6,#818cf8,#ec4899,#14b8a6);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:shimmer 4s linear infinite;
        }
        .glass{background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08)}
        .card-glow{transition:all 0.3s ease}
        .card-glow:hover{box-shadow:0 0 40px rgba(20,184,166,0.2);transform:translateY(-4px)}
        .btn-primary{
          background:linear-gradient(135deg,#14b8a6,#3b82f6);
          color:white;font-weight:700;
          padding:14px 32px;border-radius:16px;
          border:none;cursor:pointer;font-size:16px;
          transition:all 0.3s ease;
          box-shadow:0 0 30px rgba(20,184,166,0.4);
        }
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 0 50px rgba(20,184,166,0.6)}
        .btn-primary:active{transform:scale(0.98)}
        .btn-ghost{
          background:rgba(255,255,255,0.04);
          backdrop-filter:blur(20px);
          border:1px solid rgba(255,255,255,0.1);
          color:white;font-weight:700;
          padding:14px 32px;border-radius:16px;
          cursor:pointer;font-size:16px;
          transition:all 0.3s ease;
        }
        .btn-ghost:hover{background:rgba(255,255,255,0.08);border-color:rgba(20,184,166,0.4)}
      `}</style>

      {/* Background orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-40"
          style={{background:'radial-gradient(circle,rgba(20,184,166,0.4),transparent)',animation:'float1 8s ease-in-out infinite'}}></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-30"
          style={{background:'radial-gradient(circle,rgba(139,92,246,0.4),transparent)',animation:'float2 10s ease-in-out infinite'}}></div>
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-25"
          style={{background:'radial-gradient(circle,rgba(59,130,246,0.4),transparent)',animation:'float3 12s ease-in-out infinite'}}></div>
        <div className="absolute inset-0"
          style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',backgroundSize:'50px 50px'}}></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{background:'rgba(10,15,30,0.8)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm"
            style={{background:'linear-gradient(135deg,#14b8a6,#8b5cf6)',boxShadow:'0 0 20px rgba(20,184,166,0.4)'}}>H</div>
          <span className="text-xl font-black tracking-tight text-white">Health<span style={{color:'#14b8a6'}}>Genix</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Features','How it Works','Domains','FAQ'].map((item,i) => (
            <a key={i} href={`#${item.toLowerCase().replace(/ /g,'')}`}
              className="text-gray-400 hover:text-white text-sm cursor-pointer transition-all duration-200"
              style={{textDecoration:'none'}}>{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/login')}
            className="text-gray-400 hover:text-white text-sm px-4 py-2 transition-colors">Sign In</button>
          <button onClick={() => navigate('/register')}
            className="text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105"
            style={{background:'linear-gradient(135deg,#14b8a6,#8b5cf6)',boxShadow:'0 0 20px rgba(20,184,166,0.4)'}}>
            Get Started →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="slide-up inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8"
              style={{background:'rgba(20,184,166,0.1)',border:'1px solid rgba(20,184,166,0.3)'}}>
              <div className="relative">
                <span className="w-2 h-2 rounded-full block" style={{background:'#14b8a6'}}></span>
                <span className="absolute inset-0 w-2 h-2 rounded-full block"
                  style={{background:'#14b8a6',animation:'pulse-ring 2s ease-out infinite'}}></span>
              </div>
              <span className="text-sm font-medium" style={{color:'#14b8a6'}}>AI-Powered Preventive Healthcare</span>
            </div>

            <h1 className="slide-up-1 text-6xl font-black leading-none mb-6 tracking-tight text-white">
              Your Health,<br/>
              <span className="shimmer-text">Predicted.</span><br/>
              <span className="shimmer-text">Protected.</span>
            </h1>

            <p className="slide-up-2 text-gray-400 text-lg mb-10 leading-relaxed max-w-xl">
              HealthGenix fuses <strong className="text-white">200+ lifestyle and clinical parameters</strong> into a living health matrix — then uses AI to detect disease risk years before symptoms appear.
            </p>

            <div className="slide-up-3 flex items-center gap-4 mb-12">
              <button className="btn-primary" onClick={() => navigate('/register')}>
                Get Your Health Score →
              </button>
              <button className="btn-ghost" onClick={() => navigate('/login')}>
                Sign In
              </button>
            </div>

            <div className="slide-up-4 grid grid-cols-4 gap-3">
              {[
                {num:'87%',label:'Accuracy',color:'#14b8a6'},
                {num:'200+',label:'Parameters',color:'#818cf8'},
                {num:'40+',label:'Diseases',color:'#ec4899'},
                {num:'10yr',label:'Forecast',color:'#f59e0b'},
              ].map((stat,i) => (
                <div key={i} className="glass rounded-2xl p-4 text-center hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl font-black mb-1" style={{color:stat.color}}>{stat.num}</div>
                  <div className="text-gray-500 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Dashboard preview card */}
          <div className="relative">
            <div className="absolute left-0 right-0 h-0.5 z-20 rounded-full"
              style={{background:'linear-gradient(90deg,transparent,#14b8a6,transparent)',
              animation:'scan 3s ease-in-out infinite',top:'10%'}}></div>
            <div className="absolute inset-0 rounded-3xl filter blur-3xl opacity-20 transform scale-110"
              style={{background:'linear-gradient(135deg,#14b8a6,#8b5cf6)'}}></div>
            <div className="relative rounded-3xl p-6 shadow-2xl"
              style={{background:'rgba(15,23,42,0.9)',backdropFilter:'blur(20px)',
              border:'1px solid rgba(255,255,255,0.08)',
              boxShadow:'0 0 60px rgba(20,184,166,0.15),inset 0 1px 0 rgba(255,255,255,0.1)'}}>

              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold tracking-widest" style={{color:'#14b8a6'}}>HEALTH MATRIX — LIVE</span>
                <div className="flex items-center gap-2 glass rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:'#14b8a6'}}></span>
                  <span className="text-gray-400 text-xs">Syncing</span>
                </div>
              </div>

              <div className="flex items-center gap-5 rounded-2xl p-4 mb-4"
                style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#grad1)" strokeWidth="3"
                      strokeDasharray="83 17" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#14b8a6"/>
                        <stop offset="100%" stopColor="#8b5cf6"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-black" style={{color:'#14b8a6'}}>83</span>
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs tracking-widest mb-1">WELLBEING SCORE</div>
                  <div className="text-4xl font-black text-white">83<span className="text-gray-600 text-xl">/100</span></div>
                  <div className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full mt-2"
                    style={{background:'rgba(34,197,94,0.1)',color:'#22c55e',border:'1px solid rgba(34,197,94,0.2)'}}>
                    ↑ +4 this month
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  {name:'Cardiovascular',score:78,color:'#14b8a6'},
                  {name:'Metabolic',score:64,color:'#f59e0b'},
                  {name:'Sleep Quality',score:91,color:'#22c55e'},
                  {name:'Inflammation',score:45,color:'#ef4444'},
                ].map((item,i) => (
                  <div key={i} className="rounded-xl p-3"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <div className="text-gray-500 text-xs mb-2">{item.name}</div>
                    <div className="w-full rounded-full h-1.5 mb-2" style={{background:'rgba(255,255,255,0.06)'}}>
                      <div className="h-1.5 rounded-full" style={{width:`${item.score}%`,background:item.color,
                        boxShadow:`0 0 8px ${item.color}80`}}></div>
                    </div>
                    <div className="text-sm font-bold" style={{color:item.color}}>{item.score}/100</div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-4 mb-4"
                style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                <div className="text-gray-500 text-xs tracking-widest mb-3">5-YEAR RISK FORECAST</div>
                {[
                  {name:'Type 2 Diabetes',risk:38,color:'#ef4444',level:'Elevated'},
                  {name:'Hypertension',risk:22,color:'#f59e0b',level:'Moderate'},
                  {name:'Cognitive Decline',risk:9,color:'#22c55e',level:'Low'},
                ].map((item,i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b last:border-0"
                    style={{borderColor:'rgba(255,255,255,0.05)'}}>
                    <div className="flex-1">
                      <div className="text-gray-300 text-xs mb-1.5 font-medium">{item.name}</div>
                      <div className="w-full rounded-full h-1" style={{background:'rgba(255,255,255,0.06)'}}>
                        <div className="h-1 rounded-full" style={{width:`${item.risk}%`,background:item.color,
                          boxShadow:`0 0 6px ${item.color}`}}></div>
                      </div>
                    </div>
                    <span className="text-sm font-black" style={{color:item.color}}>{item.risk}%</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{background:`${item.color}15`,color:item.color,border:`1px solid ${item.color}30`}}>{item.level}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-3"
                style={{background:'linear-gradient(135deg,rgba(139,92,246,0.1),rgba(20,184,166,0.1))',
                border:'1px solid rgba(139,92,246,0.2)'}}>
                <div className="flex items-start gap-2">
                  <span className="text-lg" style={{color:'#8b5cf6'}}>✦</span>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    <strong style={{color:'#14b8a6'}}>AI Insight:</strong> Reducing refined carbs by 30% could lower your T2D risk by 14 points over 6 months.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-24 px-8"
        style={{borderTop:'1px solid rgba(255,255,255,0.05)'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-white">Everything You Need</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">A comprehensive health intelligence platform to help you make informed decisions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {icon:'🧬',title:'Disease Risk Prediction',desc:'AI predicts your risk for 40+ diseases with 87% accuracy — years before symptoms appear.',color:'#14b8a6'},
              {icon:'📊',title:'Health Matrix Engine',desc:'Analyses 200+ parameters and cross-correlates them to find hidden compounding risks.',color:'#818cf8'},
              {icon:'📄',title:'Report Scanner',desc:'Upload past blood reports. AI automatically extracts and analyses all health parameters.',color:'#ec4899'},
              {icon:'⚡',title:'AI Recommendations',desc:'Personalised action plans ranked by impact — nutrition, exercise, sleep, and referrals.',color:'#f59e0b'},
              {icon:'📈',title:'Health Timeline',desc:'Track your health journey over time and measure the impact of lifestyle improvements.',color:'#22c55e'},
              {icon:'🏥',title:'Clinical Reports',desc:'Export physician-ready health reports to share with your doctor for better consultations.',color:'#3b82f6'},
            ].map((feat,i) => (
              <div key={i} className="glass rounded-2xl p-6 card-glow cursor-default">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{background:`${feat.color}15`,border:`1px solid ${feat.color}30`,
                  boxShadow:`0 0 20px ${feat.color}20`}}>{feat.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{feat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="howitworks" className="relative z-10 py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-white">How It Works</h2>
            <p className="text-gray-400 text-lg">Four simple steps to understand your complete health picture.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {step:'01',icon:'📝',title:'Enter Health Data',desc:'Input basic parameters or upload past medical reports.',color:'#14b8a6'},
              {step:'02',icon:'🧠',title:'AI Analysis',desc:'AI analyses 200+ parameters and finds hidden risk correlations.',color:'#818cf8'},
              {step:'03',icon:'🎯',title:'Get Risk Scores',desc:'Receive disease risk predictions with 1, 5 and 10 year forecasts.',color:'#ec4899'},
              {step:'04',icon:'⚡',title:'Take Action',desc:'Follow personalised prevention plans to reduce your risks.',color:'#f59e0b'},
            ].map((step,i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
                  style={{background:`${step.color}15`,border:`1px solid ${step.color}30`,
                  boxShadow:`0 0 30px ${step.color}30`}}>{step.icon}</div>
                <div className="text-xs font-bold tracking-widest mb-2" style={{color:step.color}}>STEP {step.step}</div>
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains */}
      <section id="domains" className="relative z-10 py-24 px-8"
        style={{borderTop:'1px solid rgba(255,255,255,0.05)'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-white">10 Health Domains Covered</h2>
            <p className="text-gray-400 text-lg">HealthGenix monitors every aspect of your health.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              {icon:'🫀',name:'Cardiovascular',color:'#ef4444'},
              {icon:'🩸',name:'Metabolic',color:'#f59e0b'},
              {icon:'🫁',name:'Respiratory',color:'#3b82f6'},
              {icon:'🧠',name:'Neurological',color:'#8b5cf6'},
              {icon:'🦴',name:'Musculoskeletal',color:'#f97316'},
              {icon:'⚗️',name:'Hormonal',color:'#ec4899'},
              {icon:'🦠',name:'Immune',color:'#22c55e'},
              {icon:'🫘',name:'Digestive',color:'#14b8a6'},
              {icon:'👁️',name:'Organ Health',color:'#6366f1'},
              {icon:'🎗️',name:'Cancer Risk',color:'#f43f5e'},
            ].map((domain,i) => (
              <div key={i} className="glass rounded-2xl p-4 text-center card-glow cursor-default">
                <div className="text-3xl mb-2">{domain.icon}</div>
                <div className="text-gray-300 text-xs font-medium">{domain.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 py-24 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-white">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              {q:'Is HealthGenix a replacement for a doctor?',a:'No. HealthGenix is a preventive intelligence tool. It helps you understand your health risks and take early action. Always consult a qualified physician for medical advice.'},
              {q:'How accurate are the predictions?',a:'Our AI models are based on validated clinical formulas like Framingham Risk Score and FINDRISC with an average accuracy of 87%. Accuracy improves as you log more data.'},
              {q:'Is my health data safe?',a:'Yes. All your health data is encrypted and stored securely. We never sell your data to third parties. Your privacy is our highest priority.'},
              {q:'How often should I update my health data?',a:'We recommend updating basic parameters weekly and lab values whenever you get a new blood test. More data means more accurate predictions.'},
              {q:'Can I share reports with my doctor?',a:'Yes! HealthGenix generates physician-friendly health reports that you can export and share directly with your doctor.'},
            ].map((faq,i) => (
              <div key={i} className="glass rounded-2xl p-6 card-glow cursor-default">
                <h3 className="text-white font-bold mb-2">❓ {faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-16 text-center"
            style={{background:'linear-gradient(135deg,rgba(20,184,166,0.2),rgba(139,92,246,0.2))',
            border:'1px solid rgba(255,255,255,0.1)',
            boxShadow:'0 0 80px rgba(20,184,166,0.2)'}}>
            <div className="absolute inset-0"
              style={{backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.05) 1px,transparent 1px)',
              backgroundSize:'20px 20px'}}></div>
            <div className="relative">
              <h2 className="text-4xl font-black text-white mb-4">Take Control of Your Health Today</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Join thousands of users predicting and preventing disease before symptoms appear. Free to start!</p>
              <button className="btn-primary" onClick={() => navigate('/register')}>
                Get Started Free →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-8"
        style={{borderTop:'1px solid rgba(255,255,255,0.05)'}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-sm"
                  style={{background:'linear-gradient(135deg,#14b8a6,#8b5cf6)'}}>H</div>
                <span className="text-lg font-black text-white">Health<span style={{color:'#14b8a6'}}>Genix</span></span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">Next generation preventive healthcare intelligence.</p>
            </div>
            {[
              {title:'Product',items:['Features','Health Matrix','Risk Dashboard','Action Plans']},
              {title:'Legal',items:['Privacy Policy','Terms of Service','Medical Disclaimer','Cookie Policy']},
              {title:'Support',items:['Contact Us','FAQ','Documentation','healthgenix@gmail.com']},
            ].map((col,i) => (
              <div key={i}>
                <h4 className="text-white font-bold mb-4">{col.title}</h4>
                <div className="flex flex-col gap-2">
                  {col.items.map((item,j) => (
                    <span key={j} className="text-gray-500 text-sm hover:text-teal-400 cursor-pointer transition-colors">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-8 flex items-center justify-between"
            style={{borderTop:'1px solid rgba(255,255,255,0.05)'}}>
            <span className="text-gray-600 text-sm">© 2026 HealthGenix. All rights reserved.</span>
            <span className="text-gray-600 text-sm">Not a substitute for professional medical advice.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;