import * as yup from "yup";
export type AddCategory = {
    id : string 
    name : string,
    description : string,
    imageUrl : File,
    categoryParentId : string | null
}

export const addCategorySchema = yup.object({
  name: yup.string().required("Tên danh mục không được bỏ trống"),
  description: yup.string().required("Vui lòng nhập mô tả "),
});