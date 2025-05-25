import express from "express";
import clientsRoutes from "./src/modules/clients/clients.routes.js";
import cardsRoutes from "./src/modules/creditCards/creditCards.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/clientes", clientsRoutes);
app.use("/api/tarjetas", cardsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
});
