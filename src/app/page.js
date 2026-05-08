"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";
import ProductModal from "../components/ProductModal";

const PRODUCTS = [
  {
    id: "p1",
    name: "OS Original Prototype",
    price: 289,
    image: "/prototype.png",
    desc: "Graphic Print / Heavyweight",
    soldOut: true
  },
  {
    id: "p2",
    name: "OS Core Ash Edition",
    price: 319,
    image: "/hoodie_var1.png",
    desc: "Ash Grey / Minimalist",
    soldOut: false
  },
  {
    id: "p3",
    name: "OS Cream Studio",
    price: 319,
    image: "/hoodie_var2.png",
    desc: "Pale Grey / Exclusive",
    soldOut: false
  },
  {
    id: "p4",
    name: "OS Angel Guardian Hoodie",
    price: 349,
    image: "/angel_hoodie.png",
    desc: "Black / Front & Back Graphic",
    soldOut: false
  }
];

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  
  const { toggleCart, totalItems } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const dropDate = new Date();
    dropDate.setDate(dropDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = dropDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password.toUpperCase() === "STRIDE01") {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (unlocked) {
    return (
      <div className={styles.storeContainer}>
        <div className="noise-overlay"></div>
        <CartDrawer />
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}

        <header className={`${styles.storeHeader} animate-fade-in delay-1`}>
          <Image 
            src="/logo.png" 
            alt="One Stride" 
            width={150} 
            height={60} 
            style={{ mixBlendMode: 'multiply' }}
            unoptimized
          />
          <button className={styles.cartButton} onClick={toggleCart}>
            CART ({totalItems})
          </button>
        </header>

        <h2 className={`${styles.storeTitle} animate-fade-in delay-2`} style={{ marginBottom: '3rem' }}>
          DROP 01: THE INNER CIRCLE
        </h2>

        <div className={`${styles.grid} animate-fade-in delay-3`}>
          {PRODUCTS.map(product => (
            <div 
              key={product.id} 
              className={styles.productCard} 
              onClick={() => !product.soldOut && setSelectedProduct(product)}
            >
              <div className={styles.imageWrapper}>
                {product.soldOut && <div className={styles.soldOut}>SOLD OUT</div>}
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className={styles.productImage}
                />
                {!product.soldOut && (
                  <div className={styles.productOverlay}>
                    <span className={styles.buyText}>VIEW</span>
                  </div>
                )}
              </div>
              <div className={styles.productInfo}>
                <div>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>{product.desc}</p>
                </div>
                <span className={styles.productPrice}>R$ {product.price}</span>
              </div>
            </div>
          ))}
        </div>

        <footer style={{ marginTop: '8rem', borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', color: 'var(--foreground-muted)', fontSize: '0.8rem' }}>
          <span>&copy; {new Date().getFullYear()} ONE STRIDE CREW.</span>
          <span>NO REFUNDS. NO REMORSE.</span>
        </footer>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className="noise-overlay"></div>
      <div className="animate-fade-in">
        <Image 
          src="/logo.png" 
          alt="One Stride" 
          width={200} 
          height={100} 
          className={styles.glitchLogo} 
          style={{ mixBlendMode: 'multiply' }}
          priority 
          unoptimized
        />
      </div>

      <h1 className={`${styles.lockedText} animate-fade-in delay-1`}>LOCKED</h1>
      <p className={`${styles.subtitle} animate-fade-in delay-1`}>Invite Only. Drop 01.</p>

      <div className={`${styles.countdownContainer} animate-fade-in delay-2`}>
        <div className={styles.countdownBox}>
          <span className={styles.countdownNumber}>{timeLeft.days.toString().padStart(2, '0')}</span>
          <span className={styles.countdownLabel}>DAYS</span>
        </div>
        <div className={styles.countdownBox}>
          <span className={styles.countdownNumber}>{timeLeft.hours.toString().padStart(2, '0')}</span>
          <span className={styles.countdownLabel}>HRS</span>
        </div>
        <div className={styles.countdownBox}>
          <span className={styles.countdownNumber}>{timeLeft.minutes.toString().padStart(2, '0')}</span>
          <span className={styles.countdownLabel}>MIN</span>
        </div>
        <div className={styles.countdownBox}>
          <span className={styles.countdownNumber}>{timeLeft.seconds.toString().padStart(2, '0')}</span>
          <span className={styles.countdownLabel}>SEC</span>
        </div>
      </div>

      <div className={`${styles.formContainer} animate-fade-in delay-3`}>
        <form className={styles.inputGroup} onSubmit={handleUnlock}>
          <input
            type="password"
            placeholder="ENTER PASSWORD"
            className={styles.passwordInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.submitButton}>ENTER</button>
        </form>
        {error && <p className={styles.errorMessage}>ACCESS DENIED</p>}
      </div>

      <div className={`${styles.footer} animate-fade-in delay-3`}>
        &copy; {new Date().getFullYear()} ONE STRIDE CREW
      </div>
    </div>
  );
}
