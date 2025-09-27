import * as yup from "yup";

export const addProductSchema = yup.object({
  id: yup.string().nullable().default(""),
  name: yup.string().required("Vui lòng không để trống dữ liệu này"),
  managementCode: yup.string().required("Vui lòng không để trống dữ liệu này"),
  description: yup.string().required(),
  unitPrice: yup.number().required(),
  quantityInStock: yup.number().required(),
  discount: yup.number().optional().default(0),
  isActive: yup.boolean().required(),
  expiry: yup.string().optional().default(""),
  preserve: yup.string().optional().default(""),
  unitCaculateId: yup.string().optional().default(""),
  tradeMarkId: yup.string().optional().default(""),
  placeProductId: yup.string().required(),
imageUrl: yup.array().default([]),
categoryId: yup.array().default([]),
});

export type AddProduct = yup.InferType<typeof addProductSchema>;
