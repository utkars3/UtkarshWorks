const initialData = {
  users: [
    {
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'password123', // Will be hashed by pre-save hook
    },
  ],
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with payment integration.',
      image: 'https://via.placeholder.com/600x400',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com',
      featured: true,
    },
    {
      title: 'Portfolio Website',
      description: 'Interactive personal portfolio with admin dashboard.',
      image: 'https://via.placeholder.com/600x400',
      tags: ['React', 'Vite', 'CSS3'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com',
      featured: true,
    },
  ],
  experience: [
    {
      company: 'Tech Solutions Inc.',
      role: 'Senior Frontend Developer',
      duration: '2022 - Present',
      description: 'Leading the frontend team and architecting scalable UI solutions.',
      order: 1,
    },
    {
      company: 'Digital Agency',
      role: 'Web Developer',
      duration: '2020 - 2022',
      description: 'Developed responsive websites for various clients.',
      order: 2,
    },
  ],
  education: [
    {
      institution: 'University of Technology',
      degree: 'B.S. Computer Science',
      duration: '2016 - 2020',
      description: 'Graduated with honors. Specialized in Software Engineering.',
      order: 1,
    },
  ],
  achievements: [
    {
      title: 'Best Developer Award',
      description: 'Recognized for outstanding contribution to open source.',
      date: new Date('2023-12-01'),
      icon: 'trophy',
    },
  ],
  reviews: [
    {
      clientName: 'John Doe',
      company: 'Startup Inc.',
      review: 'Amazing work! Delivered on time and exceeded expectations.',
      rating: 5,
    },
  ],
};

module.exports = initialData;
