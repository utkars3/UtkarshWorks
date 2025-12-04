import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAchievements } from '../services/api';
import { FaTrophy, FaAward, FaCertificate } from 'react-icons/fa';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getAchievements();
        setAchievements(data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
        setAchievements([
            { _id: '1', title: 'Best Developer', description: 'Awarded for excellence in coding.', date: '2023' },
            { _id: '2', title: 'Hackathon Winner', description: 'First place in global hackathon.', date: '2022' }
        ]);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <section id="achievements" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <h2 className="section-title gradient-text" style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem' }}>Achievements</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {achievements.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass"
              style={{ padding: '2rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--primary)' }}
            >
              <div style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '1rem' }}>
                <FaTrophy />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{item.description}</p>
              <span style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>{new Date(item.date).getFullYear()}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
