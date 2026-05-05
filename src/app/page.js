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
        <div className={styles.logo}>
          <Image 
            src="/logo.png" 
            alt="One Stride Logo" 
            width={120} 
            height={40} 
            className={styles.logoImage} 
            priority
          />
        </div>
        <div className={styles.navLinks}>
          <a href="#collection">Coleção</a>
          <a href="#vip">Lista VIP</a>
          <a href="#about">Sobre</a>
          <a href="https://instagram.com/onestridecrew" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </nav>

      <main>
        <header className={styles.hero}>
          {/* Usamos o próprio hoodie var1 como fundo pra criar a atmosfera de streetwear claro */}
          <Image 
            src="/hoodie_var1.png" 
            alt="One Stride Aesthetic" 
            fill
            priority
            className={styles.heroBackground}
          />
          <div className={styles.heroOverlay}></div>
          <Image 
            src="/logo.png" 
            alt="One Stride Logo" 
            width={300} 
            height={100} 
            className={`animate-fade-in delay-1 ${styles.logoImage}`} 
            style={{ marginBottom: '1rem', width: 'auto', height: '120px' }}
          />
          <p className={`${styles.heroSubtitle} animate-fade-in delay-2`}>
            A essência das ruas. Minimalismo elevado.
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
                src="/prototype.png" 
                alt="One Stride Prototype Hoodie" 
                fill 
                className={styles.collectionImage}
              />
              <div className={styles.collectionInfo}>
                <h3 className={styles.collectionName}>OS Original Prototype</h3>
                <p className={styles.collectionDesc}>Graphic Print. Signature Cut.</p>
              </div>
            </div>
            
            <div className={styles.collectionItem}>
              <Image 
                src="/hoodie_var1.png" 
                alt="One Stride Light Ash Hoodie" 
                fill 
                className={styles.collectionImage}
              />
              <div className={styles.collectionInfo}>
                <h3 className={styles.collectionName}>OS Core Ash Edition</h3>
                <p className={styles.collectionDesc}>Premium Ash Grey. Minimalist Details.</p>
              </div>
            </div>
            
            <div className={styles.collectionItem}>
              <Image 
                src="/hoodie_var2.png" 
                alt="One Stride Cream Hoodie" 
                fill 
                className={styles.collectionImage}
              />
              <div className={styles.collectionInfo}>
                <h3 className={styles.collectionName}>OS Cream Studio</h3>
                <p className={styles.collectionDesc}>Pale Grey / Cream. Studio Exclusive.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="vip" className={styles.waitlist}>
          <h2 className={styles.waitlistTitle}>Lista VIP (Drop 01)</h2>
          <p className={styles.waitlistDesc}>
            A primeira coleção será extremamente limitada. Cadastre-se na Lista VIP para ter acesso antecipado exclusivo antes do lançamento oficial.
          </p>
          <form className={styles.waitlistForm} onSubmit={(e) => { e.preventDefault(); alert('Obrigado! Seu e-mail foi cadastrado na Lista VIP.'); }}>
            <input 
              type="email" 
              placeholder="Digite seu e-mail" 
              className={styles.waitlistInput}
              required 
            />
            <button type="submit" className={styles.waitlistButton}>
              Garantir Acesso
            </button>
          </form>
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
        <div className={styles.logo}>
          <Image 
            src="/logo.png" 
            alt="One Stride Logo" 
            width={80} 
            height={30} 
            className={styles.logoImage} 
          />
        </div>
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
