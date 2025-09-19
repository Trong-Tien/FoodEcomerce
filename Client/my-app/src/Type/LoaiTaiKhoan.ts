import type { MenuRole } from "./MenuRole"

export type LoaiTaiKhoan  = {
   id : string ,
   orderNumber : number,
   name : string,
   discription :string,
   menuRoles : MenuRole[]
}