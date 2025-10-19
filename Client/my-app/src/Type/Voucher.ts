export type Voucher= {
    id :number,
    code : string,
    name : string ,
    description : string,
    discountType : string,
    discountValue : number,
    minOrderAmount : number,
    maxDiscountAmount : number,
    startDate : Date,
    endTime : Date,
    usageLimit : number,
    usedCount:  number,
    isActive : boolean,
    imageUrl : string
}