import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HealthInput from './pages/HealthInput';
import ReportUpload from './pages/ReportUpload';
import HealthHistory from './pages/HealthHistory';
import Chatbot from './pages/Chatbot';
import Preview from './pages/Preview';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <BrowserRouter>
      <WhatsAppButton />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/health-input" element={<HealthInput />} />
        <Route path="/report-upload" element={<ReportUpload />} />
        <Route path="/history" element={<HealthHistory />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;