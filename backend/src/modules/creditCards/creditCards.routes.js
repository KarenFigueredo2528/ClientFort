import express from "express";
import {
  createCard,
  getCards,
  updateCardLimit,
  deactivateCard,
  searchCards,
  countCardsByClient,
} from "./creditCards.controller.js";

const router = express.Router();

router.post("/", createCard);
router.get("/", getCards);
router.get("/buscar", searchCards);
router.get("/contar/:clienteId", countCardsByClient);
router.put("/:id", updateCardLimit);
router.delete("/:id", deactivateCard);

export default router;
