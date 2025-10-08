export type Product  ={
    id : string 
    managementCode  : string,
    name : string,
    description : string ,
    unitPrice : number,
    quantityInStock : number,
    discount : number,
    isActive : boolean,
    inventory: number ,
    expiry: string ,
    preserve : string,
    unitCaculateId  : string,
    images :  string,
    tradeMarkId : string,
    placeProductId : string,
}

export type CartItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  images: string;
};