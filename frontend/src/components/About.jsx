import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

const About = () => {
  const skills = [
    { name: 'JavaScript/TypeScript', level: 90 },
    { name: 'React/Next.js', level: 85 },
    { name: 'Node.js/Express', level: 80 },
    { name: 'MongoDB/SQL', level: 75 },
    { name: 'HTML/CSS', level: 95 },
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title gradient-text" style={{ marginBottom: '1.5rem', fontSize: '2.5rem', fontWeight: 'bold' }}>About Me</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
           I’m Utkarsh, an SDE at HSBC working on scalable, secure banking systems with prior experience at BIO OH Tech. I’m also a competitive programmer with achievements like LeetCode Knight.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
Along with development, I’m a DSA Mentor at GeeksforGeeks, where I’ve trained 3000+ students. As a Developer, Mentor, and Speaker, I love building impactful solutions and helping others grow.  </p>
            <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaDownload /> Download Resume
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>My Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: 'var(--surface)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                      style={{ height: '100%', background: 'var(--gradient-main)', borderRadius: 'var(--radius-full)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
