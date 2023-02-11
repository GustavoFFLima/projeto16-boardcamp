import { db } from "../config/database.js"
import { customersSchema } from "../model/CustomersSchema.js"

export const getCustomers = async (req, res) => {
    try {
        const customers = await db.query("SELECT * FROM customers");
        res.status(201).send(customers.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const getCustomersById = async (req, res) => {
    const { id } = req.params

    try {
        const customers = await db.query(`SELECT * FROM customers WHERE id = $1`, [Number(id)]);
        if(customers.rowCount == 0) {
            return res.sendStatus(400)
        }
        res.send(customers.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const postCustomers = async (req, res) => {
    const { name, phone, cpf, birthday } = req.body;

    try {
      await db.query(` INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [ name, phone, cpf, birthday ]);
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const updateCustomers = async (req, res) => {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params

    try {
      await db.query(` UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5` , [ name, phone, cpf, birthday, id ]);
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
};