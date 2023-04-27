import { Router } from "express"
const router = Router()
import db from "../databases/connection.js"

router.get("/dinos", async (req, res) => {
    res.send({ data: await db.all("SELECT * FROM dinosaurs;") })
})

router.post("/dinos/:id/vote", async (req, res) => {
    await db.run("UPDATE dinosaurs SET votes = votes + 1 WHERE id = ?", [req.params.id])
    res.send(`voted for dino ${req.params.id}`)
})

export default router