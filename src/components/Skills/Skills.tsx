'use client';

import { portfolioData } from '@/data/portfolio';
import styles from './Skills.module.css';


export default function Skills() {
  return (
    <section className={`section ${styles.skills}`} id="skills">
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">02.</span> Skills & Expertise
        </h2>

        <div className={styles.grid}>
          {portfolioData.skillCategories.map((category) => (
            <div key={category.id} className={`card ${styles.categoryCard}`}>
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
