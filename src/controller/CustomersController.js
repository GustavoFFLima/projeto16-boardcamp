import { db } from "../config/database.js"

export const getCustomers = async (req, res) => {
    try {
        const customers = await db.query("SELECT * FROM customers");
        res.status(200).send(customers.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}; 

export const getCustomersById = async (req, res) => {
    const { id } = req.params

    try {
        const customers = await db.query(`SELECT * FROM customers WHERE id = $1`, [Number(id)]);
        if(customers.rowCount == 0) {
            return res.sendStatus(404)
        }
        res.send(customers.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const postSignUpCustomer = async (req, res) => {
    const { name, phone, cpf, birthday } = req.body;

    try {
      const validityCPF = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf])
      if(validityCPF.rows.length > 0) {
        return res.sendStatus(409)
      } 
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
      const checkCpf = await db.query(`SELECT * FROM customers WHERE cpf=$1`,[cpf]);
      const checkId = await db.query(`SELECT * FROM customers WHERE id=$1`,[id])

      if(checkCpf.rows.length > 0 && checkCpf.rows[0].id != id) return res.sendStatus(409);
      if(checkId.rows.length < 1) return res.sendStatus(409);

      await db.query(` UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5` , [ name, phone, cpf, birthday, id ]);
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
};