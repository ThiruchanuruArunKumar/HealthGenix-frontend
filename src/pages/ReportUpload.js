import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../api';

function ReportUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [extractedParams, setExtractedParams] = useState([]);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('idle');
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setStatus('idle');
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      setStatus('processing');
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('report', file);
      const res = await API.post('/report/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setExtractedParams(res.data.parameters);
      setStatus('done');
    } catch (error) {
      setError('Failed to process report. Please try again.');
      setStatus('idle');
    }
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      await API.post('/health/save', { parameters: extractedParams }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to save data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen"
      style={{background:'linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #0a1628 100%)'}}>

      <style>{`
        @keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-30px)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes progressBar{from{width:0%}to{width:85%}}
        .slide-up{animation:slideUp 0.6s ease forwards}
        .slide-up-1{animation:slideUp 0.6s ease 0.1s forwards;opacity:0}
        .slide-up-2{animation:slideUp 0.6s ease 0.2s forwards;opacity:0}
        .glass{background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08)}
        .drop-zone{
          border:2px dashed rgba(20,184,166,0.3);
          border-radius:20px;padding:48px;
          text-align:center;
          transition:all 0.3s ease;
          cursor:pointer;
        }
        .drop-zone:hover,.drop-zone.drag-over{
          border-color:rgba(20,184,166,0.6);
          background:rgba(20,184,166,0.05);
          box-shadow:0 0 30px rgba(20,184,166,0.1);
        }
        .btn-upload{
          width:100%;
          background:linear-gradient(135deg,#14b8a6,#3b82f6);
          color:white;font-weight:700;
          padding:16px;border-radius:14px;
          border:none;cursor:pointer;font-size:16px;
          transition:all 0.3s ease;
          box-shadow:0 0 30px rgba(20,184,166,0.3);
        }
        .btn-upload:hover{transform:translateY(-2px);box-shadow:0 0 50px rgba(20,184,166,0.5)}
        .btn-upload:disabled{opacity:0.4;cursor:not-allowed;transform:none}
        .btn-confirm{
          width:100%;
          background:linear-gradient(135deg,#14b8a6,#3b82f6);
          color:white;font-weight:700;
          padding:16px;border-radius:14px;
          border:none;cursor:pointer;font-size:16px;
          transition:all 0.3s ease;
          box-shadow:0 0 30px rgba(20,184,166,0.3);
        }
        .btn-confirm:hover{transform:translateY(-2px);box-shadow:0 0 50px rgba(20,184,166,0.5)}
        .progress-bar{
          height:6px;border-radius:3px;
          background:rgba(255,255,255,0.06);
          overflow:hidden;margin-bottom:16px;
        }
        .progress-fill{
          height:100%;border-radius:3px;
          background:linear-gradient(90deg,#14b8a6,#3b82f6);
          animation:progressBar 2.5s ease forwards;
          box-shadow:0 0 10px rgba(20,184,166,0.5);
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
      <nav className="relative z-50 flex items-center justify-between px-6 py-4"
        style={{background:'rgba(10,15,30,0.8)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-sm"
            style={{background:'linear-gradient(135deg,#14b8a6,#8b5cf6)'}}>H</div>
          <span className="text-lg font-black text-white">Health<span style={{color:'#14b8a6'}}>Genix</span></span>
        </div>
        <button onClick={() => navigate('/dashboard')}
          className="text-gray-400 hover:text-white text-sm transition-colors">
          ← Back to Dashboard
        </button>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="slide-up mb-8">
          <h1 className="text-3xl font-black text-white mb-2">Upload Medical Report</h1>
          <p className="text-gray-500 text-sm">Upload your past blood reports or lab results. AI will automatically extract your health parameters.</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-4 rounded-xl text-sm"
            style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.2)',color:'#f87171'}}>
            {error}
          </div>
        )}

        {/* Upload Zone */}
        {status === 'idle' && (
          <div className="slide-up-1">
            <div
              className={`drop-zone mb-6 ${dragOver ? 'drag-over' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input').click()}>
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-white font-bold text-xl mb-2">Drop your report here</h3>
              <p className="text-gray-500 text-sm mb-4">or click to browse files</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
                style={{background:'rgba(20,184,166,0.1)',border:'1px solid rgba(20,184,166,0.3)',color:'#14b8a6'}}>
                Supports PDF files
              </div>
              <input type="file" accept=".pdf" onChange={handleFileChange}
                className="hidden" id="file-input"/>
            </div>

            {file && (
              <div className="flex items-center gap-3 p-4 rounded-xl mb-4"
                style={{background:'rgba(20,184,166,0.08)',border:'1px solid rgba(20,184,166,0.2)'}}>
                <span className="text-2xl">📄</span>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">{file.name}</div>
                  <div className="text-gray-500 text-xs">{(file.size / 1024).toFixed(1)} KB</div>
                </div>
                <span style={{color:'#14b8a6'}}>✓</span>
              </div>
            )}

            <button className="btn-upload" onClick={handleUpload} disabled={!file}>
              Upload & Analyse Report →
            </button>
          </div>
        )}

        {/* Processing */}
        {status === 'processing' && (
          <div className="slide-up glass rounded-2xl p-8 text-center mb-6">
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{background:'rgba(20,184,166,0.1)',border:'1px solid rgba(20,184,166,0.3)'}}>
              <svg style={{animation:'spin 1s linear infinite'}} className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#14b8a6" strokeWidth="4"/>
                <path className="opacity-75" fill="#14b8a6" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            </div>
            <h3 className="text-white font-black text-xl mb-2">Reading your report...</h3>
            <p className="text-gray-500 text-sm mb-6">Our AI is extracting your health parameters</p>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <div className="flex flex-col gap-2 text-left max-w-xs mx-auto">
              <div className="flex items-center gap-2 text-sm" style={{color:'#22c55e'}}>
                <span>✓</span> Document detected
              </div>
              <div className="flex items-center gap-2 text-sm" style={{color:'#22c55e'}}>
                <span>✓</span> Text extracted
              </div>
              <div className="flex items-center gap-2 text-sm" style={{color:'#14b8a6'}}>
                <span className="animate-pulse">⟳</span> Identifying parameters...
              </div>
            </div>
          </div>
        )}

        {/* Done */}
        {status === 'done' && (
          <div className="slide-up">
            <div className="glass rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl" style={{color:'#8b5cf6'}}>✦</span>
                <h3 className="text-white font-black text-xl">
                  {extractedParams.length > 0
                    ? `We found ${extractedParams.length} values!`
                    : 'No parameters found'}
                </h3>
              </div>

              {extractedParams.length > 0 ? (
                <>
                  <div className="flex flex-col gap-3 mb-6">
                    {extractedParams.map((param, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl"
                        style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                        <span className="text-gray-300 text-sm capitalize">
                          {param.name.replace(/_/g, ' ')}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-white font-mono text-sm font-bold">
                            {param.value} {param.unit}
                          </span>
                          <span style={{color:'#22c55e'}}>✓</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn-confirm" onClick={handleConfirm}>
                    Confirm & Analyse →
                  </button>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="text-5xl mb-4">🔍</div>
                  <p className="text-gray-400 mb-2">No health parameters found in this report.</p>
                  <p className="text-gray-600 text-xs mb-6">Try uploading a blood test or lab report with numeric values.</p>
                  <button onClick={() => setStatus('idle')}
                    className="px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300"
                    style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'white'}}>
                    Try Another File
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Supported Reports */}
        <div className="slide-up-2 glass rounded-2xl p-5">
          <h4 className="text-gray-400 text-xs font-bold mb-4 tracking-widest uppercase">Supported Report Types</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              {icon:'🩸',name:'Blood Test (CBC)'},
              {icon:'🫀',name:'Lipid Profile'},
              {icon:'🍬',name:'Blood Sugar / HbA1c'},
              {icon:'🫘',name:'Liver Function'},
              {icon:'🫁',name:'Kidney Function'},
              {icon:'🦋',name:'Thyroid Profile'},
            ].map((item,i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400 text-xs">
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ReportUpload;