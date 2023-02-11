import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import gamesRouter from "./routes/GamesRouter.js"
import customersRouter from "./routes/CustomersRouter.js"
import rentalsRouter from "./routes/RentalsRouterRouter.js"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())

app.use( [ gamesRouter, customersRouter, rentalsRouter ] )

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Servidor iniciou na porta ${port}!!!`)
})