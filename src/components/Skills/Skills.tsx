'use client';

import styles from './Skills.module.css';

const skillCategories = [
  {
    title: 'Languages',
    icon: '💻',
    skills: ['C', 'C++', 'Java', 'Python', 'Bash Scripting'],
  },
  {
    title: 'Web Development',
    icon: '🌐',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js'],
  },
  {
    title: 'DevOps',
    icon: '⚙️',
    skills: ['Git', 'GitHub', 'Docker', 'Jenkins', 'CI/CD', 'Jira'],
  },
  {
    title: 'Automation Tools',
    icon: '🤖',
    skills: ['Ansible', 'Chef', 'Puppet'],
  },
  {
    title: 'Cloud Technologies',
    icon: '☁️',
    skills: ['AWS', 'Firebase', 'Vercel', 'Netlify', 'Cloudinary'],
  },
  {
    title: 'Databases',
    icon: '🗄️',
    skills: ['MySQL', 'MongoDB', 'Firestore'],
  },
  {
    title: 'Operating Systems',
    icon: '🖥️',
    skills: ['Ubuntu', 'Windows', 'CentOS'],
  },
  {
    title: 'Security Tools',
    icon: '🔒',
    skills: ['Wireshark', 'Nmap', 'Hashing', 'Firewalls', 'IDS'],
  },
];

export default function Skills() {
  return (
    <section className={`section ${styles.skills}`} id="skills">
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">02.</span> Skills & Expertise
        </h2>

        <div className={styles.grid}>
          {skillCategories.map((category) => (
            <div key={category.title} className={`card ${styles.categoryCard}`}>
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIcon}>{category.icon}</span>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
              </div>
              <div className={styles.skillsList}>
                {category.skills.map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
