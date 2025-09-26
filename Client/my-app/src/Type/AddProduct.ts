export type AddProduct  ={
    id : string 
    managementCode  : string,
    name : string,
    description : string ,
    unitPrice : number,
    quantityInStock : number,
    discount : number,
    isActive : boolean,
    expiry: string ,
    preserve : string,
    unitCaculateId  : string,
    tradeMarkId : string,
    placeProductId : string,
    imageUrl : File[],
    categoryId : string[]
}