import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../api';

function HealthInput() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    height: '', weight: '',
    systolic_bp: '', diastolic_bp: '',
    heart_rate: '', cholesterol: '',
    fasting_glucose: '', hba1c: '',
    sleep_hours: '', exercise_days: '',
    stress_level: '', smoking: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const parameters = [];

      if (formData.height && formData.weight) {
        const bmi = (formData.weight / ((formData.height / 100) ** 2)).toFixed(1);
        parameters.push({ name: 'bmi', value: parseFloat(bmi), unit: 'kg/m2' });
      }
      if (formData.systolic_bp) parameters.push({ name: 'systolic_bp', value: parseFloat(formData.systolic_bp), unit: 'mmHg' });
      if (formData.cholesterol) parameters.push({ name: 'cholesterol', value: parseFloat(formData.cholesterol), unit: 'mg/dL' });
      if (formData.fasting_glucose) parameters.push({ name: 'fasting_glucose', value: parseFloat(formData.fasting_glucose), unit: 'mg/dL' });
      if (formData.sleep_hours) parameters.push({ name: 'sleep_hours', value: parseFloat(formData.sleep_hours), unit: 'hours' });
      if (formData.exercise_days) parameters.push({ name: 'exercise_days', value: parseFloat(formData.exercise_days), unit: 'days/week' });
      if (formData.stress_level) parameters.push({ name: 'stress_level', value: parseFloat(formData.stress_level), unit: 'scale' });

      await API.post('/health/save', { parameters }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);

    } catch (error) {
      console.error('Error saving health data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen"
      style={{background:'linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #0a1628 100%)'}}>

      <style>{`
        @keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-30px)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes successPop{0%{transform:scale(0.8);opacity:0}60%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
        .slide-up{animation:slideUp 0.6s ease forwards}
        .slide-up-1{animation:slideUp 0.6s ease 0.1s forwards;opacity:0}
        .slide-up-2{animation:slideUp 0.6s ease 0.2s forwards;opacity:0}
        .slide-up-3{animation:slideUp 0.6s ease 0.3s forwards;opacity:0}
        .slide-up-4{animation:slideUp 0.6s ease 0.4s forwards;opacity:0}
        .glass{background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08)}
        .input-field{
          width:100%;background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:12px;padding:12px 16px;
          color:white;font-size:14px;outline:none;
          transition:all 0.3s ease;
        }
        .input-field:focus{
          border-color:rgba(20,184,166,0.6);
          background:rgba(20,184,166,0.06);
          box-shadow:0 0 20px rgba(20,184,166,0.15);
        }
        .input-field::placeholder{color:rgba(255,255,255,0.2)}
        .section-card{
          background:rgba(255,255,255,0.04);
          backdrop-filter:blur(20px);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:20px;
          padding:24px;
          margin-bottom:20px;
        }
        .section-title{
          font-size:14px;font-weight:700;
          margin-bottom:16px;
          display:flex;align-items:center;gap:8px;
        }
        .btn-submit{
          width:100%;
          background:linear-gradient(135deg,#14b8a6,#3b82f6);
          color:white;font-weight:700;
          padding:16px;border-radius:14px;
          border:none;cursor:pointer;font-size:16px;
          transition:all 0.3s ease;
          box-shadow:0 0 30px rgba(20,184,166,0.3);
        }
        .btn-submit:hover{transform:translateY(-2px);box-shadow:0 0 50px rgba(20,184,166,0.5)}
        .btn-submit:active{transform:scale(0.98)}
        .btn-submit:disabled{opacity:0.6;cursor:not-allowed;transform:none}
        .success-overlay{
          position:fixed;inset:0;
          background:rgba(10,15,30,0.9);
          display:flex;align-items:center;justify-content:center;
          z-index:100;
          animation:fadeIn 0.3s ease;
        }
        .success-card{animation:successPop 0.5s ease forwards}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      `}</style>

      {/* Success overlay */}
      {success && (
        <div className="success-overlay">
          <div className="success-card text-center">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-3xl font-black text-white mb-2">Analysis Complete!</h2>
            <p className="text-gray-400">Redirecting to your dashboard...</p>
          </div>
        </div>
      )}

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
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
          ← Back to Dashboard
        </button>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="slide-up mb-8">
          <h1 className="text-3xl font-black text-white mb-2">Health Parameters</h1>
          <p className="text-gray-500 text-sm">Enter your latest health data for accurate AI predictions</p>
        </div>

        {/* Basic Info */}
        <div className="slide-up-1 section-card">
          <div className="section-title" style={{color:'#14b8a6'}}>
            <span>📋</span> Basic Information
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500 text-xs font-medium mb-2 block tracking-widest uppercase">Height (cm)</label>
              <input type="number" name="height" className="input-field"
                placeholder="e.g. 170" value={formData.height} onChange={handleChange}/>
            </div>
            <div>
              <label className="text-gray-500 text-xs font-medium mb-2 block tracking-widest uppercase">Weight (kg)</label>
              <input type="number" name="weight" className="input-field"
                placeholder="e.g. 70" value={formData.weight} onChange={handleChange}/>
            </div>
          </div>
          {formData.height && formData.weight && (
            <div className="mt-3 p-3 rounded-xl text-sm font-medium"
              style={{background:'rgba(20,184,166,0.08)',border:'1px solid rgba(20,184,166,0.2)',color:'#14b8a6'}}>
              BMI: {(formData.weight / ((formData.height / 100) ** 2)).toFixed(1)} kg/m²
            </div>
          )}
        </div>

        {/* Cardiovascular */}
        <div className="slide-up-2 section-card">
          <div className="section-title" style={{color:'#ef4444'}}>
            <span>🫀</span> Cardiovascular
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500 text-xs font-medium mb-2 block tracking-widest uppercase">Systolic BP (mmHg)</label>
              <input type="number" name="systolic_bp" className="input-field"
                placeholder="e.g. 120" value={formData.systolic_bp} onChange={handleChange}/>
            </div>
            <div>
              <label className="text-gray-500 text-xs font-medium mb-2 block tracking-widest uppercase">Cholesterol (mg/dL)</label>
              <input type="number" name="cholesterol" className="input-field"
                placeholder="e.g. 180" value={formData.cholesterol} onChange={handleChange}/>
            </div>
          </div>
        </div>

        {/* Metabolic */}
        <div className="slide-up-2 section-card">
          <div className="section-title" style={{color:'#f59e0b'}}>
            <span>🩸</span> Metabolic
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500 text-xs font-medium mb-2 block tracking-widest uppercase">Fasting Glucose (mg/dL)</label>
              <input type="number" name="fasting_glucose" className="input-field"
                placeholder="e.g. 95" value={formData.fasting_glucose} onChange={handleChange}/>
            </div>
            <div>
              <label className="text-gray-500 text-xs font-medium mb-2 block tracking-widest uppercase">HbA1c (%)</label>
              <input type="number" name="hba1c" className="input-field"
                placeholder="e.g. 5.4" value={formData.hba1c} onChange={handleChange}/>
            </div>
          </div>
        </div>

        {/* Lifestyle */}
        <div className="slide-up-3 section-card">
          <div className="section-title" style={{color:'#22c55e'}}>
            <span>🏃</span> Lifestyle
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500 text-xs font-medium mb-2 block tracking-widest uppercase">Sleep Hours/night</label>
              <input type="number" name="sleep_hours" className="input-field"
                placeholder="e.g. 7" value={formData.sleep_hours} onChange={handleChange}/>
            </div>
            <div>
              <label className="text-gray-500 text-xs font-medium mb-2 block tracking-widest uppercase">Exercise (days/week)</label>
              <input type="number" name="exercise_days" className="input-field"
                placeholder="e.g. 3" value={formData.exercise_days} onChange={handleChange}/>
            </div>
            <div>
              <label className="text-gray-500 text-xs font-medium mb-2 block tracking-widest uppercase">Stress Level (1-10)</label>
              <input type="number" name="stress_level" className="input-field"
                placeholder="e.g. 5" value={formData.stress_level} onChange={handleChange}/>
            </div>
            <div>
              <label className="text-gray-500 text-xs font-medium mb-2 block tracking-widest uppercase">Smoking</label>
              <select name="smoking" className="input-field"
                value={formData.smoking} onChange={handleChange}
                style={{background:'rgba(255,255,255,0.04)'}}>
                <option value="" style={{background:'#0d1b2a'}}>Select</option>
                <option value="never" style={{background:'#0d1b2a'}}>Never</option>
                <option value="former" style={{background:'#0d1b2a'}}>Former</option>
                <option value="current" style={{background:'#0d1b2a'}}>Current</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="slide-up-4">
          <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Analysing your health...
              </span>
            ) : 'Analyse My Health →'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default HealthInput;