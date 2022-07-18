/* 藍新金流相關方法*/
import { newebpayOrder }from "../types/newebpay"
import * as crypto from "crypto"
const { MerchantID, HASHKEY, HASHIV, Version, RespondType } = process.env

export const newebpayUtils = {
    genDataChain(order:newebpayOrder){
        const str = `MerchantID=${MerchantID}&RespondType=${RespondType}&TimeStamp=${order.TimeStamp}&Version=${Version}&MerchantOrderNo=${order.MerchantOrderNo}&Amt=${order.Amt}&ItemDesc=${encodeURIComponent(order.ItemDesc)}&Email=${encodeURIComponent(order.Email)}`
        return str
    },
    create_mpg_aes_encrypt(TradeInfo:newebpayOrder) {
        const encrypt = crypto.createCipheriv("aes256", HASHKEY || "", HASHIV || "")
        const enc = encrypt.update(this.genDataChain(TradeInfo), "utf8", "hex")
        return `${enc}${encrypt.final("hex")}`
    },
    create_mpg_sha_encrypt(aesEncrypt:string) {
        const sha = crypto.createHash("sha256")
        const plainText = `HashKey=${HASHKEY}&${aesEncrypt}&HashIV=${HASHIV}`
        return sha.update(plainText).digest("hex").toUpperCase()
    },
    create_mpg_aes_decrypt(TradeInfo:string) {
        const decrypt = crypto.createDecipheriv("aes256", HASHKEY || "", HASHIV || "")
        decrypt.setAutoPadding(false)
        const text = decrypt.update(TradeInfo, "hex", "utf8")
        const plainText = text + decrypt.final("utf8")
        // eslint-disable-next-line no-control-regex
        const result = plainText.replace(/[\x00-\x20]+/g, "")
        return JSON.parse(result)
    }
}