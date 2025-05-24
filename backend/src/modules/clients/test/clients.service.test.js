import { describe, test, expect, afterAll } from "vitest";
import { createClientService } from "../clients.service.js";
import { db } from "../../../database/mysqlConnection.js";

describe("createClientService", () => {
  let insertedId;

  afterAll(async () => {
    // Eliminar el cliente insertado durante la prueba
    await db.query("DELETE FROM cliente WHERE id_cliente = ?", [insertedId]);
    await db.end(); // Cerrar conexión después de las pruebas
  });

  test("debería insertar un nuevo cliente y devolver el id", async () => {
    const cliente = {
      numeroIdentificacion: String(Date.now()), // Genera uno nuevo siempre
      nombreCompleto: "Cliente Prueba",
      correoElectronico: `prueba${Date.now()}@example.com`,
    };

    const result = await createClientService(
      cliente.numeroIdentificacion,
      cliente.nombreCompleto,
      cliente.correoElectronico
    );

    expect(result).toHaveProperty("insertedId");
    insertedId = result.insertedId;
  });
});
