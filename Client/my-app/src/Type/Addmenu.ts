import * as yup from "yup";
export type AddMenu = {
  name: string,
  orderNumber: number ,
  icon : string ,
  url : string,
  isActive : boolean,
  createUser : string,
  parentId : string
}

export type MenuForm = Pick<AddMenu, "name" | "url" | "icon" | "orderNumber">;

export const addMenuSchema = yup.object({
  name: yup.string().required("Tên menu là bắt buộc"),
  url: yup.string().url("URL không hợp lệ").required("Đường dẫn là bắt buộc"),
  icon: yup.string().required(),
  orderNumber: yup.number().required(),
});