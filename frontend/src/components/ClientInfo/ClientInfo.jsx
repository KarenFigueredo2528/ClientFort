// src/components/ClientInfo/ClientInfo.js
import React from 'react';
import styles from './ClientInfo.module.css';

const ClientInfo = () => {
  return (
    <div className={styles.clientInfo}>
      <h2 className={styles.title}>Información del Cliente</h2>
      <div className={styles.infoCard}>
        <div className={styles.avatar}>
          <span>SR</span>
        </div>
        <div className={styles.details}>
          <h3>Sofía Rodríguez</h3>
          <p>ID: 12345</p>
          <p>Email: sofia.rodriguez@email.com</p>
          <p>Teléfono: +57 300 123 4567</p>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;