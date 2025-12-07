import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../services/api';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback data
        setProjects([
          {
            _id: '1',
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce solution with payment integration.',
            image: 'https://via.placeholder.com/600x400',
            tags: ['React', 'Node.js', 'MongoDB'],
            liveLink: '#',
            githubLink: '#'
          },
          {
            _id: '2',
            title: 'Portfolio Website',
            description: 'Interactive personal portfolio with admin dashboard.',
            image: 'https://via.placeholder.com/600x400',
            tags: ['React', 'Vite', 'CSS3'],
            liveLink: '#',
            githubLink: '#'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title gradient-text" style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem' }}>Featured Projects</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center' }}>Loading projects...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass"
                style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', transition: 'transform 0.3s' }}
                whileHover={{ y: -10 }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img 
                    src={project.image ? (project.image.startsWith('http') ? project.image : `http://localhost:5000${project.image}`) : 'https://via.placeholder.com/600x400'} 
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '280px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p style={{ 
                    color: 'var(--text-secondary)', 
                    marginBottom: '1rem', 
                    flex: '0 0 auto',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: '1.5rem',
                    height: '3rem'
                  }}>
                    {project.description}
                  </p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', minHeight: '2rem' }}>
                    {project.tags && project.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'var(--surface)', borderRadius: 'var(--radius-full)', color: 'var(--primary)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                    {(project.githubFrontend || project.githubBackend || project.githubLink) && (
                      <>
                        {project.githubFrontend && (
                          <a href={project.githubFrontend} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)' }}>
                            <FaGithub /> Frontend
                          </a>
                        )}
                        {project.githubBackend && (
                          <a href={project.githubBackend} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)' }}>
                            <FaGithub /> Backend
                          </a>
                        )}
                        {!project.githubFrontend && !project.githubBackend && project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)' }}>
                            <FaGithub /> Code
                          </a>
                        )}
                      </>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
