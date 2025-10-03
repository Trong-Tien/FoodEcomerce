export type UpdateProduct = {
    id :  string,
    name : string,
    managementCode : string,
    description : string,
    unitPrice : number ,
    quantityInStock : number ,
    discount :number,
    isActive : boolean,
    inventory: number ,
    expiry : string,
    preserve : string,
    unitCaculateId: string ,
    tradeMarkId : string,
    placeProductId : string,
    categoryId : string[]
    imageUrl : File[] | string[],
}