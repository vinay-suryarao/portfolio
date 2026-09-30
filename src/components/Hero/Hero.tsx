'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { portfolioData } from '@/data/portfolio';
import { isExternal, toDownloadUrl, toImageUrl } from '@/lib/media';
import { Download } from 'lucide-react';
import styles from './Hero.module.css';

const useTypewriter = (words: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 1500) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const currentWord = words[loopNum % words.length] ?? '';
    let timer: NodeJS.Timeout;

    if (!isDeleting && text === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setLoopNum((n) => n + 1);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
};

export default function Hero() {
  const { personal } = portfolioData;
  const typingText = useTypewriter(personal.typingWords);
  const resumeUrl = toDownloadUrl(personal.resumeUrl);
  const avatarUrl = toImageUrl(personal.avatar);

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
              href={resumeUrl}
              className={styles.primaryBtn}
              download
              {...(isExternal(resumeUrl) && { target: '_blank', rel: 'noopener noreferrer' })}
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
                src={avatarUrl}
                alt={personal.name}
                unoptimized={isExternal(avatarUrl)}
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
