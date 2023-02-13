import { Router } from "express"
import { validitySchema } from "../middlewares/schemaMiddlewares.js"
import { rentalsSchema } from "../model/RentalsSchema.js"
import { getRentals, postRentals, postRentalsById, deleteRentals } from "../controller/RentalsController.js"

const rentalsRouter = Router()

rentalsRouter.get("/Rentals", getRentals)
rentalsRouter.post("/Rentals", validitySchema(rentalsSchema), postRentals)
rentalsRouter.post("/Rentals/:id/return", postRentalsById)
rentalsRouter.delete("/Rentals/:id", deleteRentals)

export default rentalsRouter