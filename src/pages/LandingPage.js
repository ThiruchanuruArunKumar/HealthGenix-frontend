import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LandingPage() {
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState(null);
  const [activity, setActivity] = useState(3.5);

  const updateRisks = (hours) => {
    setActivity(parseFloat(hours));
  };

  const factor = (activity - 3.5) * 1.9;
  const wellbeing = Math.min(98, Math.max(54, Math.round(73 + factor * 1.8)));
  const diabetes = Math.min(52, Math.max(12, Math.round(44 - factor * 2.3)));
  const hypertension = Math.min(42, Math.max(9, Math.round(28 - factor * 1.9)));
  const cardiovascular = Math.min(35, Math.max(5, Math.round(20 - factor * 1.5)));
  const metabolic = Math.min(94, Math.max(44, Math.round(58 + factor * 2.1)));

  const circumference = 2 * Math.PI * 38;
  const strokeOffset = circumference * (1 - wellbeing / 100);

  const trendMsg = activity >= 6
    ? '↑↑ Excellent activity — risks trending down'
    : activity >= 3
    ? '↗️ Moderate activity keeps risk stable'
    : '⚠️ Low activity increases long-term risk';

  const aiMsg = diabetes > 35
    ? `⚠️ High diabetes risk. Even +2 hrs of weekly walking could reduce it by ${Math.min(14, Math.floor((activity + 1) * 2))} points.`
    : cardiovascular > 20
    ? `❤️ Your cardiovascular risk responds well to exercise. Brisk walks 4x/week recommended.`
    : `✨ Great habits! Your 5-year diabetes risk is ${diabetes}% — well below average. Keep it up!`;

  return (
    <div style={{background:'#FEFAF5',fontFamily:"'Inter', system-ui, sans-serif",color:'#1E2A2E',lineHeight:'1.5'}}>

      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background:#FEFAF5; }
        .nav-link { text-decoration:none; font-size:14px; font-weight:500; color:#4A5B5E; transition:0.2s; }
        .nav-link:hover { color:#C2593A; }
        .btn-primary {
          background:#C2593A; color:white; border:none;
          padding:14px 32px; border-radius:60px;
          font-weight:600; font-size:15px; cursor:pointer;
          transition:all 0.25s; box-shadow:0 4px 12px rgba(194,89,58,0.25);
        }
        .btn-primary:hover { background:#A74528; transform:translateY(-2px); }
        .btn-secondary {
          background:transparent; border:1.5px solid #D9CFC2;
          padding:14px 32px; border-radius:60px;
          font-weight:500; transition:0.2s; cursor:pointer; font-size:15px;
        }
        .btn-secondary:hover { border-color:#C2593A; color:#C2593A; }
        .feature-card {
          background:white; padding:32px; border-radius:28px;
          border:1px solid #EFE6DC; transition:all 0.25s;
        }
        .feature-card:hover { transform:translateY(-5px); box-shadow:0 20px 30px -15px rgba(0,0,0,0.08); }
        .domain-pill {
          background:white; border-radius:60px;
          padding:10px 24px; border:1px solid #E2D4C6;
          font-weight:500; font-size:14px;
        }
        .domain-pill:hover { border-color:#C2593A; color:#C2593A; }
        .testimonial {
          background:white; border-radius:24px;
          padding:28px; border:1px solid #EFE6DC;
        }
        .faq-item { border-bottom:1px solid #E8DDD0; }
        .faq-q {
          padding:18px 0; display:flex; justify-content:space-between;
          cursor:pointer; font-weight:700; font-size:15px;
          color:#1E2A2E; align-items:center;
        }
        .faq-q:hover { color:#C2593A; }
        .faq-a { padding-bottom:16px; color:#5E6E69; font-size:14px; line-height:1.7; }
        @keyframes pulse { 0%{opacity:0.4;transform:scale(0.8)} 100%{opacity:1;transform:scale(1.2)} }
        .pulse { width:8px; height:8px; background:#3EAA7C; border-radius:50%; animation:pulse 1.5s infinite; display:inline-block; }
        input[type="range"] { width:100%; accent-color:#C2593A; }
        .footer-link { text-decoration:none; color:#5B6E6B; font-size:14px; display:block; margin-bottom:8px; transition:0.2s; }
        .footer-link:hover { color:#C2593A; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position:'sticky',top:0,zIndex:100,
        background:'rgba(254,250,245,0.92)',
        backdropFilter:'blur(16px)',
        borderBottom:'1px solid #ECE3D8',
        padding:'0 60px',height:'72px',
        display:'flex',alignItems:'center',justifyContent:'space-between'
      }}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer'}} onClick={() => navigate('/')}>
          <div style={{width:'40px',height:'40px',background:'#2A5C4A',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'800',fontSize:'18px'}}>H</div>
          <span style={{fontSize:'20px',fontWeight:'800',color:'#1F2F2C'}}>Health<span style={{color:'#C2593A'}}>Genix</span></span>
        </div>
        <div style={{display:'flex',gap:'36px'}}>
          <a href="#features" className="nav-link">Features</a>
          <a href="#howitworks" className="nav-link">How It Works</a>
          <a href="#domains" className="nav-link">Domains</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </div>
        <div style={{display:'flex',gap:'12px'}}>
          <button onClick={() => navigate('/login')}
            style={{background:'transparent',border:'1px solid #D9CFC2',padding:'8px 20px',borderRadius:'40px',fontWeight:'500',fontSize:'13px',cursor:'pointer'}}>
            Sign in
          </button>
          <button onClick={() => navigate('/register')}
            style={{background:'#2A5C4A',color:'white',border:'none',padding:'8px 24px',borderRadius:'40px',fontWeight:'600',fontSize:'13px',cursor:'pointer'}}>
            Get started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{padding:'80px 60px 100px',maxWidth:'1400px',margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1.1fr',gap:'60px',alignItems:'center'}}>

          {/* Left */}
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#F1EAE1',borderRadius:'100px',padding:'6px 16px',fontSize:'12px',fontWeight:'600',color:'#A55639',marginBottom:'28px'}}>
              <span>⚡</span> AI-Powered Preventive Health Intelligence
            </div>
            <h1 style={{fontSize:'56px',fontWeight:'800',lineHeight:'1.1',letterSpacing:'-1.5px',color:'#1F2F2C',marginBottom:'24px'}}>
              Know your risk<br/>before it becomes<br/>
              <span style={{background:'linear-gradient(135deg,#C2593A,#E08562)',backgroundClip:'text',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                a reality.
              </span>
            </h1>
            <p style={{fontSize:'17px',color:'#5B6E6B',lineHeight:'1.65',marginBottom:'36px',maxWidth:'90%'}}>
              HealthGenix analyses <strong style={{color:'#1F2F2C'}}>200+ clinical markers and lifestyle data</strong> to forecast your risk for 40+ diseases — up to 5 years before symptoms appear.
            </p>
            <div style={{display:'flex',gap:'16px',marginBottom:'48px',flexWrap:'wrap'}}>
              <button className="btn-primary" onClick={() => navigate('/register')}>
                Get my free health score →
              </button>
              <button className="btn-secondary" onClick={() => navigate('/login')}>
                Sign in
              </button>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'14px',fontSize:'13px',color:'#7B8A86'}}>
              <div style={{display:'flex'}}>
                {['#2A5C4A','#C2593A','#5B6E6B','#8F9B96'].map((bg,i) => (
                  <div key={i} style={{width:'34px',height:'34px',borderRadius:'50%',background:bg,border:'2px solid #FEFAF5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',color:'white',marginLeft:i===0?'0':'-8px'}}>
                    {['AK','RS','PM','SN'][i]}
                  </div>
                ))}
              </div>
              <span>Trusted by <strong style={{color:'#1F2F2C'}}>2,800+</strong> members across India</span>
            </div>
          </div>

          {/* Right - Interactive Card */}
          <div style={{background:'#FFFFFF',borderRadius:'32px',boxShadow:'0 20px 35px -12px rgba(0,0,0,0.08)',border:'1px solid #EFE6DC',padding:'28px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
              <span style={{background:'#F0F4EC',borderRadius:'40px',padding:'4px 12px',display:'flex',alignItems:'center',gap:'6px',fontSize:'12px',fontWeight:'600',color:'#2A5C4A'}}>
                <span className="pulse"></span> LIVE • just updated
              </span>
              <span style={{fontSize:'11px',color:'#B2A692'}}>🎯 Slide to simulate</span>
            </div>

            {/* Score Ring */}
            <div style={{display:'flex',gap:'20px',background:'#FAF7F2',padding:'20px',borderRadius:'24px',marginBottom:'20px'}}>
              <div style={{position:'relative',width:'88px',height:'88px',flexShrink:0}}>
                <svg width="88" height="88" viewBox="0 0 88 88">
                  <circle cx="44" cy="44" r="38" fill="none" stroke="#EADFCB" strokeWidth="5"/>
                  <circle cx="44" cy="44" r="38" fill="none" stroke="#C2593A" strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeOffset}
                    transform="rotate(-90 44 44)"/>
                </svg>
                <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',fontWeight:'800',color:'#2A5C4A'}}>
                  {wellbeing}
                </div>
              </div>
              <div>
                <div style={{fontSize:'11px',letterSpacing:'1px',color:'#8F9B96',marginBottom:'4px'}}>WELLBEING INDEX</div>
                <div style={{fontSize:'44px',fontWeight:'800',lineHeight:'1',color:'#1F2F2C'}}>
                  {wellbeing}<span style={{fontSize:'18px',color:'#8F9B96'}}>/100</span>
                </div>
                <div style={{background:'#E5F2E8',color:'#2A5C4A',borderRadius:'40px',padding:'4px 10px',fontSize:'11px',fontWeight:'600',display:'inline-block',marginTop:'8px'}}>
                  {trendMsg}
                </div>
              </div>
            </div>

            {/* Slider */}
            <div style={{background:'#FEFCF9',borderRadius:'20px',padding:'16px',margin:'16px 0',border:'1px solid #EFE6DC'}}>
              <div style={{fontSize:'12px',fontWeight:'600',display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
                <span>🚶 Weekly physical activity</span>
                <span>{activity.toFixed(1)} hrs</span>
              </div>
              <input type="range" min="0" max="10" step="0.5" value={activity}
                onChange={(e) => updateRisks(e.target.value)}/>
              <div style={{fontSize:'11px',color:'#A5886F',marginTop:'8px'}}>↔️ Slide to see how lifestyle changes your risk in real time</div>
            </div>

            {/* Risk metrics */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',margin:'16px 0'}}>
              {[
                {label:'🩸 5-year diabetes risk',val:diabetes+'%',fill:diabetes,color:'#C2593A'},
                {label:'❤️ Hypertension risk',val:hypertension+'%',fill:hypertension,color:'#E68A5E'},
                {label:'💔 Cardiovascular risk',val:cardiovascular+'%',fill:cardiovascular,color:'#C0A080'},
                {label:'🍽️ Metabolic health',val:metabolic,fill:metabolic,color:'#7E9A76'},
              ].map((item,i) => (
                <div key={i} style={{background:'#FAF7F2',borderRadius:'18px',padding:'12px 14px'}}>
                  <div style={{fontSize:'12px',fontWeight:'500',color:'#6F8480'}}>{item.label}</div>
                  <div style={{fontSize:'20px',fontWeight:'800',color:'#1E2A2E'}}>{item.val}</div>
                  <div style={{height:'4px',background:'#EADFCB',borderRadius:'2px',marginTop:'6px'}}>
                    <div style={{width:`${item.fill}%`,background:item.color,height:'4px',borderRadius:'2px'}}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Insight */}
            <div style={{background:'#F5EFE7',borderRadius:'20px',padding:'14px',fontSize:'12px',borderLeft:'3px solid #C2593A'}}>
              <strong>🧠 AI insight:</strong> {aiMsg}
            </div>
            <div style={{marginTop:'14px',fontSize:'11px',color:'#B9AA97',textAlign:'center'}}>
              🔬 Powered by HealthGenix Risk Engine · Built at SIMATS
            </div>
          </div>
        </div>
      </div>

      {/* TRUSTED BY */}
      <div style={{background:'#F1EAE1',padding:'28px 60px',margin:'0 60px 40px',borderRadius:'80px',textAlign:'center'}}>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'48px',alignItems:'center'}}>
          <span style={{fontWeight:'500',color:'#6D5D4B'}}>Used by students & professionals at</span>
          {['🏥 SIMATS','🧬 Apollo Hospitals','📊 Manipal Institute','🌿 Fortis Health'].map((item,i) => (
            <span key={i} style={{fontWeight:'700',color:'#4F6A5D'}}>{item}</span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div style={{padding:'90px 60px'}} id="features">
        <div style={{maxWidth:'1280px',margin:'0 auto'}}>
          <div style={{fontSize:'13px',fontWeight:'600',color:'#C2593A',marginBottom:'12px'}}>— why it works</div>
          <h2 style={{fontSize:'44px',fontWeight:'800',letterSpacing:'-1px',color:'#1F2F2C',marginBottom:'56px'}}>
            Designed for real lives,<br/>not just numbers.
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'28px'}}>
            {[
              {icon:'🧬',title:'Disease Risk Prediction',desc:'AI predicts your risk for 40+ diseases with 87% accuracy using validated clinical models — years before symptoms appear.'},
              {icon:'📄',title:'Smart Lab Report Scanner',desc:'Upload any PDF blood report — HealthGenix AI extracts and analyses all health parameters instantly.'},
              {icon:'🤖',title:'AI Health Assistant',desc:'Chat with your personal AI health advisor anytime. Ask about symptoms, risk scores, diet and lifestyle changes.'},
              {icon:'📈',title:'Health Timeline',desc:'Track every health entry over time. See how your lifestyle improvements actually reduce your risk scores.'},
              {icon:'🩺',title:'Doctor-Ready Exports',desc:'One-tap clinical summary with risk trends and AI recommendations — ready to share with your GP.'},
              {icon:'🔒',title:'Private & Secure',desc:'Your data is encrypted and stored securely on Supabase. We never sell your health data.'},
            ].map((feat,i) => (
              <div key={i} className="feature-card">
                <div style={{fontSize:'36px',marginBottom:'12px'}}>{feat.icon}</div>
                <h3 style={{fontSize:'17px',fontWeight:'700',color:'#1F2F2C',marginBottom:'8px'}}>{feat.title}</h3>
                <p style={{fontSize:'14px',color:'#5B6E6B',lineHeight:'1.65'}}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{background:'#FFFFFF',borderTop:'1px solid #EFE6DC',borderBottom:'1px solid #EFE6DC',padding:'80px 60px'}} id="howitworks">
        <div style={{maxWidth:'1280px',margin:'0 auto',textAlign:'center'}}>
          <div style={{fontSize:'13px',fontWeight:'600',color:'#C2593A',marginBottom:'12px'}}>simple steps</div>
          <h2 style={{fontSize:'40px',fontWeight:'800',color:'#1F2F2C',marginBottom:'64px'}}>
            From data to clarity in 4 minutes
          </h2>
          <div style={{display:'flex',justifyContent:'space-between',gap:'32px',flexWrap:'wrap'}}>
            {[
              {icon:'📋',num:'1',title:'Enter health data',desc:'Add your age, lifestyle habits and upload any existing lab reports'},
              {icon:'🤖',num:'2',title:'AI cross-analysis',desc:'200+ parameters mapped against validated clinical databases'},
              {icon:'🎯',num:'3',title:'Get risk forecasts',desc:'Personalised 1-year to 10-year disease risk predictions'},
              {icon:'🌱',num:'4',title:'Take control',desc:'Follow your AI action plan and watch your risk scores improve'},
            ].map((step,i) => (
              <div key={i} style={{flex:1,textAlign:'center',minWidth:'180px'}}>
                <div style={{background:'#F1EAE1',width:'64px',height:'64px',borderRadius:'60px',display:'flex',margin:'0 auto 20px',alignItems:'center',justifyContent:'center',fontSize:'28px'}}>
                  {step.icon}
                </div>
                <h3 style={{fontSize:'16px',fontWeight:'700',color:'#1F2F2C',marginBottom:'8px'}}>{step.num}. {step.title}</h3>
                <p style={{color:'#5E6E69',fontSize:'14px',lineHeight:'1.6'}}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{padding:'90px 60px'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto'}}>
          <div style={{fontSize:'13px',fontWeight:'600',color:'#C2593A',marginBottom:'12px'}}>real stories</div>
          <h2 style={{fontSize:'40px',fontWeight:'800',color:'#1F2F2C',marginBottom:'56px'}}>What our members say</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'32px'}}>
            {[
              {text:'"HealthGenix flagged my pre-diabetes risk months before my doctor caught it. I reversed it completely following their AI action plan. This is life-changing."',name:'Anjali R.',role:'Software Engineer, Bengaluru',bg:'#2A5C4A'},
              {text:'"As a physician I now recommend HealthGenix to all my patients. The AI risk simulation is incredibly accurate and the reports are perfect for consultations."',name:'Dr. Vikram Sethi',role:'Internal Medicine, Mumbai',bg:'#C2593A'},
              {text:'"My cardiovascular risk dropped 22% after following the HealthGenix AI recommendations for 5 months. Feels like having a personal health guardian."',name:'Rohan S.',role:'Student, Delhi',bg:'#5B6E6B'},
            ].map((t,i) => (
              <div key={i} className="testimonial">
                <div style={{color:'#EAB354',marginBottom:'12px'}}>★★★★★</div>
                <p style={{color:'#374151',fontSize:'14px',lineHeight:'1.7',marginBottom:'20px',fontStyle:'italic'}}>{t.text}</p>
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <div style={{width:'36px',height:'36px',borderRadius:'50%',background:t.bg,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'700',color:'white',fontSize:'14px'}}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{fontWeight:'600',color:'#1F2F2C',fontSize:'14px'}}>{t.name}</div>
                    <div style={{fontSize:'12px',color:'#9ca3af'}}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DOMAINS */}
      <div style={{background:'#FCF9F5',padding:'60px'}} id="domains">
        <div style={{maxWidth:'1280px',margin:'0 auto',textAlign:'center'}}>
          <div style={{fontSize:'13px',fontWeight:'600',color:'#C2593A',marginBottom:'12px'}}>comprehensive coverage</div>
          <h2 style={{fontSize:'40px',fontWeight:'800',color:'#1F2F2C',marginBottom:'16px'}}>10 health domains, one unified view</h2>
          <p style={{color:'#5B6E6B',fontSize:'16px',marginBottom:'48px'}}>HealthGenix monitors every critical aspect of your health in one place.</p>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'16px'}}>
            {['🫀 Cardiovascular','🩸 Metabolic','🧠 Neurological','🫁 Respiratory','🦴 Musculoskeletal','⚗️ Hormonal','🦠 Immune','🫘 Digestive','👁️ Organ Health','🎗️ Cancer Risk'].map((d,i) => (
              <span key={i} className="domain-pill">{d}</span>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{padding:'90px 60px'}} id="faq">
        <div style={{maxWidth:'880px',margin:'0 auto'}}>
          <div style={{fontSize:'13px',fontWeight:'600',color:'#C2593A',marginBottom:'12px'}}>common questions</div>
          <h2 style={{fontSize:'36px',fontWeight:'800',color:'#1F2F2C',marginBottom:'40px'}}>You asked, we answered</h2>
          {[
            {q:'Is HealthGenix really free?',a:'Yes, completely free forever. We believe preventive health intelligence should be accessible to everyone.'},
            {q:'Is it a replacement for a doctor?',a:'No. HealthGenix is a preventive intelligence tool. It helps you understand your health risks early. Always consult a qualified physician for medical advice.'},
            {q:'How accurate are the risk predictions?',a:'Our models use validated clinical formulas including the Framingham Risk Score and FINDRISC algorithm, achieving an average accuracy of 87%.'},
            {q:'Is my health data private and secure?',a:'Absolutely. All your health data is encrypted and stored securely. We never sell your data to any third parties.'},
            {q:'How often should I update my health data?',a:'We recommend updating basic parameters weekly and lab values whenever you get a new blood test. More data means more accurate predictions.'},
            {q:'Can I share reports with my doctor?',a:'Yes! HealthGenix generates physician-friendly clinical summaries that you can export and share directly with your doctor.'},
          ].map((faq,i) => (
            <div key={i} className="faq-item">
              <div className="faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                <span>{faq.q}</span>
                <span style={{color:'#C2593A',fontSize:'20px',fontWeight:'300'}}>{faqOpen === i ? '−' : '+'}</span>
              </div>
              {faqOpen === i && <div className="faq-a">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{margin:'40px 60px 80px'}}>
        <div style={{background:'#1F2F2C',borderRadius:'48px',padding:'64px 48px',textAlign:'center',color:'white',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',width:'400px',height:'400px',borderRadius:'50%',background:'radial-gradient(circle,rgba(194,89,58,0.2),transparent)',right:'-100px',top:'-100px'}}></div>
          <div style={{position:'relative',zIndex:1}}>
            <h2 style={{fontSize:'42px',fontWeight:'800',marginBottom:'16px'}}>Start predicting, not reacting</h2>
            <p style={{maxWidth:'520px',margin:'0 auto 32px',opacity:0.75,fontSize:'16px',lineHeight:'1.6'}}>Join thousands taking control of their long-term health. Free forever.</p>
            <button className="btn-primary" style={{fontSize:'16px',padding:'16px 40px'}} onClick={() => navigate('/register')}>
              Create free account →
            </button>
            <div style={{marginTop:'16px',opacity:0.35,fontSize:'13px'}}>No credit card required · Free forever · Takes 2 minutes</div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{background:'#F1EAE1',padding:'56px 60px 40px',borderTop:'1px solid #E2D6CA'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto',display:'flex',flexWrap:'wrap',justifyContent:'space-between',gap:'40px',marginBottom:'40px'}}>
          <div style={{maxWidth:'280px'}}>
            <div style={{fontWeight:'800',fontSize:'20px',color:'#1F2F2C',marginBottom:'12px'}}>Health<span style={{color:'#C2593A'}}>Genix</span></div>
            <div style={{color:'#6D5D4B',fontSize:'14px',lineHeight:'1.6'}}>Next generation preventive healthcare intelligence. Predict. Protect. Prevent.</div>
          </div>
          {[
            {title:'PRODUCT',links:[{label:'Features',href:'#features'},{label:'How It Works',href:'#howitworks'},{label:'Health Domains',href:'#domains'},{label:'Dashboard',href:'/dashboard'}]},
            {title:'LEGAL',links:[{label:'Privacy Policy',href:'#'},{label:'Terms of Service',href:'#'},{label:'Medical Disclaimer',href:'#'}]},
            {title:'SUPPORT',links:[{label:'FAQ',href:'#faq'},{label:'WhatsApp Support',href:'https://wa.me/919100690937'},{label:'healthgenix@gmail.com',href:'mailto:healthgenix@gmail.com'}]},
          ].map((col,i) => (
            <div key={i}>
              <div style={{fontSize:'13px',fontWeight:'700',color:'#4F6A5D',letterSpacing:'0.5px',marginBottom:'12px'}}>{col.title}</div>
              {col.links.map((link,j) => (
                <a key={j} href={link.href} className="footer-link">{link.label}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{borderTop:'1px solid #E2D6CA',paddingTop:'24px',textAlign:'center',fontSize:'12px',color:'#9F8D78'}}>
          © 2026 HealthGenix · Built with ❤️ at SIMATS · Not a replacement for professional medical advice.
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;