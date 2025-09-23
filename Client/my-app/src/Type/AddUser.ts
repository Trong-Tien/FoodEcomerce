import * as yup from "yup";
export type AddUser = {
    id : string , 
    email : string , 
    phoneNumber: string,
    userName : string , 
    password : string , 
    address : string ,
    statusId : number, 
    active : boolean,
    roleId : string
}

export const addUserSchema = yup.object({
  email : yup.string().required("Email không được để trống"),
  userName: yup.string().required("Vui lòng không để trống dữ liệu này"),
  password: yup.string().required(),
  address: yup.string().required(),
  phoneNumber : yup.string().required("Vui lòng nhập số điện thoại"),
  roleId : yup.string().required(),
  active : yup.boolean().required()
});

export type validateAddUser = Pick<AddUser,'email'|'userName'|'password'|'address'|'phoneNumber' |'roleId'|'active'>