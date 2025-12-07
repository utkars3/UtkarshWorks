import { useState, useEffect } from 'react';
import { getExperience, createExperience, updateExperience, deleteExperience } from '../services/api';
import { FaTrash, FaPlus, FaEdit, FaTimes } from 'react-icons/fa';

const ExperienceManager = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    duration: '',
    description: ''
  });

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const data = await getExperience();
      setExperience(data);
    } catch (error) {
      console.error('Error fetching experience:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateExperience(editingId, formData);
        setEditingId(null);
      } else {
        await createExperience(formData);
      }
      setFormData({ company: '', role: '', duration: '', description: '' });
      fetchExperience();
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      company: item.company,
      role: item.role,
      duration: item.duration,
      description: item.description || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ company: '', role: '', duration: '', description: '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience entry?')) {
      try {
        await deleteExperience(id);
        fetchExperience();
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Experience</h2>
      
      {/* Add/Edit Experience Form */}
      <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>{editingId ? 'Edit Experience' : 'Add New Experience'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <input 
            type="text" placeholder="Company" value={formData.company} 
            onChange={e => setFormData({...formData, company: e.target.value})} 
            required style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <input 
            type="text" placeholder="Role" value={formData.role} 
            onChange={e => setFormData({...formData, role: e.target.value})} 
            required style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <input 
            type="text" placeholder="Duration (e.g., 2020 - 2022)" value={formData.duration} 
            onChange={e => setFormData({...formData, duration: e.target.value})} 
            required style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <textarea 
            placeholder="Description" value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)', minHeight: '80px' }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {editingId ? <><FaEdit /> Update Experience</> : <><FaPlus /> Add Experience</>}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancelEdit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                <FaTimes /> Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Experience List */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {experience.map(item => (
          <div key={item._id} className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontWeight: 'bold' }}>{item.role}</h4>
              <p style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>{item.company}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.duration}</p>
              {item.description && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{item.description}</p>}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleEdit(item)} style={{ background: 'var(--primary)', border: 'none', color: 'white', padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(item._id)} style={{ background: 'var(--error)', border: 'none', color: 'white', padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceManager;
