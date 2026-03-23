import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../api';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
        .btn-login {
          width:100%; background:#C2593A; color:white;
          font-weight:600; padding:14px; border-radius:60px;
          border:none; cursor:pointer; font-size:15px;
          transition:all 0.25s; box-shadow:0 4px 12px rgba(194,89,58,0.25);
          font-family:'Inter',sans-serif;
        }
        .btn-login:hover { background:#A74528; transform:translateY(-1px); }
        .btn-login:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
        label { font-size:13px; font-weight:600; color:#4A5B5E; margin-bottom:6px; display:block; }
      `}</style>

      <div style={{background:'white',borderRadius:'32px',padding:'48px',width:'100%',maxWidth:'440px',boxShadow:'0 20px 35px -12px rgba(0,0,0,0.08)',border:'1px solid #EFE6DC'}}>

        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',marginBottom:'20px',cursor:'pointer'}} onClick={() => navigate('/')}>
            <div style={{width:'40px',height:'40px',background:'#2A5C4A',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'800',fontSize:'18px'}}>H</div>
            <span style={{fontSize:'20px',fontWeight:'800',color:'#1F2F2C'}}>Health<span style={{color:'#C2593A'}}>Genix</span></span>
          </div>
          <h2 style={{fontSize:'24px',fontWeight:'800',color:'#1F2F2C',marginBottom:'6px',letterSpacing:'-0.5px'}}>Welcome back</h2>
          <p style={{color:'#8F9B96',fontSize:'14px'}}>Sign in to your health dashboard</p>
        </div>

        {error && (
          <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'12px',padding:'12px 16px',marginBottom:'20px',fontSize:'13px',color:'#DC2626',textAlign:'center'}}>
            {error}
          </div>
        )}

        <div style={{display:'flex',flexDirection:'column',gap:'18px'}}>
          <div>
            <label>Email address</label>
            <input type="email" className="input-field"
              placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}/>
          </div>

          <button className="btn-login" onClick={handleLogin} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in →'}
          </button>
        </div>

        <p style={{textAlign:'center',marginTop:'24px',fontSize:'14px',color:'#8F9B96'}}>
          Don't have an account?{' '}
          <span style={{color:'#C2593A',fontWeight:'600',cursor:'pointer'}} onClick={() => navigate('/register')}>
            Create one free →
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;