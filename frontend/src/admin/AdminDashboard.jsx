import { useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/api';
import { FaProjectDiagram, FaBriefcase, FaGraduationCap, FaTrophy, FaSignOutAlt } from 'react-icons/fa';

import ProjectManager from './ProjectManager';

// Placeholder components for management sections
const ExperienceManager = () => <div><h2>Manage Experience</h2><p>Experience management interface goes here.</p></div>;
import EducationManager from './EducationManager';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="glass" style={{ width: '250px', padding: '2rem', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--primary)' }}>Dashboard</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/admin/projects" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', borderRadius: 'var(--radius-sm)', transition: 'background 0.3s' }}>
            <FaProjectDiagram /> Projects
          </Link>
          <Link to="/admin/experience" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', borderRadius: 'var(--radius-sm)', transition: 'background 0.3s' }}>
            <FaBriefcase /> Experience
          </Link>
          <Link to="/admin/education" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', borderRadius: 'var(--radius-sm)', transition: 'background 0.3s' }}>
            <FaGraduationCap /> Education
          </Link>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', marginTop: 'auto', background: 'transparent', border: 'none', color: 'var(--error)', cursor: 'pointer' }}>
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem' }}>
        <Routes>
          <Route path="dashboard" element={<div><h2>Welcome Admin</h2></div>} />
          <Route path="projects" element={<ProjectManager />} />
          <Route path="experience" element={<ExperienceManager />} />
          <Route path="education" element={<EducationManager />} />
          <Route path="*" element={<div><h2>Welcome Admin</h2><p>Select a section to manage.</p></div>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
