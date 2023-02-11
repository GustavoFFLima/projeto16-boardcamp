import { Router } from "express"
import { getCustomers, getCustomersById, postCustomers, updateCustomers } from "../controller/CustomersController.js"

const customersRouter = Router()

customersRouter.get("/Customers", getCustomers)
customersRouter.get("/Customers/:id", getCustomersById)
customersRouter.post("/Customers", postCustomers)
customersRouter.put("/Customers/:id", updateCustomers)

export default customersRouter