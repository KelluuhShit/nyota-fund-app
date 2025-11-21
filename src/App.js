// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import ApplicationPage from './pages/ApplicationPage';
import ProcessingPage from './pages/ProcessingPage';
import ActivateAccount from './pages/ActivateAccount';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/apply" element={<ApplicationPage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        <Route path="/activate" element={<ActivateAccount />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;