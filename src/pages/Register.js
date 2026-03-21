import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../api';
import { auth, googleProvider, signInWithPopup } from '../firebase';

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

  const handleGoogleRegister = async () => {
    try {
      setError('');
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const res = await API.post('/auth/google', {
        name: user.displayName,
        email: user.email,
        googleId: user.uid
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (error) {
      setError('Google sign up failed. Please try again.');
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
        .btn-google {
          width:100%; background:white; color:#1E2A2E;
          font-weight:500; padding:13px; border-radius:60px;
          border:1.5px solid #E8DDD0; cursor:pointer; font-size:14px;
          transition:all 0.2s; display:flex; align-items:center;
          justify-content:center; gap:10px; font-family:'Inter',sans-serif;
        }
        .btn-google:hover { border-color:#2A5C4A; background:#FEFAF5; }
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

        {/* Google Button First */}
        <button className="btn-google" onClick={handleGoogleRegister} style={{marginBottom:'20px'}}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
          <div style={{flex:1,height:'1px',background:'#EFE6DC'}}></div>
          <span style={{fontSize:'12px',color:'#B2A692',fontWeight:'500'}}>or register with email</span>
          <div style={{flex:1,height:'1px',background:'#EFE6DC'}}></div>
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