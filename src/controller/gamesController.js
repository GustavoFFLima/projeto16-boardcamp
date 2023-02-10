import { db } from "../config/database.js"

export const getGames = async (req, res) => {
    try {
        const games = await db.query("SELECT * FROM games");
        res.status(201).send(games.rows)
        console.log(games)
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const postGames = async (req, res) => {
    const { name, image, stockTotal, pricePerDay } = res.body;

    try {
       await db.query(` INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUE ($!, $2, $3, $4)`, [ name, image, stockTotal, pricePerDay ]);
        res.sendstatus(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
};