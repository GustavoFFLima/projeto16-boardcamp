import { db } from "../config/database.js"

export const getGames = async (req, res) => {
    try {
        const games = await db.query("SELECT * FROM games");
        res.send(games.rows)
    } catch (error) {
        res.send(error.message)
    }
};

export const postGames = async (req, res) => {
    const { name, image, stockTotal, pricePerDay } = req.body;
    
    try {
        const equalGame = await db.query(`
            SELECT * FROM games WHERE name = $1`, [name]);

        if (equalGame.rows.length > 0) return res.sendStatus(409)

        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, [ name, image, stockTotal, pricePerDay ]);

        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error.message)
    }
};