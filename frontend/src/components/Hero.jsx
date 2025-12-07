import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaDownload } from 'react-icons/fa';
import { getResume } from '../services/api';

const Hero = () => {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResume();
        if (data.exists) {
          setResume(data);
        }
      } catch (error) {
        console.error('Error fetching resume:', error);
      }
    };
    fetchResume();
  }, []);

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Background Elements */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.2, borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', background: 'var(--secondary)', filter: 'blur(100px)', opacity: 0.2, borderRadius: '50%' }}></div>

      <div className="container" style={{ textAlign: 'center', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>Hello, I'm</h2>
          <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: 1.2 }}>
            <span className="gradient-text">Utkarsh Kesharwani</span>
          </h1>
          <h3 style={{ fontSize: '2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Software Developer
          </h3>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem' }}>
            I build exceptional digital experiences that are fast, accessible, beautiful, and responsive.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="projects" smooth={true} duration={500} offset={-70}>
              <button className="btn btn-primary">View My Work</button>
            </Link>
            <Link to="contact" smooth={true} duration={500} offset={-70}>
              <button className="btn btn-outline">Contact Me</button>
            </Link>
            {resume && (
              <a 
                href={`http://localhost:5000${resume.filePath}`}
                download
                style={{ textDecoration: 'none' }}
              >
                <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaDownload /> Download Resume
                </button>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
