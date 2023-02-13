import { db } from "../config/database.js"
import dayjs from "dayjs";

export const getRentals = async (req, res) => {
    try {
        const rentals = await db.query(`SELECT rentals.*,
            JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer,
            JSON_BUILD_OBJECT('id', games.id, 'name', games.name) AS game FROM rentals 
            JOIN customers ON rentals."customerId" = customers.Id 
            JOIN games ON rentals."gameId"=games.id`
        );
        res.send(rentals.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const postRentals = async (req, res) => {
    const { customerId, gameId, daysRented } = req.body;

    try {
      await db.query(` INSERT INTO rentals  
        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
        VALUES ($1, $2, $3::date, $4, $5, $4 * (SELECT games."pricePerDay" as "originalPrice" FROM games WHERE games.id = $2) ,$6)`, 
        [customerId, gameId, dayjs().format("YYYY-MM-DD"), daysRented, null, null]);
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