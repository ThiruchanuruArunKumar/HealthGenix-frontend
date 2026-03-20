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
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{background:'linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #0a1628 100%)'}}>

      <style>{`
        @keyframes float1 {
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(80px,-60px) scale(1.1)}
          66%{transform:translate(-40px,80px) scale(0.9)}
        }
        @keyframes float2 {
          0%,100%{transform:translate(0,0) scale(1)}
          50%{transform:translate(-60px,60px) scale(1.1)}
        }
        @keyframes slideUp {
          from{opacity:0;transform:translateY(30px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes shimmer {
          0%{background-position:-200% center}
          100%{background-position:200% center}
        }
        .slide-up{animation:slideUp 0.6s ease forwards}
        .slide-up-1{animation:slideUp 0.6s ease 0.1s forwards;opacity:0}
        .slide-up-2{animation:slideUp 0.6s ease 0.2s forwards;opacity:0}
        .slide-up-3{animation:slideUp 0.6s ease 0.3s forwards;opacity:0}
        .slide-up-4{animation:slideUp 0.6s ease 0.4s forwards;opacity:0}
        .shimmer-text{
          background:linear-gradient(90deg,#14b8a6,#818cf8,#ec4899,#14b8a6);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:shimmer 4s linear infinite;
        }
        .input-field{
          width:100%;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:12px;
          padding:14px 16px;
          color:white;
          font-size:14px;
          outline:none;
          transition:all 0.3s ease;
        }
        .input-field:focus{
          border-color:rgba(20,184,166,0.6);
          background:rgba(20,184,166,0.06);
          box-shadow:0 0 20px rgba(20,184,166,0.15);
        }
        .input-field::placeholder{color:rgba(255,255,255,0.25)}
        .btn-primary{
          width:100%;
          background:linear-gradient(135deg,#14b8a6,#3b82f6);
          color:white;
          font-weight:700;
          padding:14px;
          border-radius:12px;
          border:none;
          cursor:pointer;
          font-size:15px;
          transition:all 0.3s ease;
          box-shadow:0 0 30px rgba(20,184,166,0.3);
          position:relative;
          overflow:hidden;
        }
        .btn-primary:hover{
          transform:translateY(-2px);
          box-shadow:0 0 40px rgba(20,184,166,0.5);
        }
        .btn-primary:active{transform:scale(0.98)}
        .btn-primary:disabled{opacity:0.6;cursor:not-allowed;transform:none}
        .glass-card{
          background:rgba(255,255,255,0.04);
          backdrop-filter:blur(20px);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:24px;
          padding:40px;
          width:100%;
          max-width:420px;
          box-shadow:0 0 60px rgba(20,184,166,0.1);
        }
      `}</style>

      {/* Background orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-30"
          style={{background:'radial-gradient(circle,rgba(20,184,166,0.5),transparent)', animation:'float1 8s ease-in-out infinite'}}></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-20"
          style={{background:'radial-gradient(circle,rgba(139,92,246,0.5),transparent)', animation:'float2 10s ease-in-out infinite'}}></div>
        <div className="absolute inset-0"
          style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',backgroundSize:'50px 50px'}}></div>
      </div>

      {/* Card */}
      <div className="glass-card relative z-10">

        {/* Logo */}
        <div className="slide-up text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
              style={{background:'linear-gradient(135deg,#14b8a6,#8b5cf6)', boxShadow:'0 0 20px rgba(20,184,166,0.4)'}}>H</div>
            <span className="text-xl font-black text-white">Health<span style={{color:'#14b8a6'}}>Genix</span></span>
          </div>
          <h2 className="text-2xl font-black text-white mb-1">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Sign in to your health dashboard</p>
        </div>

        {/* Error */}
        {error && (
          <div className="slide-up mb-4 p-3 rounded-xl text-sm text-center"
            style={{background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', color:'#f87171'}}>
            {error}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div className="slide-up-1">
            <label className="text-gray-400 text-xs font-medium mb-2 block tracking-widest uppercase">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div className="slide-up-2">
            <label className="text-gray-400 text-xs font-medium mb-2 block tracking-widest uppercase">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div className="slide-up-3 mt-2">
            <button className="btn-primary" onClick={handleLogin} disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In →'}
            </button>
          </div>

        </div>

        {/* Register link */}
        <div className="slide-up-4 text-center mt-6">
          <p className="text-gray-500 text-sm">
            Don't have an account?{' '}
            <span className="font-bold cursor-pointer transition-colors hover:opacity-80"
              style={{color:'#14b8a6'}}
              onClick={() => navigate('/register')}>
              Create Account
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;