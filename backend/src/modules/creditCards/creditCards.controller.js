import {
  createCardService,
  getCardsService,
  updateCardLimitService,
  deactivateCardService,
  searchCardsService,
  countCardsByClientService,
} from "./creditCards.service.js";

export async function createCard(req, res) {
  try {
    const result = await createCardService(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getCards(req, res) {
  try {
    const result = await getCardsService();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateCardLimit(req, res) {
  try {
    const { id } = req.params;
    const { cupoTotal } = req.body;
    const result = await updateCardLimitService(id, cupoTotal);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deactivateCard(req, res) {
  try {
    const { id } = req.params;
    const result = await deactivateCardService(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function searchCards(req, res) {
  try {
    const { query } = req;
    const result = await searchCardsService(query);

    if (result.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontraron tarjetas con los criterios proporcionados.",
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function countCardsByClient(req, res) {
  try {
    const { clienteId } = req.params;
    const count = await countCardsByClientService(clienteId);

    res.json({ clienteId: parseInt(clienteId), cantidadTarjetas: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
