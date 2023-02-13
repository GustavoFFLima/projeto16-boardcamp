import { Router } from "express"
import { validitySchema } from "../middlewares/schemaMiddlewares.js"
import { gamesSchema } from "../model/GamesSchema.js"
import { getGames, postGames} from "../controller/gamesController.js"

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", validitySchema(gamesSchema), postGames)

export default gamesRouter