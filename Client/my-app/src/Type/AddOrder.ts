import type { OrdersDetail } from "./OrdersDetail"

export type AddOrder ={
    userId : string  | null,
    voucherId : number | null,
    paymentMenthodId : number,
    note : string , 
    totalPrice : number,
    shippingFee : number,
    shippingAddress: string
    OrdersDetails : OrdersDetail[]
}