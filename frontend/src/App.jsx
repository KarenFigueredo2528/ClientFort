import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Table from './components/Table/Table';
import './App.css';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);
  const [cards, setCards] = useState([
    {
      id: 1,
      numero_tarjeta: '1234567890123456',
      fecha_vencimiento: '12/2025',
      franquicia: 'VISA',
      estado: 'ACTIVO',
      cupo_total: 5000000.00,
      cupo_disponible: 3500000.00,
      cupo_utilizado: 1500000.00,
      cliente: 'Juan Pérez'
    },
    {
      id: 2,
      numero_tarjeta: '9876543210987654',
      fecha_vencimiento: '06/2026',
      franquicia: 'MASTERCARD',
      estado: 'ACTIVO',
      cupo_total: 2000000.00,
      cupo_disponible: 1800000.00,
      cupo_utilizado: 200000.00,
      cliente: 'María García'
    }
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isSidebarOpen) {
      setCardToEdit(null); // Limpiar al cerrar
    }
  };

  const addOrUpdateCard = (newCard) => {
    if (cardToEdit) {
      // Modo edición: actualizar tarjeta existente
      setCards(cards.map(card =>
        card.id === cardToEdit.id
          ? { ...newCard, id: cardToEdit.id }
          : card
      ));
    } else {
      // Modo nuevo: agregar tarjeta
      const newId = cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1;
      setCards([
        ...cards,
        {
          ...newCard,
          id: newId,
          cupo_utilizado: newCard.cupo_total - newCard.cupo_disponible
        }
      ]);
    }

    setIsSidebarOpen(false);
    setCardToEdit(null);
  };

  const editCard = (card) => {
    setCardToEdit(card);
    setIsSidebarOpen(true);
  };

  const deleteCard = (card) => {
    const confirm = window.confirm(`¿Eliminar tarjeta de ${card.cliente}?`);
    if (confirm) {
      setCards(cards.filter(c => c.id !== card.id));
    }
  };

  return (
    <div className="app">
      <Sidebar 
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        onAddCard={addOrUpdateCard}
        cardToEdit={cardToEdit}
      />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Table 
          cards={cards} 
          onEditCard={editCard}
          onDeleteCard={deleteCard}
        />
      </div>
    </div>
  );
};

export default App;