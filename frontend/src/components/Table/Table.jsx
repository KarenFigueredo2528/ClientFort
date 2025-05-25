// src/components/Table/Table.js
import React from 'react';
import styles from './Table.module.css';

const Table = ({ cards, onEditCard, onDeleteCard }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return '';
    return cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`${styles.statusBadge} ${status === 'ACTIVO' ? styles.active : styles.inactive}`}>
        {status}
      </span>
    );
  };

  const getFranchiseLogo = (franchise) => {
    const logos = {
      'VISA': '💳',
      'MASTERCARD': '💳',
      'AMERICAN EXPRESS': '💳',
      'DINERS CLUB': '💳'
    };
    return logos[franchise] || '💳';
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h1>Gestión de Tarjetas de Crédito</h1>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{cards.length}</span>
            <span className={styles.statLabel}>Total Tarjetas</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{cards.filter(card => card.estado === 'ACTIVO').length}</span>
            <span className={styles.statLabel}>Activas</span>
          </div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tarjeta</th>
              <th>Cliente</th>
              <th>Franquicia</th>
              <th>Vencimiento</th>
              <th>Cupo Total</th>
              <th>Disponible</th>
              <th>Utilizado</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.id} className={styles.tableRow}>
                <td>{card.id}</td>
                <td className={styles.cardNumber}>
                  <span className={styles.franchise}>{getFranchiseLogo(card.franquicia)}</span>
                  <span>{maskCardNumber(card.numero_tarjeta)}</span>
                </td>
                <td>{card.cliente || 'N/A'}</td>
                <td>
                  <span className={styles.franchiseBadge}>
                    {card.franquicia}
                  </span>
                </td>
                <td>{card.fecha_vencimiento}</td>
                <td className={styles.amount}>{formatCurrency(card.cupo_total)}</td>
                <td className={styles.amount}>{formatCurrency(card.cupo_disponible)}</td>
                <td className={styles.amount}>{formatCurrency(card.cupo_utilizado)}</td>
                <td>{getStatusBadge(card.estado)}</td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => onEditCard(card)}
                    >
                      📝
                    </button>

                    <button
                      className={styles.actionButton}
                      onClick={() => onDeleteCard(card)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {cards.length === 0 && (
          <div className={styles.emptyState}>
            <h3>No hay tarjetas registradas</h3>
            <p>Usa el panel lateral para crear tu primera tarjeta</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;