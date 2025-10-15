export type Voucher= {
    code : string,
    name : string ,
    description : string,
    discountType : string,
    discountValue : string,
    minOrderAmount : number,
    maxDiscountAmount : number,
    startDate : Date,
    endTime : Date,
    usageLimit : number,
    usedCount:  number,
    isActive : boolean,
    imageUrl : string
}