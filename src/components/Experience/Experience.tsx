'use client';

import { portfolioData } from '@/data/portfolio';
import { Briefcase, GraduationCap } from 'lucide-react';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section className={`section ${styles.experience}`} id="experience">
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">03.</span> Experience & Education
        </h2>

        <div className={styles.grid}>
          {/* Experience Column */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <div className={styles.iconWrapper}>
                <Briefcase size={20} />
              </div>
              <h3 className={styles.columnTitle}>Experience</h3>
            </div>
            
            <div className={`card ${styles.timelineCard}`}>
              <div className={styles.timeline}>
                {portfolioData.experience.map((exp) => (
                  <div key={exp.id} className={styles.timelineItem}>
                    <div className={styles.timelineDot}></div>
                    <div className={styles.timelineContent}>
                      <span className={styles.date}>{exp.duration}</span>
                      <h4 className={styles.role}>{exp.role}</h4>
                      <p className={styles.company}>{exp.company}</p>
                      <p className={styles.description}>{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Column */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <div className={styles.iconWrapper}>
                <GraduationCap size={20} />
              </div>
              <h3 className={styles.columnTitle}>Education</h3>
            </div>
            
            <div className={`card ${styles.timelineCard}`}>
              <div className={styles.timeline}>
                {portfolioData.education.map((edu) => (
                  <div key={edu.id} className={styles.timelineItem}>
                    <div className={styles.timelineDot}></div>
                    <div className={styles.timelineContent}>
                      <span className={styles.date}>{edu.duration}</span>
                      <h4 className={styles.role}>{edu.degree}</h4>
                      <p className={styles.company}>{edu.institution}</p>
                      {edu.coursework && (
                        <p className={styles.coursework}>
                          <span className={styles.courseworkLabel}>Relevant Coursework:</span> {edu.coursework}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
