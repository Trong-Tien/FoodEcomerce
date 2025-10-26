import * as yup from "yup";

export const addVoucherSchema = yup.object({
  code: yup.string().optional().default(""),
  name: yup.string().required("Vui lòng không để trống dữ liệu này"),
  description: yup.string().required("Vui lòng không để trống dữ liệu này"),
  discountType: yup.string().required(),
  discountValue: yup.number().required(), // giá trị giảm 
  minOrderAmount: yup.number().required(), // giá trị đơn hàng tối thiểu áp dụng
  maxDiscountAmount: yup.number().optional().default(0), // giới hạn giảm tối đa
  startDate: yup.date().required('Vui lòng chọn ngày bắt đầu'),
  endTime :yup.date().required('Vui lòng chọn ngày kết thúc'),
  usageLimit: yup.number().required(),
  isActive: yup.boolean().required('Active status is required'),
  imageUrl: yup.array().default([]),
});

export type AddVoucher = yup.InferType<typeof addVoucherSchema>;
