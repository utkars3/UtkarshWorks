import { useState, useEffect } from 'react';
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from '../services/api';
import { FaTrash, FaPlus, FaEdit, FaTimes } from 'react-icons/fa';

const AchievementManager = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    icon: ''
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const data = await getAchievements();
      setAchievements(data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAchievement(editingId, formData);
        setEditingId(null);
      } else {
        await createAchievement(formData);
      }
      setFormData({ title: '', description: '', date: '', icon: '' });
      fetchAchievements();
    } catch (error) {
      console.error('Error saving achievement:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      description: item.description || '',
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
      icon: item.icon || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', date: '', icon: '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await deleteAchievement(id);
        fetchAchievements();
      } catch (error) {
        console.error('Error deleting achievement:', error);
      }
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Achievements</h2>
      
      {/* Add/Edit Achievement Form */}
      <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>{editingId ? 'Edit Achievement' : 'Add New Achievement'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <input 
            type="text" placeholder="Title" value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            required style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <textarea 
            placeholder="Description" value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)', minHeight: '80px' }}
          />
          <input 
            type="date" placeholder="Date" value={formData.date} 
            onChange={e => setFormData({...formData, date: e.target.value})} 
            style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <input 
            type="text" placeholder="Icon (emoji or icon name)" value={formData.icon} 
            onChange={e => setFormData({...formData, icon: e.target.value})} 
            style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {editingId ? <><FaEdit /> Update Achievement</> : <><FaPlus /> Add Achievement</>}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancelEdit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                <FaTimes /> Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Achievements List */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {achievements.map(item => (
          <div key={item._id} className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {item.icon && <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>}
                <h4 style={{ fontWeight: 'bold' }}>{item.title}</h4>
              </div>
              {item.description && <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item.description}</p>}
              {item.date && <p style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>{new Date(item.date).toLocaleDateString()}</p>}
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

export default AchievementManager;
