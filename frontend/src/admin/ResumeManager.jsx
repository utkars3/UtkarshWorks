import { useState, useEffect } from 'react';
import { getResume, uploadResume } from '../services/api';
import { FaFileUpload, FaDownload, FaTrash } from 'react-icons/fa';

const ResumeManager = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const data = await getResume();
      setResume(data.exists ? data : null);
    } catch (error) {
      console.error('Error fetching resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or DOC file');
        return;
      }
      setResumeFile(file);
    }
  };

  const handleUpload = async () => {
    if (!resumeFile) {
      alert('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      await uploadResume(resumeFile);
      setResumeFile(null);
      fetchResume();
      alert('Resume uploaded successfully!');
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Error uploading resume: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Resume</h2>
      
      {/* Upload Resume */}
      <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Upload Resume</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Upload your resume in PDF or DOC format. This will replace any existing resume.
        </p>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.75rem', 
            background: 'rgba(0,0,0,0.2)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: 'var(--radius-sm)', 
            cursor: 'pointer' 
          }}>
            <FaFileUpload />
            <span>{resumeFile ? resumeFile.name : 'Choose Resume (PDF/DOC)'}</span>
            <input 
              type="file" 
              accept=".pdf,.doc,.docx" 
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
          
          {resumeFile && (
            <button 
              onClick={handleUpload} 
              disabled={uploading}
              className="btn btn-primary" 
              style={{ 
                justifySelf: 'start', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                opacity: uploading ? 0.6 : 1
              }}
            >
              <FaFileUpload /> {uploading ? 'Uploading...' : 'Upload Resume'}
            </button>
          )}
        </div>
      </div>

      {/* Current Resume */}
      {resume && (
        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ marginBottom: '1rem' }}>Current Resume</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{resume.filename}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Size: {formatFileSize(resume.size)}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Uploaded: {new Date(resume.uploadedAt).toLocaleDateString()}
              </p>
            </div>
            <a 
              href={`http://localhost:5000${resume.filePath}`}
              download
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'var(--primary)',
                color: 'white',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none'
              }}
            >
              <FaDownload /> Download
            </a>
          </div>
        </div>
      )}

      {!resume && !loading && (
        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No resume uploaded yet</p>
        </div>
      )}
    </div>
  );
};

export default ResumeManager;
