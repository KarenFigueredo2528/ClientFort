// src/components/CardForm/CardForm.js
import React, { useState, useEffect } from 'react';
import styles from './CardForm.module.css';

const CardForm = ({ onAddCard, onUpdateCard, onToggle, existingCards = [], cardToEdit = null }) => {
  const [formData, setFormData] = useState({
    numero_tarjeta: '',
    fecha_vencimiento: '',
    cupo_total: '',
    cupo_disponible: '',
    cliente: ''
  });

  useEffect(() => {
    if (cardToEdit) {
      setFormData({
        numero_tarjeta: cardToEdit.numero_tarjeta,
        fecha_vencimiento: cardToEdit.fecha_vencimiento,
        cupo_total: cardToEdit.cupo_total,
        cupo_disponible: cardToEdit.cupo_disponible,
        cliente: cardToEdit.cliente
      });
    }
  }, [cardToEdit]);

  const isEditMode = !!cardToEdit;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getFranquicia = (numero) => {
    if (numero.length === 16 && /^5[1-5]/.test(numero)) return 'MASTERCARD';
    if (numero.length === 16 && numero.startsWith('4')) return 'VISA';
    if (numero.length === 15 && /^3[47]/.test(numero)) return 'AMERICAN EXPRESS';
    return 'DESCONOCIDA';
  };

  const isValidDateFormat = (fecha) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(fecha);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { numero_tarjeta, fecha_vencimiento, cupo_total, cupo_disponible, cliente } = formData;

    if (!numero_tarjeta || !/^\d{15,16}$/.test(numero_tarjeta)) {
      alert('El número de tarjeta debe tener 15 o 16 dígitos numéricos');
      return;
    }

    if (!isEditMode) {
      const isDuplicate = existingCards.some(card => card.numero_tarjeta === numero_tarjeta);
      if (isDuplicate) {
        alert('Este número de tarjeta ya está registrado');
        return;
      }

      if (!isValidDateFormat(fecha_vencimiento)) {
        alert('La fecha de vencimiento debe tener el formato MM/YYYY');
        return;
      }

      if (parseFloat(cupo_total) < parseFloat(cupo_disponible)) {
        alert('El cupo disponible no puede ser mayor que el cupo total');
        return;
      }

      const franquicia = getFranquicia(numero_tarjeta);
      const cupo_utilizado = parseFloat(cupo_total) - parseFloat(cupo_disponible);

      const newCard = {
        numero_tarjeta,
        fecha_vencimiento,
        franquicia,
        estado: 'ACTIVO',
        cupo_total: parseFloat(cupo_total),
        cupo_disponible: parseFloat(cupo_disponible),
        cupo_utilizado,
        cliente
      };

      onAddCard(newCard);
    } else {
      const updatedCard = {
        ...cardToEdit,
        cupo_total: parseFloat(cupo_total),
        cupo_utilizado: parseFloat(cupo_total) - parseFloat(cardToEdit.cupo_disponible)
      };

      onUpdateCard(updatedCard);
    }

    setFormData({
      numero_tarjeta: '',
      fecha_vencimiento: '',
      cupo_total: '',
      cupo_disponible: '',
      cliente: ''
    });

    setTimeout(() => {
      onToggle();
    }, 500);
  };

  return (
    <div className={styles.cardForm}>
      <h2 className={styles.title}>{isEditMode ? 'Editar Tarjeta' : 'Crear Nueva Tarjeta'}</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Número de Tarjeta *</label>
          <input
            type="text"
            name="numero_tarjeta"
            value={formData.numero_tarjeta}
            disabled={isEditMode}
            onChange={handleChange}
            maxLength="16"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Fecha de Vencimiento *</label>
          <input
            type="text"
            name="fecha_vencimiento"
            value={formData.fecha_vencimiento}
            disabled={isEditMode}
            onChange={handleChange}
            pattern="^(0[1-9]|1[0-2])\/\d{4}$"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Cupo Total *</label>
          <input
            type="number"
            name="cupo_total"
            value={formData.cupo_total}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        {!isEditMode && (
          <div className={styles.inputGroup}>
            <label>Cupo Disponible *</label>
            <input
              type="number"
              name="cupo_disponible"
              value={formData.cupo_disponible}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
        )}

        <div className={styles.inputGroup}>
          <label>Cliente</label>
          <input
            type="text"
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
            disabled={isEditMode}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          {isEditMode ? 'Actualizar Cupo' : 'Crear Tarjeta'}
        </button>
      </form>
    </div>
  );
};

export default CardForm;