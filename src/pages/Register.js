import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../api';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name:'', email:'', age:'', gender:'', password:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await API.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#FEFAF5',fontFamily:"'Inter',system-ui,sans-serif",padding:'20px'}}>
      <style>{`
        * { box-sizing:border-box; }
        .input-field {
          width:100%; background:white;
          border:1.5px solid #E8DDD0; border-radius:12px;
          padding:13px 16px; color:#1E2A2E; font-size:14px;
          outline:none; transition:all 0.2s; font-family:'Inter',sans-serif;
        }
        .input-field:focus { border-color:#2A5C4A; box-shadow:0 0 0 3px rgba(42,92,74,0.08); }
        .input-field::placeholder { color:#B2A692; }
        .btn-register {
          width:100%; background:#C2593A; color:white;
          font-weight:600; padding:14px; border-radius:60px;
          border:none; cursor:pointer; font-size:15px;
          transition:all 0.25s; box-shadow:0 4px 12px rgba(194,89,58,0.25);
          font-family:'Inter',sans-serif;
        }
        .btn-register:hover { background:#A74528; transform:translateY(-1px); }
        .btn-register:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
        label { font-size:13px; font-weight:600; color:#4A5B5E; margin-bottom:6px; display:block; }
      `}</style>

      <div style={{background:'white',borderRadius:'32px',padding:'48px',width:'100%',maxWidth:'460px',boxShadow:'0 20px 35px -12px rgba(0,0,0,0.08)',border:'1px solid #EFE6DC'}}>

        {/* Logo */}
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',marginBottom:'20px',cursor:'pointer'}} onClick={() => navigate('/')}>
            <div style={{width:'40px',height:'40px',background:'#2A5C4A',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'800',fontSize:'18px'}}>H</div>
            <span style={{fontSize:'20px',fontWeight:'800',color:'#1F2F2C'}}>Health<span style={{color:'#C2593A'}}>Genix</span></span>
          </div>
          <h2 style={{fontSize:'24px',fontWeight:'800',color:'#1F2F2C',marginBottom:'6px',letterSpacing:'-0.5px'}}>Create your account</h2>
          <p style={{color:'#8F9B96',fontSize:'14px'}}>Start your preventive health journey today</p>
        </div>

        {error && (
          <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'12px',padding:'12px 16px',marginBottom:'20px',fontSize:'13px',color:'#DC2626',textAlign:'center'}}>
            {error}
          </div>
        )}

        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div>
            <label>Full Name</label>
            <input type="text" name="name" className="input-field"
              placeholder="Enter your full name"
              value={formData.name} onChange={handleChange}/>
          </div>
          <div>
            <label>Email address</label>
            <input type="email" name="email" className="input-field"
              placeholder="you@example.com"
              value={formData.email} onChange={handleChange}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
            <div>
              <label>Age</label>
              <input type="number" name="age" className="input-field"
                placeholder="e.g. 25"
                value={formData.age} onChange={handleChange}/>
            </div>
            <div>
              <label>Gender</label>
              <select name="gender" className="input-field"
                value={formData.gender} onChange={handleChange}
                style={{background:'white'}}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" className="input-field"
              placeholder="Create a strong password"
              value={formData.password} onChange={handleChange}
              onKeyDown={e => e.key === 'Enter' && handleRegister()}/>
          </div>

          <button className="btn-register" onClick={handleRegister} disabled={loading}>
            {loading ? 'Creating account...' : 'Create free account →'}
          </button>
        </div>

        <p style={{textAlign:'center',marginTop:'24px',fontSize:'14px',color:'#8F9B96'}}>
          Already have an account?{' '}
          <span style={{color:'#C2593A',fontWeight:'600',cursor:'pointer'}} onClick={() => navigate('/login')}>
            Sign in →
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;