import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../api';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', age: '', gender: '', password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    <div className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{background:'linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #0a1628 100%)'}}>

      <style>{`
        @keyframes float1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(80px,-60px) scale(1.1)}66%{transform:translate(-40px,80px) scale(0.9)}}
        @keyframes float2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-60px,60px) scale(1.1)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        .slide-up{animation:slideUp 0.6s ease forwards}
        .slide-up-1{animation:slideUp 0.6s ease 0.1s forwards;opacity:0}
        .slide-up-2{animation:slideUp 0.6s ease 0.2s forwards;opacity:0}
        .slide-up-3{animation:slideUp 0.6s ease 0.3s forwards;opacity:0}
        .slide-up-4{animation:slideUp 0.6s ease 0.4s forwards;opacity:0}
        .slide-up-5{animation:slideUp 0.6s ease 0.5s forwards;opacity:0}
        .slide-up-6{animation:slideUp 0.6s ease 0.6s forwards;opacity:0}
        .input-field{
          width:100%;background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:12px;padding:14px 16px;
          color:white;font-size:14px;outline:none;
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
          color:white;font-weight:700;padding:14px;
          border-radius:12px;border:none;cursor:pointer;
          font-size:15px;transition:all 0.3s ease;
          box-shadow:0 0 30px rgba(20,184,166,0.3);
        }
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 0 40px rgba(20,184,166,0.5)}
        .btn-primary:active{transform:scale(0.98)}
        .btn-primary:disabled{opacity:0.6;cursor:not-allowed;transform:none}
        .glass-card{
          background:rgba(255,255,255,0.04);
          backdrop-filter:blur(20px);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:24px;padding:40px;
          width:100%;max-width:460px;
          box-shadow:0 0 60px rgba(20,184,166,0.1);
        }
      `}</style>

      {/* Background orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-30"
          style={{background:'radial-gradient(circle,rgba(20,184,166,0.5),transparent)',animation:'float1 8s ease-in-out infinite'}}></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-20"
          style={{background:'radial-gradient(circle,rgba(139,92,246,0.5),transparent)',animation:'float2 10s ease-in-out infinite'}}></div>
        <div className="absolute inset-0"
          style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',backgroundSize:'50px 50px'}}></div>
      </div>

      {/* Card */}
      <div className="glass-card relative z-10">

        {/* Logo */}
        <div className="slide-up text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
              style={{background:'linear-gradient(135deg,#14b8a6,#8b5cf6)',boxShadow:'0 0 20px rgba(20,184,166,0.4)'}}>H</div>
            <span className="text-xl font-black text-white">Health<span style={{color:'#14b8a6'}}>Genix</span></span>
          </div>
          <h2 className="text-2xl font-black text-white mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm">Start your health intelligence journey</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-xl text-sm text-center"
            style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.2)',color:'#f87171'}}>
            {error}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-4">

          <div className="slide-up-1">
            <label className="text-gray-400 text-xs font-medium mb-2 block tracking-widest uppercase">Full Name</label>
            <input type="text" name="name" className="input-field"
              placeholder="Enter your full name"
              value={formData.name} onChange={handleChange}/>
          </div>

          <div className="slide-up-2">
            <label className="text-gray-400 text-xs font-medium mb-2 block tracking-widest uppercase">Email</label>
            <input type="email" name="email" className="input-field"
              placeholder="Enter your email"
              value={formData.email} onChange={handleChange}/>
          </div>

          <div className="slide-up-3 grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-400 text-xs font-medium mb-2 block tracking-widest uppercase">Age</label>
              <input type="number" name="age" className="input-field"
                placeholder="Your age"
                value={formData.age} onChange={handleChange}/>
            </div>
            <div>
              <label className="text-gray-400 text-xs font-medium mb-2 block tracking-widest uppercase">Gender</label>
              <select name="gender" className="input-field"
                value={formData.gender} onChange={handleChange}
                style={{background:'rgba(255,255,255,0.04)'}}>
                <option value="" style={{background:'#0d1b2a'}}>Select</option>
                <option value="male" style={{background:'#0d1b2a'}}>Male</option>
                <option value="female" style={{background:'#0d1b2a'}}>Female</option>
                <option value="other" style={{background:'#0d1b2a'}}>Other</option>
              </select>
            </div>
          </div>

          <div className="slide-up-4">
            <label className="text-gray-400 text-xs font-medium mb-2 block tracking-widest uppercase">Password</label>
            <input type="password" name="password" className="input-field"
              placeholder="Create a password"
              value={formData.password} onChange={handleChange}
              onKeyDown={(e) => e.key === 'Enter' && handleRegister()}/>
          </div>

          <div className="slide-up-5 mt-2">
            <button className="btn-primary" onClick={handleRegister} disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Creating account...
                </span>
              ) : 'Create Account →'}
            </button>
          </div>

        </div>

        {/* Login link */}
        <div className="slide-up-6 text-center mt-6">
          <p className="text-gray-500 text-sm">
            Already have an account?{' '}
            <span className="font-bold cursor-pointer transition-colors"
              style={{color:'#14b8a6'}}
              onClick={() => navigate('/login')}>
              Sign In
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;