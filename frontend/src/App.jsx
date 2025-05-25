import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Table from './components/Table/Table';
// import { fetchCards, createCard, updateCardLimit, deactivateCard } from './services/cardService';
import { cardsMock } from './mock/cardMock';

const USE_MOCK = true;

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cards, setCards] = useState(USE_MOCK ? cardsMock : []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const loadCards = async () => {
    if (USE_MOCK) {
      setCards(cardsMock);
    } else {
      try {
        const data = await fetchCards();
        setCards(data);
      } catch (error) {
        console.error('Error cargando tarjetas:', error.message);
      }
    }
  };

  const addCard = async (newCard) => {
    if (USE_MOCK) {
      // Simula ID autoincremental
      const maxId = cards.reduce((max, c) => (c.id > max ? c.id : max), 0);
      const cardCreated = {
        id: maxId + 1,
        estado: 'ACTIVO',
        franquicia: 'PENDIENTE', // o calcula si quieres
        ...newCard,
      };
      setCards([...cards, cardCreated]);
      return;
    }

    try {
      const cardCreated = await createCard(newCard);
      setCards([...cards, cardCreated]);
    } catch (error) {
      console.error('Error creando tarjeta:', error.message);
    }
  };

  const editCard = async (card) => {
    const nuevoCupo = prompt("Nuevo cupo total:", card.cupo_total);
    if (nuevoCupo === null) return;

    const nuevoCupoTotal = parseFloat(nuevoCupo);
    if (isNaN(nuevoCupoTotal)) {
      alert("Por favor ingresa un número válido.");
      return;
    }

    if (USE_MOCK) {
      setCards(prev =>
        prev.map(c => c.id === card.id ? { ...c, cupo_total: nuevoCupoTotal } : c)
      );
      return;
    }

    try {
      const updated = await updateCardLimit(card.id, nuevoCupoTotal);
      setCards(prev =>
        prev.map(c => c.id === card.id ? updated : c)
      );
    } catch (error) {
      console.error("Error actualizando tarjeta:", error.message);
    }
  };

  const deleteCard = async (card) => {
    if (!window.confirm("¿Seguro que deseas desactivar esta tarjeta?")) return;

    if (USE_MOCK) {
      setCards(prev =>
        prev.map(c =>
          c.id === card.id ? { ...c, estado: 'INACTIVO' } : c
        )
      );
      return;
    }

    try {
      await deactivateCard(card.id);
      setCards(prev =>
        prev.map(c =>
          c.id === card.id ? { ...c, estado: 'INACTIVO' } : c
        )
      );
    } catch (error) {
      console.error("Error desactivando tarjeta:", error.message);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <div className="app">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        onAddCard={addCard}
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