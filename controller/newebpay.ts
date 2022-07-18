/* 藍新金流 */
import { Request, Response, NextFunction } from "express"
import { getHttpResponse, handleErrorAsync } from "../utils/mixinTools"
import { newebpayOrder } from "../types/newebpay"
import { newebpayUtils } from "../utils/newebpay"

export const newebpayController = {
    checkOrder: handleErrorAsync(
        async (req:Request, res:Response, next:NextFunction)=>{
            const { id } = req.params
            const order:newebpayOrder = {
                TimeStamp: "",
                MerchantOrderNo: "",
                Amt: "",
                Email: "",
                ItemDesc: ""
            }
            const aesEncrypt = newebpayUtils.create_mpg_aes_encrypt(order)
            console.log("aesEncrypt:", aesEncrypt)

            const shaEncrypt = newebpayUtils.create_mpg_sha_encrypt(aesEncrypt)
            console.log("shaEncrypt:", shaEncrypt)

            res.status(200).json(getHttpResponse({
                data: {
                    order,
                    aesEncrypt,
                    shaEncrypt,
                }
            }))
        }
    ),
    notifyOrder: handleErrorAsync(
        async (req:Request, res:Response, next:NextFunction)=>{
            console.log("notify order and save into db")
        }
    )
}
