import { db } from "../config/database.js"
//import {rentalsSchema } from "../model/RentalsSchema.js"

export const getRentals = async (req, res) => {
    try {
        const rentals = await db.query("SELECT * FROM rentals");
        res.status(201).send(rentals.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const postRentals = async (req, res) => {
    const { customerId, gameId, daysRented } = req.body;

    try {
      await db.query(` INSERT INTO rentals (customerId, gameId, daysRented) VALUES ($1, $2, $3)`, [ customerId, gameId, daysRented ]);
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const postRentalsById = async (req, res) => {
    const { id } = req.params

    try {
        const rentals = await db.query(`SELECT * FROM rentals WHERE id = $1`, [Number(id)]);
        if(rentals.rowCount == 0) {
            return res.sendStatus(400)
        }
        res.send(rentals.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const deleteRentals = async (req, res) => {
    const { id } = req.params

    try {
      await db.query(` DELETE rentals WHERE id = $1`, [ id ]);
        res.sendStatus(201)
    } catch (error) {
        res.status(400).send(error.message)
    }
};