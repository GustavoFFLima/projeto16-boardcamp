import { Router } from "express"
import { validitySchema } from "../middlewares/schemaMiddlewares.js"
import { customersSchema } from "../model/CustomersSchema.js"
import { getCustomers, getCustomersById, postSignUpCustomer, updateCustomers } from "../controller/CustomersController.js"

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", getCustomersById)
customersRouter.post("/customers", validitySchema(customersSchema), postSignUpCustomer)
customersRouter.put("/customers/:id", validitySchema(customersSchema), updateCustomers)

export default customersRouter