import { db } from "../../database/mysqlConnection.js";

function calcularFranquicia(numero) {
  if (/^5[1-5][0-9]{14}$/.test(numero)) return "MASTERCARD";
  if (/^4[0-9]{15}$/.test(numero)) return "VISA";
  if (/^3[47][0-9]{13}$/.test(numero)) return "AMEX";
  return null;
}

export async function createCardService(data) {
  const {
    numeroTarjeta,
    fechaVencimiento,
    cupoTotal,
    cupoDisponible,
    clienteId,
  } = data;

  const franquicia = calcularFranquicia(numeroTarjeta);
  if (!franquicia)
    throw new Error("Número de tarjeta inválido o franquicia no reconocida");

  const [exist] = await db.query(
    "SELECT 1 FROM tarjeta_credito WHERE numero_tarjeta = ?",
    [numeroTarjeta]
  );
  if (exist.length > 0) throw new Error("Número de tarjeta ya existe");

  const [result] = await db.query(
    `INSERT INTO tarjeta_credito
    (numero_tarjeta, fecha_vencimiento, franquicia, estado, cupo_total, cupo_disponible, cliente_id)
    VALUES (?, ?, ?, 'ACTIVO', ?, ?, ?)`,
    [
      numeroTarjeta,
      fechaVencimiento,
      franquicia,
      cupoTotal,
      cupoDisponible,
      clienteId,
    ]
  );

  return { insertedId: result.insertId };
}

export async function getCardsService() {
  const [rows] = await db.query("SELECT * FROM tarjeta_credito");
  return rows;
}

export async function updateCardLimitService(id, cupoTotal) {
  await db.query("UPDATE tarjeta_credito SET cupo_total = ? WHERE id = ?", [
    cupoTotal,
    id,
  ]);
  return { message: "Cupo actualizado correctamente" };
}

export async function deactivateCardService(id) {
  await db.query(
    "UPDATE tarjeta_credito SET estado = 'INACTIVO' WHERE id = ?",
    [id]
  );
  return { message: "Tarjeta desactivada correctamente" };
}

export async function searchCardsService(filters) {
  const conditions = [];
  const values = [];

  if (filters.numero) {
    conditions.push("numero_tarjeta LIKE ?");
    values.push(`%${filters.numero}%`);
  }
  if (filters.franquicia) {
    conditions.push("franquicia = ?");
    values.push(filters.franquicia.toUpperCase());
  }
  if (filters.estado) {
    conditions.push("estado = ?");
    values.push(filters.estado.toUpperCase());
  }

  const where =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const [rows] = await db.query(
    `SELECT * FROM tarjeta_credito ${where}`,
    values
  );
  return rows;
}

export async function countCardsByClientService(clienteId) {
  const [rows] = await db.query(
    "SELECT COUNT(*) AS total FROM tarjeta_credito WHERE cliente_id = ?",
    [clienteId]
  );

  return rows[0].total;
}
