'use client';

import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`${styles.preloader} ${progress >= 100 ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <div className={styles.nameWrapper}>
          {'VINAY'.split('').map((letter, i) => (
            <span
              key={`first-${i}`}
              className={styles.letter}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {letter}
            </span>
          ))}
          <span className={styles.space}>&nbsp;</span>
          {'SURYARAO'.split('').map((letter, i) => (
            <span
              key={`last-${i}`}
              className={styles.letter}
              style={{ animationDelay: `${(i + 6) * 0.08}s` }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className={styles.progressText}>
          {Math.min(Math.round(progress), 100)}%
        </div>
      </div>
    </div>
  );
}
