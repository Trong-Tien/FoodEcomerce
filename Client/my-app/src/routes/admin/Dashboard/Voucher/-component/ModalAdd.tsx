import { useCreateVoucher } from '@/Hooks/Voucher';
import type { AddVoucher } from '@/Type/AddVoucher';
import React, { useEffect } from 'react'
import dayjs from "dayjs";
import { Controller, useForm } from 'react-hook-form';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Button, FormControlLabel, Grid, Switch, TextField, Typography } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import type { ResponseType } from '@/Type/ResponseType';
import Swal from 'sweetalert2'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
type props = {
  openModal: boolean;
  initialValues?: AddVoucher;
  handleClose: () => void;
};
const ModalAdd: React.FC<props> = ({ openModal,
  initialValues,
  handleClose, }) => {
  const createVoucher = useCreateVoucher();
  const disCountType = ["Giảm giá theo %", "Giảm giá theo đơn hàng", "Giảm giá theo sản phẩm","Giảm giá phí ship"]
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AddVoucher>({
    defaultValues: initialValues ?? {
      name: "",
      code: "",
      description: "",
      discountType: "",
      discountValue: 0,
      endTime: new Date(),
      startDate: new Date(),
      maxDiscountAmount: 0,
      isActive: false,
      minOrderAmount: 0,
      usageLimit: 0,
      imageUrl: undefined,
    },
  });
  const generateVoucherCode = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const datePart = `${month}${day}`;

    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();

    return datePart + randomPart;
  };

  const onSubmit = async (data: AddVoucher) => {
    const tempdata = {
      code: generateVoucherCode(),
      name: data.name,
      description: data.description,
      discountType: data.discountType,
      discountValue: data.discountValue,
      minOrderAmount: data.minOrderAmount,
      maxDiscountAmount: data.maxDiscountAmount,
      startDate: new Date(data.startDate),
      endTime: new Date(data.endTime),
      usageLimit: data.usageLimit,
      imageUrl: data.imageUrl,
      isActive: data.isActive
    }
    const response: ResponseType = await createVoucher.mutateAsync(tempdata)
    if (response?.status === 200) {
      Swal.fire({
        title: "Thêm mới dữ liệu thành công",
        icon: "success"
      });
      reset()
      handleClose()
    } else {
      Swal.fire({
        title: "Đã có lỗi xảy ra vui lòng kiểm tra lại hệ thống",
        icon: "error"
      });
    }

  }

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);
  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth={"sm"}>
      <DialogTitle>Thêm mới voucher</DialogTitle>
      <form id="subscription-form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
              <Grid size={12} >
                <TextField
                  label="Tên voucher"
                  {...register("name")}
                  error={!!errors.name}
                  fullWidth
                />
              </Grid>
              <Grid size={12}>
                <Typography variant="subtitle2" gutterBottom>Mô tả</Typography>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <CKEditor
                      editor={ClassicEditor}
                      data={field.value}
                      onChange={(_, editor) => field.onChange(editor.getData())}
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="discountType"
                  control={control}
                  rules={{ required: "Vui lòng chọn loại voucher" }}
                  render={({ field, fieldState }) => (
                    <Autocomplete
                      options={disCountType}
                      getOptionLabel={(option) => option}
                      value={field.value || ""}
                      onChange={(_, value) => field.onChange(value || "")}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Loại voucher"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid size={6} >
                <TextField
                  label="Giá trị giảm"
                  {...register("discountValue")}
                  error={!!errors.discountValue}
                  fullWidth
                  type='number'
                />
              </Grid>
               <Grid size={6} >
                <TextField
                  label="Giá trị đơn hàng tối thiểu áp dụng"
                  {...register("minOrderAmount")}
                  error={!!errors.minOrderAmount}
                  fullWidth
                  type='number'
                />
              </Grid>
              <Grid size={6} >
                <TextField
                  label="Giới hạn giảm tối đa"
                  {...register("maxDiscountAmount")}
                  error={!!errors.maxDiscountAmount}
                  fullWidth
                  type='number'
                />
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Ngày bắt đầu"
                      value={field.value || null}
                      onChange={field.onChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.startDate,
                          helperText: errors.startDate?.message,
                        },
                      }}
                    />
                  )}
                />

                <Controller
                  name="endTime"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Ngày kết thúc"
                      value={field.value || null}
                      onChange={field.onChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.endTime,
                          helperText: errors.endTime?.message,
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>



              <Grid size={6} >
                <TextField
                  label="Số lượng voucher phát hành"
                  {...register("usageLimit")}
                  error={!!errors.usageLimit}
                  fullWidth
                  type='number'
                />
              </Grid>

              <Grid size={12}>
                <FormControlLabel
                  control={<Switch {...register("isActive")} />}
                  label="Kích hoạt voucher"
                />
              </Grid>

              <Grid size={12} margin={1}>
                <TextField
                  type="file"
                  fullWidth
                  variant="outlined"
                  inputProps={{ accept: ".jpg,.png,.pdf" }}
                  error={!!errors.imageUrl}
                  helperText={errors.imageUrl?.message}
                  {...register("imageUrl", {
                    onChange: (e) => e.target.files?.[0],
                  })}
                />
              </Grid>

            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="info"
            type="submit"
            form="subscription-form"
          >
            Lưu
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ModalAdd
