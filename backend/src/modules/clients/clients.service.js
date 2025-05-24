import { db } from "../../database/mysqlConnection.js";

export async function createClientService(
  numeroIdentificacion,
  nombreCompleto,
  correoElectronico
) {
  const [result] = await db.query(
    "INSERT INTO cliente (numero_identificacion, nombre_completo, correo_electronico) VALUES (?, ?, ?)",
    [numeroIdentificacion, nombreCompleto, correoElectronico]
  );
  return { insertedId: result.insertId };
}

export async function getClientsService() {
  const [clients] = await db.query("SELECT * FROM cliente");

  for (const client of clients) {
    const clientId = client.id ?? client.id_cliente;
    const [tarjetas] = await db.query(
      "SELECT * FROM tarjeta_credito WHERE cliente_id = ?",
      [clientId]
    );
    client.tarjetas = tarjetas;
  }

  return clients;
}

export async function searchClientsService(filters) {
  const keys = [];
  const values = [];

  if (filters.nombre) {
    keys.push("nombre_completo LIKE ?");
    values.push(`%${filters.nombre}%`);
  }
  if (filters.correo) {
    keys.push("correo_electronico LIKE ?");
    values.push(`%${filters.correo}%`);
  }

  const where = keys.length > 0 ? `WHERE ${keys.join(" AND ")}` : "";

  const [clients] = await db.query(`SELECT * FROM cliente ${where}`, values);

  if (clients.length === 0) return [];

  for (const client of clients) {
    const clientId = client.id ?? client.id_cliente;
    const [cards] = await db.query(
      `SELECT numero_tarjeta, franquicia, estado FROM tarjeta_credito WHERE cliente_id = ?`,
      [clientId]
    );
    client.tarjetas = cards;
  }

  return clients;
}
