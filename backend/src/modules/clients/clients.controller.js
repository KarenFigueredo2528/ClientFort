import {
  createClientService,
  getClientsService,
  searchClientsService,
} from "./clients.service.js";

export async function createClient(req, res) {
  try {
    const { numeroIdentificacion, nombreCompleto, correoElectronico } =
      req.body;
    const result = await createClientService(
      numeroIdentificacion,
      nombreCompleto,
      correoElectronico
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getClients(req, res) {
  try {
    const result = await getClientsService();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function searchClients(req, res) {
  try {
    const { query } = req;
    const result = await searchClientsService(query);

    if (result.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontraron clientes con los criterios proporcionados.",
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
