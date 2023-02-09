import { Router } from "express"
import { getGames, postGames} from "../controller/gamesController.js"

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", postGames)

export default gamesRouter