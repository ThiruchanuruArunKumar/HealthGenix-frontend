import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../api';

function HealthInput() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    height:'', weight:'', systolic_bp:'', diastolic_bp:'',
    heart_rate:'', cholesterol:'', fasting_glucose:'', hba1c:'',
    sleep_hours:'', exercise_days:'', stress_level:'', smoking:''
  });

  const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const parameters = [];
      if (formData.height && formData.weight) {
        const bmi = (formData.weight / ((formData.height/100)**2)).toFixed(1);
        parameters.push({name:'bmi', value:parseFloat(bmi), unit:'kg/m2'});
      }
      if (formData.systolic_bp) parameters.push({name:'systolic_bp', value:parseFloat(formData.systolic_bp), unit:'mmHg'});
      if (formData.cholesterol) parameters.push({name:'cholesterol', value:parseFloat(formData.cholesterol), unit:'mg/dL'});
      if (formData.fasting_glucose) parameters.push({name:'fasting_glucose', value:parseFloat(formData.fasting_glucose), unit:'mg/dL'});
      if (formData.sleep_hours) parameters.push({name:'sleep_hours', value:parseFloat(formData.sleep_hours), unit:'hours'});
      if (formData.exercise_days) parameters.push({name:'exercise_days', value:parseFloat(formData.exercise_days), unit:'days/week'});
      if (formData.stress_level) parameters.push({name:'stress_level', value:parseFloat(formData.stress_level), unit:'scale'});
      await API.post('/health/save', {parameters}, {headers:{Authorization:`Bearer ${token}`}});
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight:'100vh',background:'#FEFAF5',fontFamily:"'Inter',system-ui,sans-serif",color:'#1E2A2E'}}>
      <style>{`
        * { box-sizing:border-box; }
        .input-field {
          width:100%; background:white;
          border:1.5px solid #E8DDD0; border-radius:12px;
          padding:12px 16px; color:#1E2A2E; font-size:14px;
          outline:none; transition:all 0.2s; font-family:'Inter',sans-serif;
        }
        .input-field:focus { border-color:#2A5C4A; box-shadow:0 0 0 3px rgba(42,92,74,0.08); }
        .input-field::placeholder { color:#B2A692; }
        label { font-size:12px; font-weight:600; color:#4A5B5E; margin-bottom:6px; display:block; letter-spacing:0.3px; }
        .section-box { background:white; border-radius:24px; padding:28px; border:1px solid #EFE6DC; margin-bottom:20px; }
        .section-header { display:flex; align-items:center; gap:8px; margin-bottom:20px; }
        .section-label { font-size:13px; font-weight:700; color:#C2593A; }
        @keyframes successPop { 0%{transform:scale(0.8);opacity:0} 60%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
      `}</style>

      {/* Success overlay */}
      {success && (
        <div style={{position:'fixed',inset:0,background:'rgba(254,250,245,0.95)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:100}}>
          <div style={{textAlign:'center',animation:'successPop 0.5s ease forwards'}}>
            <div style={{fontSize:'72px',marginBottom:'16px'}}>🎉</div>
            <h2 style={{fontSize:'28px',fontWeight:'800',color:'#1F2F2C',marginBottom:'8px'}}>Analysis Complete!</h2>
            <p style={{color:'#8F9B96'}}>Redirecting to your dashboard...</p>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{background:'rgba(254,250,245,0.92)',backdropFilter:'blur(16px)',borderBottom:'1px solid #ECE3D8',padding:'0 40px',height:'68px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer'}} onClick={() => navigate('/')}>
          <div style={{width:'38px',height:'38px',background:'#2A5C4A',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'800',fontSize:'16px'}}>H</div>
          <span style={{fontSize:'18px',fontWeight:'800',color:'#1F2F2C'}}>Health<span style={{color:'#C2593A'}}>Genix</span></span>
        </div>
        <button onClick={() => navigate('/dashboard')}
          style={{background:'none',border:'none',color:'#8F9B96',cursor:'pointer',fontSize:'14px',fontWeight:'500',display:'flex',alignItems:'center',gap:'6px'}}>
          ← Back to Dashboard
        </button>
      </nav>

      <div style={{maxWidth:'680px',margin:'0 auto',padding:'40px'}}>
        <div style={{marginBottom:'32px'}}>
          <div style={{fontSize:'13px',fontWeight:'600',color:'#C2593A',marginBottom:'8px'}}>— health parameters</div>
          <h1 style={{fontSize:'32px',fontWeight:'800',color:'#1F2F2C',letterSpacing:'-1px',marginBottom:'8px'}}>Add your health data</h1>
          <p style={{color:'#8F9B96',fontSize:'14px'}}>Enter your latest measurements for accurate AI risk predictions</p>
        </div>

        {/* Basic Info */}
        <div className="section-box">
          <div className="section-header">
            <span>📋</span>
            <span className="section-label">BASIC INFORMATION</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            <div>
              <label>Height (cm)</label>
              <input type="number" name="height" className="input-field" placeholder="e.g. 170" value={formData.height} onChange={handleChange}/>
            </div>
            <div>
              <label>Weight (kg)</label>
              <input type="number" name="weight" className="input-field" placeholder="e.g. 70" value={formData.weight} onChange={handleChange}/>
            </div>
          </div>
          {formData.height && formData.weight && (
            <div style={{marginTop:'14px',padding:'12px 16px',borderRadius:'12px',background:'#F0F4EC',border:'1px solid #D4E4D0',fontSize:'13px',fontWeight:'600',color:'#2A5C4A'}}>
              ✓ BMI: {(formData.weight/((formData.height/100)**2)).toFixed(1)} kg/m²
            </div>
          )}
        </div>

        {/* Cardiovascular */}
        <div className="section-box">
          <div className="section-header">
            <span>🫀</span>
            <span className="section-label">CARDIOVASCULAR</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            <div>
              <label>Systolic BP (mmHg)</label>
              <input type="number" name="systolic_bp" className="input-field" placeholder="e.g. 120" value={formData.systolic_bp} onChange={handleChange}/>
            </div>
            <div>
              <label>Cholesterol (mg/dL)</label>
              <input type="number" name="cholesterol" className="input-field" placeholder="e.g. 180" value={formData.cholesterol} onChange={handleChange}/>
            </div>
          </div>
        </div>

        {/* Metabolic */}
        <div className="section-box">
          <div className="section-header">
            <span>🩸</span>
            <span className="section-label">METABOLIC</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            <div>
              <label>Fasting Glucose (mg/dL)</label>
              <input type="number" name="fasting_glucose" className="input-field" placeholder="e.g. 95" value={formData.fasting_glucose} onChange={handleChange}/>
            </div>
            <div>
              <label>HbA1c (%)</label>
              <input type="number" name="hba1c" className="input-field" placeholder="e.g. 5.4" value={formData.hba1c} onChange={handleChange}/>
            </div>
          </div>
        </div>

        {/* Lifestyle */}
        <div className="section-box">
          <div className="section-header">
            <span>🏃</span>
            <span className="section-label">LIFESTYLE</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            <div>
              <label>Sleep Hours/night</label>
              <input type="number" name="sleep_hours" className="input-field" placeholder="e.g. 7" value={formData.sleep_hours} onChange={handleChange}/>
            </div>
            <div>
              <label>Exercise (days/week)</label>
              <input type="number" name="exercise_days" className="input-field" placeholder="e.g. 3" value={formData.exercise_days} onChange={handleChange}/>
            </div>
            <div>
              <label>Stress Level (1-10)</label>
              <input type="number" name="stress_level" className="input-field" placeholder="e.g. 5" value={formData.stress_level} onChange={handleChange}/>
            </div>
            <div>
              <label>Smoking</label>
              <select name="smoking" className="input-field" value={formData.smoking} onChange={handleChange} style={{background:'white'}}>
                <option value="">Select</option>
                <option value="never">Never</option>
                <option value="former">Former</option>
                <option value="current">Current</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={loading}
          style={{width:'100%',background:'#C2593A',color:'white',fontWeight:'600',padding:'16px',borderRadius:'60px',border:'none',cursor:'pointer',fontSize:'16px',transition:'all 0.25s',boxShadow:'0 4px 12px rgba(194,89,58,0.25)',opacity:loading?0.7:1,fontFamily:"'Inter',sans-serif"}}>
          {loading ? 'Analysing your health...' : 'Analyse my health →'}
        </button>
      </div>
    </div>
  );
}

export default HealthInput;