import { useFile } from '@/Hooks/File';
import { useUpdateVoucher } from '@/Hooks/Voucher';
import type { UpdateVoucher } from '@/Type/UpdateVoucher';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { ResponseType } from '@/Type/ResponseType';
import Swal from 'sweetalert2'
type Props = {
  openModal: boolean;
  initialValues?: UpdateVoucher;
  handleClose: () => void;
};
const ModalUpdate: React.FC<Props> = ({ openModal, handleClose, initialValues }) => {
  const update = useUpdateVoucher();
  const disCountType = ["Giảm giá theo %", "Giảm giá theo đơn hàng", "Giảm giá theo sản phẩm", "Giảm giá phí ship"]

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<UpdateVoucher>({
    defaultValues: initialValues,
  });

  const ImagePreview: React.FC<{ path: string }> = ({ path }) => {
    const { data: image, isLoading } = useFile(path);

    if (isLoading) return <span>Đang tải ảnh...</span>;
    if (!image) return <span>Không có ảnh</span>;

    return (
      <img
        src={image}
        alt="Ảnh cũ"
        style={{
          width: 100,
          height: 100,
          objectFit: "cover",
          marginBottom: 8,
        }}
      />
    );
  };

  const onSubmit = async (data: UpdateVoucher) => {
    const tempdata = {
      id: initialValues?.id,
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
    const response: ResponseType = await update.mutateAsync(tempdata)
    if (response?.status === 200) {
      Swal.fire({
        title: "Cập nhật dữ liệu thành công",
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
    if (initialValues) reset(initialValues);
  }, [initialValues, reset]);
  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Chỉnh sửa voucher</DialogTitle>
      <form id="update-category-form" onSubmit={handleSubmit(onSubmit)}>
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
                      value={field.value ? new Date(field.value) : null} 
                      onChange={(date) => field.onChange(date)} 
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
                         value={field.value ? new Date(field.value) : null} 
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

              <Grid size={12} margin={1}>
                {initialValues?.imageUrl && typeof initialValues.imageUrl === "string" && (
                  <ImagePreview path={initialValues.imageUrl} />
                )}
                <input
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue("imageUrl", file, { shouldValidate: true });
                    }
                  }}
                />
                {errors.imageUrl && (
                  <p style={{ color: "red", marginTop: 4 }}>{errors.imageUrl.message as string}</p>
                )}
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
            form="update-category-form"
          >
            Lưu
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ModalUpdate
