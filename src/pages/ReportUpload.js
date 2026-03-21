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

  const handleFileChange = e => { setFile(e.target.files[0]); setStatus('idle'); setError(''); };

  const handleDrop = e => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) { setFile(f); setStatus('idle'); setError(''); }
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      setStatus('processing');
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('report', file);
      const res = await API.post('/report/upload', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      setExtractedParams(res.data.parameters);
      setStatus('done');
    } catch {
      setError('Failed to process report. Please try again.');
      setStatus('idle');
    }
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      await API.post('/health/save', {parameters: extractedParams}, {headers:{Authorization:`Bearer ${token}`}});
      navigate('/dashboard');
    } catch {
      setError('Failed to save. Please try again.');
    }
  };

  return (
    <div style={{minHeight:'100vh',background:'#FEFAF5',fontFamily:"'Inter',system-ui,sans-serif",color:'#1E2A2E'}}>
      <style>{`
        * { box-sizing:border-box; }
        .drop-zone {
          border:2px dashed #D9CFC2; border-radius:24px;
          padding:48px; text-align:center; cursor:pointer;
          transition:all 0.2s;
        }
        .drop-zone:hover, .drop-zone.over {
          border-color:#2A5C4A; background:#F0F4EC;
        }
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>

      {/* NAV */}
      <nav style={{background:'rgba(254,250,245,0.92)',backdropFilter:'blur(16px)',borderBottom:'1px solid #ECE3D8',padding:'0 40px',height:'68px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer'}} onClick={() => navigate('/')}>
          <div style={{width:'38px',height:'38px',background:'#2A5C4A',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'800',fontSize:'16px'}}>H</div>
          <span style={{fontSize:'18px',fontWeight:'800',color:'#1F2F2C'}}>Health<span style={{color:'#C2593A'}}>Genix</span></span>
        </div>
        <button onClick={() => navigate('/dashboard')}
          style={{background:'none',border:'none',color:'#8F9B96',cursor:'pointer',fontSize:'14px',fontWeight:'500'}}>
          ← Back to Dashboard
        </button>
      </nav>

      <div style={{maxWidth:'680px',margin:'0 auto',padding:'40px'}}>
        <div style={{marginBottom:'32px'}}>
          <div style={{fontSize:'13px',fontWeight:'600',color:'#C2593A',marginBottom:'8px'}}>— report scanner</div>
          <h1 style={{fontSize:'32px',fontWeight:'800',color:'#1F2F2C',letterSpacing:'-1px',marginBottom:'8px'}}>Upload Medical Report</h1>
          <p style={{color:'#8F9B96',fontSize:'14px'}}>Upload your blood reports or lab results. AI will extract your health parameters automatically.</p>
        </div>

        {error && (
          <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'12px',padding:'14px 16px',marginBottom:'20px',fontSize:'13px',color:'#DC2626'}}>
            {error}
          </div>
        )}

        {/* Upload Zone */}
        {status === 'idle' && (
          <div>
            <div className={`drop-zone ${dragOver ? 'over' : ''}`}
              onDragOver={e => {e.preventDefault();setDragOver(true)}}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input').click()}>
              <div style={{fontSize:'48px',marginBottom:'16px'}}>📄</div>
              <h3 style={{fontSize:'18px',fontWeight:'700',color:'#1F2F2C',marginBottom:'8px'}}>Drop your report here</h3>
              <p style={{color:'#8F9B96',fontSize:'14px',marginBottom:'16px'}}>or click to browse files</p>
              <span style={{display:'inline-block',background:'#F1EAE1',borderRadius:'60px',padding:'6px 16px',fontSize:'12px',fontWeight:'600',color:'#A55639'}}>PDF files supported</span>
              <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="file-input" style={{display:'none'}}/>
            </div>

            {file && (
              <div style={{display:'flex',alignItems:'center',gap:'12px',padding:'16px',borderRadius:'16px',background:'#F0F4EC',border:'1px solid #D4E4D0',marginTop:'16px',marginBottom:'16px'}}>
                <span style={{fontSize:'24px'}}>📄</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:'600',color:'#1F2F2C',fontSize:'14px'}}>{file.name}</div>
                  <div style={{fontSize:'12px',color:'#8F9B96'}}>{(file.size/1024).toFixed(1)} KB</div>
                </div>
                <span style={{color:'#2A5C4A',fontWeight:'600',fontSize:'13px'}}>✓ Ready</span>
              </div>
            )}

            <button onClick={handleUpload} disabled={!file}
              style={{width:'100%',background:file?'#C2593A':'#D9CFC2',color:file?'white':'#8F9B96',fontWeight:'600',padding:'16px',borderRadius:'60px',border:'none',cursor:file?'pointer':'not-allowed',fontSize:'15px',transition:'all 0.25s',marginTop:'8px',fontFamily:"'Inter',sans-serif"}}>
              Upload & Analyse Report →
            </button>
          </div>
        )}

        {/* Processing */}
        {status === 'processing' && (
          <div style={{background:'white',borderRadius:'24px',padding:'48px',textAlign:'center',border:'1px solid #EFE6DC'}}>
            <div style={{width:'56px',height:'56px',border:'3px solid #EFE6DC',borderTopColor:'#C2593A',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto 24px'}}></div>
            <h3 style={{fontSize:'20px',fontWeight:'800',color:'#1F2F2C',marginBottom:'8px'}}>Reading your report...</h3>
            <p style={{color:'#8F9B96',fontSize:'14px',marginBottom:'24px'}}>AI is extracting your health parameters</p>
            <div style={{display:'flex',flexDirection:'column',gap:'8px',maxWidth:'240px',margin:'0 auto',textAlign:'left'}}>
              {['✓ Document detected','✓ Text extracted','⟳ Identifying parameters...'].map((s,i) => (
                <div key={i} style={{fontSize:'13px',color:i<2?'#2A5C4A':'#C2593A',fontWeight:'500'}}>{s}</div>
              ))}
            </div>
          </div>
        )}

        {/* Done */}
        {status === 'done' && (
          <div style={{background:'white',borderRadius:'24px',padding:'28px',border:'1px solid #EFE6DC'}}>
            <div style={{marginBottom:'20px'}}>
              <div style={{fontSize:'13px',fontWeight:'700',color:'#C2593A',marginBottom:'6px'}}>— SCAN COMPLETE</div>
              <h3 style={{fontSize:'22px',fontWeight:'800',color:'#1F2F2C'}}>
                {extractedParams.length > 0 ? `Found ${extractedParams.length} health values!` : 'No parameters found'}
              </h3>
            </div>

            {extractedParams.length > 0 ? (
              <>
                <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'24px'}}>
                  {extractedParams.map((param,i) => (
                    <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',borderRadius:'12px',background:'#F0F4EC',border:'1px solid #D4E4D0'}}>
                      <span style={{fontSize:'14px',color:'#4A5B5E',fontWeight:'500',textTransform:'capitalize'}}>
                        {param.name.replace(/_/g,' ')}
                      </span>
                      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        <span style={{fontWeight:'700',fontSize:'14px',color:'#1F2F2C'}}>{param.value} {param.unit}</span>
                        <span style={{color:'#2A5C4A',fontWeight:'600'}}>✓</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={handleConfirm}
                  style={{width:'100%',background:'#2A5C4A',color:'white',fontWeight:'600',padding:'16px',borderRadius:'60px',border:'none',cursor:'pointer',fontSize:'15px',fontFamily:"'Inter',sans-serif"}}>
                  Confirm & Analyse →
                </button>
              </>
            ) : (
              <div style={{textAlign:'center',padding:'24px 0'}}>
                <div style={{fontSize:'48px',marginBottom:'12px'}}>🔍</div>
                <p style={{color:'#8F9B96',fontSize:'14px',marginBottom:'20px'}}>No health parameters found. Try uploading a blood test or lab report with numeric values.</p>
                <button onClick={() => setStatus('idle')}
                  style={{background:'#F1EAE1',color:'#A55639',fontWeight:'600',padding:'12px 24px',borderRadius:'60px',border:'none',cursor:'pointer',fontSize:'14px',fontFamily:"'Inter',sans-serif"}}>
                  Try another file
                </button>
              </div>
            )}
          </div>
        )}

        {/* Supported types */}
        <div style={{background:'white',borderRadius:'20px',padding:'20px',border:'1px solid #EFE6DC',marginTop:'20px'}}>
          <div style={{fontSize:'11px',fontWeight:'700',color:'#C2593A',letterSpacing:'1px',marginBottom:'14px'}}>SUPPORTED REPORT TYPES</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
            {[
              {icon:'🩸',name:'Blood Test (CBC)'},
              {icon:'🫀',name:'Lipid Profile'},
              {icon:'🍬',name:'Blood Sugar / HbA1c'},
              {icon:'🫘',name:'Liver Function'},
              {icon:'🫁',name:'Kidney Function'},
              {icon:'🦋',name:'Thyroid Profile'},
            ].map((item,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'13px',color:'#4A5B5E'}}>
                <span>{item.icon}</span><span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportUpload;