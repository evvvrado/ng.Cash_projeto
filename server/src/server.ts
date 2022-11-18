import "express-async-errors"
import express, { NextFunction, Request, response, Response } from "express"
import cors from "cors"
import { router } from "./routes"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/api", async (req, res) => {
	res.status(200).send({
		success: "true",
		message: "Seja bem-vindo(a) a API ng.Cash",
	})
})

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
	return response.status(406).json({
		status: "Error",
		message: error.message,
	})
})

app.use(router)

app.listen(3333, () => console.log("Server is running in http://localhost:3333"))
