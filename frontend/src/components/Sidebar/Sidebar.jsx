// src/components/Sidebar/Sidebar.js
import React from 'react';
import ClientInfo from '../ClientInfo/ClientInfo';
import CardForm from '../CardForm/CardForm';
import styles from './Sidebar.module.css';

const Sidebar = ({
  isOpen,
  onToggle,
  onAddCard,
  onUpdateCard,
  existingCards = [],
  cardToEdit = null
}) => {
  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarContent}>
          <ClientInfo />

          <CardForm
            onAddCard={onAddCard}
            onUpdateCard={onUpdateCard}
            onToggle={onToggle}
            existingCards={existingCards}
            cardToEdit={cardToEdit}
          />
        </div>
      </div>

      <button
        className={`${styles.toggleButton} ${isOpen ? styles.buttonOpen : ''}`}
        onClick={onToggle}
      >
        {isOpen ? '❮' : '❯'}
      </button>

      {isOpen && <div className={styles.overlay} onClick={onToggle}></div>}
    </>
  );
};

export default Sidebar;