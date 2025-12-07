import { useState, useEffect } from 'react';
import { getProjects, createProject, deleteProject, uploadImage } from '../services/api';
import { FaTrash, FaPlus, FaImage } from 'react-icons/fa';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    liveLink: '',
    githubFrontend: '',
    githubBackend: ''
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      let imagePath = formData.image;
      
      // Upload image if a file is selected
      if (imageFile) {
        const uploadResult = await uploadImage(imageFile);
        imagePath = uploadResult.filePath;
      }
      
      const tagsArray = formData.tags.split(',').map(tag => tag.trim());
      await createProject({ ...formData, image: imagePath, tags: tagsArray });
      
      // Reset form
      setFormData({ title: '', description: '', image: '', tags: '', liveLink: '', githubFrontend: '', githubBackend: '' });
      setImageFile(null);
      setImagePreview('');
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
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
            required style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)', minHeight: '80px' }}
          />
          
          {/* Image Upload */}
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all 0.3s' }}>
              <FaImage />
              <span>{imageFile ? imageFile.name : 'Choose Image'}</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
            {imagePreview && (
              <div style={{ position: 'relative', width: '200px', height: '150px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '2px solid var(--primary)' }}>
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
          
          <input 
            type="text" placeholder="Tags (comma separated)" value={formData.tags} 
            onChange={e => setFormData({...formData, tags: e.target.value})} 
            style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <input 
            type="text" placeholder="Live Link" value={formData.liveLink} 
            onChange={e => setFormData({...formData, liveLink: e.target.value})} 
            style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input 
              type="text" placeholder="GitHub Frontend" value={formData.githubFrontend} 
              onChange={e => setFormData({...formData, githubFrontend: e.target.value})} 
              style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
            />
            <input 
              type="text" placeholder="GitHub Backend" value={formData.githubBackend} 
              onChange={e => setFormData({...formData, githubBackend: e.target.value})} 
              style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
            />
          </div>
          <button type="submit" disabled={uploading} className="btn btn-primary" style={{ justifySelf: 'start', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: uploading ? 0.6 : 1 }}>
            <FaPlus /> {uploading ? 'Uploading...' : 'Add Project'}
          </button>
        </form>
      </div>

      {/* Projects List */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {projects.map(project => (
          <div key={project._id} className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            {project.image && (
              <img 
                src={`http://localhost:5000${project.image}`} 
                alt={project.title}
                style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />
            )}
            <div style={{ flex: 1 }}>
              <h4 style={{ fontWeight: 'bold' }}>{project.title}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{project.description.substring(0, 50)}...</p>
              {project.tags && project.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  {project.tags.map((tag, idx) => (
                    <span key={idx} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--primary)', borderRadius: 'var(--radius-sm)' }}>{tag}</span>
                  ))}
                </div>
              )}
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
