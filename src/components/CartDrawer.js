"use client";

import { useCart } from '../context/CartContext';
import styles from '../app/page.module.css';
import Image from 'next/image';
import { useState } from 'react';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, cartTotal } = useCart();
  const [checkoutMessage, setCheckoutMessage] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setCheckoutMessage(true);
    setTimeout(() => setCheckoutMessage(false), 4000);
  };

  return (
    <>
      <div className={styles.drawerOverlay} onClick={() => setIsCartOpen(false)}></div>
      <div className={`${styles.drawerContainer} animate-fade-in`}>
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>YOUR CART</h2>
          <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        <div className={styles.drawerContent}>
          {cartItems.length === 0 ? (
            <p style={{ color: 'var(--foreground-muted)', textAlign: 'center', marginTop: '4rem' }}>
              EMPTY.
            </p>
          ) : (
            <div className={styles.cartItemsList}>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className={styles.cartItem}>
                  <div className={styles.cartItemImageWrap}>
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover', filter: 'grayscale(100%)' }} />
                  </div>
                  <div className={styles.cartItemInfo}>
                    <h4 className={styles.cartItemName}>{item.name}</h4>
                    <p className={styles.cartItemSize}>SIZE: {item.size} | QTY: {item.quantity}</p>
                    <p className={styles.cartItemPrice}>R$ {item.price * item.quantity}</p>
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeFromCart(item.id, item.size)}>
                    REMOVE
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.drawerFooter}>
          <div className={styles.cartTotalRow}>
            <span>TOTAL</span>
            <span>R$ {cartTotal}</span>
          </div>
          
          {checkoutMessage ? (
            <div className={styles.checkoutAlert}>
              CHECKOUT INDISPONÍVEL<br/>DROP OFICIAL EM 7 DIAS
            </div>
          ) : (
            <button 
              className={styles.checkoutBtn} 
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              FINALIZAR (CHECKOUT)
            </button>
          )}
        </div>
      </div>
    </>
  );
}
