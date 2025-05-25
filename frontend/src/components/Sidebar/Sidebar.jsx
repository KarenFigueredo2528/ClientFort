import React, { useEffect, useState } from 'react';
import ClientInfo from '../ClientInfo/ClientInfo';
import CardForm from '../CardForm/CardForm';
import { fetchClientById } from '../../services/clientService'; // Necesitarás este nuevo servicio
import styles from './Sidebar.module.css';

const Sidebar = ({
  isOpen,
  onToggle,
  onAddCard,
  onUpdateCard,
  existingCards = [],
  cardToEdit = null
}) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Siempre ejecuta esta función al montar el componente
    const loadClient = async () => {
      try {
        const client = await fetchClientById(1);
        setClients([client]); // Lo ponemos en un array para mantener el formato
      } catch (err) {
        console.error('Error al cargar cliente:', err);
      }
    };

    loadClient();
  }, []);

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
            clients={clients} /* Pasamos el cliente en array */
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