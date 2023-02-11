import { db } from "../config/database.js"
import { gamesSchema } from "../model/GamesSchema.js"

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

    const validation = gamesSchema.validate({ pick:  [ name, image, stockTotal, pricePerDay ], abortEarly: false})
    
    if (validation.error) {
        const erros = validation.error.details.map((err) => {
            return err.message
        })
        //return res.status(422).send(erros)
    }

    try {
      await db.query(` INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1, $2, $3, $4)`, [ name, image, stockTotal, pricePerDay ]);
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
};