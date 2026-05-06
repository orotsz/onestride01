"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import styles from '../app/page.module.css';

export default function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();
  
  const sizes = ['S', 'M', 'L', 'XL'];

  if (!product) return null;

  const handleAdd = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={`${styles.modalContainer} animate-fade-in`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtnModal} onClick={onClose}>✕</button>
        
        <div className={styles.modalGrid}>
          <div className={styles.modalImageWrapper}>
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              style={{ objectFit: 'cover', filter: 'grayscale(20%) contrast(120%)' }}
            />
          </div>
          
          <div className={styles.modalInfo}>
            <div>
              <h2 className={styles.modalProductName}>{product.name}</h2>
              <p className={styles.modalProductPrice}>R$ {product.price}</p>
              
              <div className={styles.modalDesc}>
                <p>{product.desc}</p>
                <p style={{ marginTop: '1rem', color: 'var(--foreground-muted)' }}>
                  Oversized fit. Drop shoulder. 100% Heavyweight Cotton.
                </p>
              </div>
            </div>

            <div className={styles.sizeSection}>
              <h4 className={styles.sizeTitle}>SELECT SIZE</h4>
              <div className={styles.sizeGrid}>
                {sizes.map((size) => (
                  <button 
                    key={size}
                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className={styles.modalAddBtn} 
              disabled={!selectedSize}
              onClick={handleAdd}
            >
              {selectedSize ? 'ADD TO CART' : 'SELECT A SIZE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
