import type { LoaiTaiKhoan } from "./LoaiTaiKhoan"
import type { Status } from "./Status"

export type User ={
    id : string,
    userName : string , 
    phoneNumber : string,
    email : string ,
    address : string ,
    active : boolean,
    status : Status
    role : LoaiTaiKhoan
}