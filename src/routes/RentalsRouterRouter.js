import { Router } from "express"
import { getRentals, postRentals, postRentalsById, deleteRentals } from "../controller/RentalsController.js"

const rentalsRouter = Router()

rentalsRouter.get("/Rentals", getRentals)
rentalsRouter.post("/Rentals", postRentals)
rentalsRouter.post("/Rentals/:id/return", postRentalsById)
rentalsRouter.delete("/Rentals/:id", deleteRentals)

export default rentalsRouter