export type UpdateVoucher = {
    id :  number |undefined ,
    name : string,
    description : string,
    discountType : string ,
    discountValue : number ,
    minOrderAmount :number,
    maxDiscountAmount : number,
    startDate: Date ,
    endTime : Date,
    usageLimit : number,
    isActive : boolean
    imageUrl : File | null | string,
}