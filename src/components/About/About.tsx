'use client';

import { portfolioData } from '@/data/portfolio';
import { MapPin, Mail, Briefcase, User } from 'lucide-react';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={`section ${styles.about}`} id="about">
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">01.</span> About Me
        </h2>

        <div className={styles.grid}>
          {/* Left Column: Personal Info Card */}
          <div className={styles.infoCol}>
            <div className={`card ${styles.infoCard}`}>
              <h3 className={styles.name}>{portfolioData.personal.name}</h3>
              <p className={styles.tagline}>{portfolioData.personal.tagline}</p>

              <div className={styles.detailsList}>
                <div className={styles.detailItem}>
                  <User size={18} className={styles.detailIcon} />
                  <div>
                    <span className={styles.detailLabel}>Name</span>
                    <span className={styles.detailValue}>{portfolioData.personal.name}</span>
                  </div>
                </div>
                
                <div className={styles.detailItem}>
                  <Mail size={18} className={styles.detailIcon} />
                  <div>
                    <span className={styles.detailLabel}>Email</span>
                    <a href={`mailto:${portfolioData.personal.email}`} className={styles.detailValue}>
                      {portfolioData.personal.email}
                    </a>
                  </div>
                </div>
                
                <div className={styles.detailItem}>
                  <Briefcase size={18} className={styles.detailIcon} />
                  <div>
                    <span className={styles.detailLabel}>Role</span>
                    <span className={styles.detailValue}>{portfolioData.personal.role}</span>
                  </div>
                </div>
                
                <div className={styles.detailItem}>
                  <MapPin size={18} className={styles.detailIcon} />
                  <div>
                    <span className={styles.detailLabel}>Location</span>
                    <span className={styles.detailValue}>{portfolioData.personal.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio only */}
          <div className={styles.bioCol}>
            <div className={`card ${styles.bioCard}`}>
              <h3 className={styles.cardTitle}>Biography</h3>
              <div className={styles.bioText}>
                {portfolioData.personal.about.split('. ').map((sentence, i) => (
                  <p key={i}>{sentence.trim()}{sentence.endsWith('.') ? '' : '.'}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
