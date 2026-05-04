"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? "glass-panel" : ""}`}>
        <div className={styles.logo}>ONE STRIDE</div>
        <div className={styles.navLinks}>
          <a href="#collection">Coleção</a>
          <a href="#about">Sobre</a>
          <a href="https://instagram.com/onestridecrew" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </nav>

      <main>
        <header className={styles.hero}>
          <Image 
            src="/hero_background.png" 
            alt="One Stride Aesthetic" 
            fill
            priority
            className={styles.heroBackground}
          />
          <div className={styles.heroOverlay}></div>
          <h1 className={`${styles.heroTitle} animate-fade-in delay-1`}>ONE STRIDE</h1>
          <p className={`${styles.heroSubtitle} animate-fade-in delay-2`}>
            A essência das ruas. Minimalismo. Exclusividade.
          </p>
          <div className="animate-fade-in delay-3">
            <a href="#collection" className={styles.ctaButton}>Ver Coleção</a>
          </div>
        </header>

        <section id="collection" className={styles.section}>
          <h2 className={styles.sectionTitle}>Exclusive Drops</h2>
          <div className={styles.collectionGrid}>
            <div className={styles.collectionItem}>
              <Image 
                src="/lookbook_hoodie.png" 
                alt="One Stride Hoodie" 
                fill 
                className={styles.collectionImage}
              />
              <div className={styles.collectionInfo}>
                <h3 className={styles.collectionName}>OS Core Hoodie</h3>
                <p className={styles.collectionDesc}>Oversized fit. Premium Heavyweight Cotton.</p>
              </div>
            </div>
            
            <div className={styles.collectionItem}>
              <Image 
                src="/lookbook_jacket.png" 
                alt="One Stride Jacket" 
                fill 
                className={styles.collectionImage}
              />
              <div className={styles.collectionInfo}>
                <h3 className={styles.collectionName}>OS Urban Shell</h3>
                <p className={styles.collectionDesc}>Dark Elegance. Minimalist Construction.</p>
              </div>
            </div>
            
            <div className={styles.collectionItem}>
              <div style={{width: '100%', height: '100%', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{fontFamily: 'var(--font-heading)', color: '#333', letterSpacing: '2px'}}>COMING SOON</span>
              </div>
              <div className={styles.collectionInfo}>
                <h3 className={styles.collectionName}>Drop 002</h3>
                <p className={styles.collectionDesc}>To be announced.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className={styles.about}>
          <h2 className={styles.sectionTitle}>The Brand</h2>
          <p className={styles.aboutText}>
            ONE STRIDE não é apenas sobre o que você veste. É sobre o caminho que você trilha. 
            Nascida do asfalto, nossa estética une a atitude bruta da cultura urbana com a sofisticação 
            do minimalismo contemporâneo. Cada peça é um statement de exclusividade.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.logo}>ONE STRIDE</div>
        <div className={styles.footerLinks}>
          <a href="https://instagram.com/onestridecrew" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <div className={styles.footerCopy}>
          &copy; {new Date().getFullYear()} ONE STRIDE. All rights reserved.
        </div>
      </footer>
    </>
  );
}
