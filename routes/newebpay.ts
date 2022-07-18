import express from "express"
import { newebpayController } from "../controller/newebpay"

const router = express.Router()

router.get("/order/:id", (req, res, next)=>{
    newebpayController.checkOrder(req, res, next)
})

export default router