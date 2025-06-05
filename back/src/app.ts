import express from "express";
import router from "./routes/cidades.route";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/cidade", router);

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
