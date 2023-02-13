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

    if(daysRented < 1) res.sendStatus(400);

    try {
        const ValidationCustomer = await db.query(`SELECT * FROM customers WHERE id=$1`, [customerId]);
        if (ValidationCustomer.rows.length < 1) return res.sendStatus(400);
        const gameInfo = await db.query("SELECT * FROM games WHERE id=$1", [gameId]);
        if (gameInfo.rows.length < 1) return res.sendStatus(400);
        const checkRentals = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1`, [gameId]);
        if(checkRentals.rows.length >= gameInfo.rows[0].stockTotal) return res.sendStatus(400);
        const price = gameInfo.rows[0].pricePerDay * daysRented;
        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)`, [customerId, gameId, Today, daysRented, null, price, null]);
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const postRentalsById = async (req, res) => {
    const { id } = req.params
    const today = dayjs().format('YYYY-MM-DD')
    let delayfree = 0

    try {
        const rentals = await db.query(`SELECT * FROM rentals WHERE id = $1`, [Number(id)]);
        if(rentals.rows.length == 0) {
            return res.sendStatus(404)
        }
        const {rentDate, daysRented, returnDate, price} = getGame.rows[0]
        if(returnDate != null) return res.sendStatus(400)
        const rentesTime = dayjs().diff(rentDate, 'day')
        if (rentesTime > daysRented) delayfree = rentesTime - daysRented;

        await db.query(`
          UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3 `,
          [today, delayfree * price, id]
        );
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const deleteRentals = async (req, res) => {
    const { id } = req.params

    try {
        const rentals = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
    
        if (rentals.rows.length < 1) return res.sendStatus(404);
    
        if (rentals.rows[0] == null) return res.sendStatus(400);
    
        await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);
    
        res.sendStatus(200);
      } catch (error) {
        res.status(500).send(error.message);
      }
};