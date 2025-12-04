import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getExperience, getEducation } from '../services/api';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const Timeline = ({ type }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = type === 'experience' ? await getExperience() : await getEducation();
        setItems(data);
      } catch (error) {
        console.error('Error fetching timeline data:', error);
        // Fallback data if API fails (for demo purposes)
        if (type === 'experience') {
           setItems([
            { _id: '1', company: 'Tech Solutions', role: 'Senior Dev', duration: '2022-Present', description: 'Leading frontend team.' },
            { _id: '2', company: 'Web Agency', role: 'Developer', duration: '2020-2022', description: 'Building websites.' }
           ]);
        } else {
           setItems([
            { _id: '1', institution: 'University', degree: 'CS Degree', duration: '2016-2020', description: 'Graduated with honors.' }
           ]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
      {/* Vertical Line */}
      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--surface)', transform: 'translateX(-50%)' }}></div>

      {items.map((item, index) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          style={{
            display: 'flex',
            justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
            paddingBottom: '3rem',
            position: 'relative',
            width: '100%',
          }}
        >
          {/* Icon */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '0',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: '0 0 0 4px var(--background)'
          }}>
            {type === 'experience' ? <FaBriefcase color="white" /> : <FaGraduationCap color="white" />}
          </div>

          {/* Content Card */}
          <div className="glass" style={{
            width: '45%',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            position: 'relative',
            marginLeft: index % 2 === 0 ? '0' : 'auto',
            marginRight: index % 2 === 0 ? 'auto' : '0',
          }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>{item.duration}</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {type === 'experience' ? item.role : item.degree}
            </h3>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {type === 'experience' ? item.company : item.institution}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
