export type Order ={
  id: string;
  userName : string,
  orderCode : string,
  phoneNumber : string,
  orderDate: string;
  shippingAddress: string;
  totalPrice: number;
  shippingFee: number;
  note?: string;
  statusId: number;
  paymentMenthodId: number;
  orderDetails?: string;
}