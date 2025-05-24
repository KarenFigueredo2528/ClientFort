import express from "express";
import {
  createClient,
  getClients,
  searchClients,
} from "./clients.controller.js";

const router = express.Router();

router.post("/", createClient);
router.get("/", getClients);
router.get("/buscar", searchClients);

export default router;
