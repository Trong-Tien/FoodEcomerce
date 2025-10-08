import * as yup from "yup";

export const addPannerSchema = yup.object({
  name: yup.string().required("Vui lòng không để trống dữ liệu này"),
  imageUrl: yup.mixed<File>(), // optional
  active: yup.boolean().default(false),
});

export type AddPanner = yup.InferType<typeof addPannerSchema>;