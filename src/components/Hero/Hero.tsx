'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { portfolioData } from '@/data/portfolio';
import { Download } from 'lucide-react';
import styles from './Hero.module.css';

const useTypewriter = (words: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 1500) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[loopNum % words.length];

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && text === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
};

export default function Hero() {
  const typingText = useTypewriter([
    'Web Developer',
    'DevOps Enthusiast',
    'IT Professional',
    'Cloud Explorer'
  ]);

  return (
    <section className={styles.hero} id="hero">
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Hi, I&apos;m <span className={styles.highlight}>{portfolioData.personal.firstName}</span>
          </h1>

          <h2 className={styles.subtitle}>
            A <span className={styles.typing}>{typingText}</span><span className={styles.cursor}>|</span>
          </h2>

          <p className={styles.description}>
            {portfolioData.personal.heroSubtitle}
          </p>

          <div className={styles.actions}>
            <a
              href={portfolioData.personal.resumeUrl}
              className={styles.primaryBtn}
              download
            >
              <Download size={20} />
              Download CV
            </a>
            <a
              href="#contact"
              className={styles.secondaryBtn}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Me
            </a>
          </div>

          <div className={styles.stats}>
            {portfolioData.stats.slice(0, 3).map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}+</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Photo */}
        <div className={styles.photoSection}>
          <div className={styles.photoFrame}>
            {/* Decorative elements */}
            <div className={styles.decorSquare}></div>
            <div className={styles.decorCircle}></div>
            <div className={styles.decorDots}></div>

            <div className={styles.photoWrapper}>
              <Image
                src="/images/vinay.png"
                alt="Vinay Suryarao"
                fill
                style={{ objectFit: 'cover' }}
                className={styles.photo}
                priority
              />
            </div>
            <div className={styles.photoGlow}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
