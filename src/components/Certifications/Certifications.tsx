'use client';

import { useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import { Award, BadgeCheck } from 'lucide-react';
import styles from './Certifications.module.css';

export default function Certifications() {
  const [activeTab, setActiveTab] = useState<'certifications' | 'awards'>('certifications');

  return (
    <section className={`section ${styles.certifications}`} id="certifications">
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">06.</span> Awards & Certifications
        </h2>

        <div className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'certifications' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('certifications')}
          >
            <BadgeCheck size={18} />
            Certifications
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'awards' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('awards')}
          >
            <Award size={18} />
            Awards
          </button>
        </div>

        {activeTab === 'certifications' && (
          <div className={styles.grid}>
            {portfolioData.certifications.map((cert) => (
              <div key={cert.id} className={`card ${styles.certCard}`}>
                <div className={styles.iconWrapper}>{cert.icon}</div>
                <h3 className={styles.title}>{cert.title}</h3>
                <p className={styles.issuer}>{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'awards' && (
          <div className={styles.grid}>
            {portfolioData.awards.map((award) => (
              <div key={award.id} className={`card ${styles.certCard} ${styles.awardCard}`}>
                <div className={styles.iconWrapper}>{award.icon}</div>
                <h3 className={styles.title}>{award.title}</h3>
                <p className={styles.issuer}>{award.organization}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
