import express from "express"
import dotenv from "dotenv"
import * as cors from "cors"
import gamesRouter from "./routes/GamesRouter.js"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())

app.use( [ gamesRouter ] )

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor iniciou na porta ${PORT}!!!`)
})