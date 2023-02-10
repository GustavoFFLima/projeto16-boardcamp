import { db } from "../config/database.js"

export const getGames = async (req, res) => {
    try {
        const games = await db.query("SELECT * FROM games");
        res.status(201).send(games.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const postGames = async (req, res) => {
    const { name, image, stockTotal, pricePerDay } = req.body;

    console.log(games)
    try {
       const game = await db.query(` INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1, $2, $3, $4)`, [ name, image, stockTotal, pricePerDay ]);
       console.log(game)
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
};