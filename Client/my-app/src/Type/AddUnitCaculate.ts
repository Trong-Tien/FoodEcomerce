import * as yup from "yup";
export type AddUnitCacaulate={
    id :string ,
    name :string ,
    code : string , 
    description : string,
    conservationRate : number ,
    isBaseUnit : boolean,
    baseUnitId : string  
}

export const addUnitCaculateSchema = yup.object({
  name : yup.string().required("Vui lòng không để trống dữ liệu này"),
  code: yup.string().required("Vui lòng không để trống dữ liệu này"),
  description: yup.string().required(),
  conservationRate: yup.number().required(),
  baseUnitId : yup.string().optional().default("")
});

export type validateUnitCaculate = yup.InferType<typeof addUnitCaculateSchema>;