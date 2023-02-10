import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import gamesRouter from "./routes/GamesRouter.js"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())

app.use( [ gamesRouter ] )

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Servidor iniciou na porta ${port}!!!`)
})