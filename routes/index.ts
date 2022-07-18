import { Express } from "express"
import demoRouter from "./demo"
import newebpayRouter from "./newebpay"


export const routerList = (app:Express) => {
    app.use("/demo", demoRouter)
    app.use("/newebpay", newebpayRouter)
}