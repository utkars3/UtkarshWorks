import { useState, useEffect } from 'react';
import { getEducation, createEducation, deleteEducation } from '../services/api';
import { FaTrash, FaPlus } from 'react-icons/fa';

const EducationManager = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    duration: '',
    description: ''
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const data = await getEducation();
      setEducation(data);
    } catch (error) {
      console.error('Error fetching education:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEducation(formData);
      setFormData({ institution: '', degree: '', duration: '', description: '' });
      fetchEducation();
    } catch (error) {
      console.error('Error creating education:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      try {
        await deleteEducation(id);
        fetchEducation();
      } catch (error) {
        console.error('Error deleting education:', error);
      }
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Education</h2>
      
      {/* Add Education Form */}
      <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Education</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <input 
            type="text" placeholder="Institution" value={formData.institution} 
            onChange={e => setFormData({...formData, institution: e.target.value})} 
            required style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <input 
            type="text" placeholder="Degree" value={formData.degree} 
            onChange={e => setFormData({...formData, degree: e.target.value})} 
            required style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <input 
            type="text" placeholder="Duration (e.g., 2016 - 2020)" value={formData.duration} 
            onChange={e => setFormData({...formData, duration: e.target.value})} 
            required style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <textarea 
            placeholder="Description" value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaPlus /> Add Education
          </button>
        </form>
      </div>

      {/* Education List */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {education.map(item => (
          <div key={item._id} className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontWeight: 'bold' }}>{item.degree}</h4>
              <p style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>{item.institution}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.duration}</p>
            </div>
            <button onClick={() => handleDelete(item._id)} style={{ background: 'var(--error)', border: 'none', color: 'white', padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationManager;
