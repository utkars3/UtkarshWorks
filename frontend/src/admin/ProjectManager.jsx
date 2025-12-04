import { useState, useEffect } from 'react';
import { getProjects, createProject, deleteProject } from '../services/api';
import { FaTrash, FaPlus } from 'react-icons/fa';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    liveLink: '',
    githubLink: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim());
      await createProject({ ...formData, tags: tagsArray });
      setFormData({ title: '', description: '', image: '', tags: '', liveLink: '', githubLink: '' });
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Projects</h2>
      
      {/* Add Project Form */}
      <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Project</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <input 
            type="text" placeholder="Title" value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            required style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <textarea 
            placeholder="Description" value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            required style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <input 
            type="text" placeholder="Image URL" value={formData.image} 
            onChange={e => setFormData({...formData, image: e.target.value})} 
            style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <input 
            type="text" placeholder="Tags (comma separated)" value={formData.tags} 
            onChange={e => setFormData({...formData, tags: e.target.value})} 
            style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input 
              type="text" placeholder="Live Link" value={formData.liveLink} 
              onChange={e => setFormData({...formData, liveLink: e.target.value})} 
              style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
            />
            <input 
              type="text" placeholder="GitHub Link" value={formData.githubLink} 
              onChange={e => setFormData({...formData, githubLink: e.target.value})} 
              style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaPlus /> Add Project
          </button>
        </form>
      </div>

      {/* Projects List */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {projects.map(project => (
          <div key={project._id} className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontWeight: 'bold' }}>{project.title}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{project.description.substring(0, 50)}...</p>
            </div>
            <button onClick={() => handleDelete(project._id)} style={{ background: 'var(--error)', border: 'none', color: 'white', padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
