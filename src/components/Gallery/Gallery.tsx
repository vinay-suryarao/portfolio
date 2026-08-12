'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryItems = [
    { id: 1, src: '/images/1760677675578.jpg', alt: 'Vinay at tech event' },
    { id: 2, src: '/images/1760677675760.jpg', alt: 'Workshop session' },
    { id: 3, src: '/images/1771490399127.jpg', alt: 'Team collaboration' },
    { id: 4, src: '/images/1771493034650.jpg', alt: 'DevOps club meetup' },
    { id: 5, src: '/images/1771493034952.jpg', alt: 'Technical presentation' },
  ];

  return (
    <section className={`section ${styles.gallery}`} id="gallery">
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">05.</span> Gallery
        </h2>

        <div className={styles.grid}>
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`card ${styles.galleryItem}`}
              onClick={() => setSelectedImage(item.src)}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <span className={styles.viewIcon}>🔍</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedImage(null)}>
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="Gallery image"
              width={900}
              height={600}
              style={{ objectFit: 'contain', width: '100%', height: 'auto', maxHeight: '85vh' }}
              className={styles.lightboxImage}
            />
          </div>
        </div>
      )}
    </section>
  );
}
