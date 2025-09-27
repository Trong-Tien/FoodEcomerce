import { useGetCategoryByParent, useUpdateCategory } from "@/Hooks/Category";
import type { ResponseType } from "@/Type/ResponseType";
import type { UpdateCategory } from "@/Type/UpdateCategory";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { useFile } from "@/Hooks/File";
import type { Category } from "@/Type/Category";

type Props = {
  openModal: boolean;
  initialValues?: UpdateCategory;
  handleClose: () => void;
};

const ModalSua: React.FC<Props> = ({ openModal, handleClose, initialValues }) => {
  const updateCategory = useUpdateCategory();
  const { data: data } = useGetCategoryByParent()
  const dataCategory: Category[] = data ?? []
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<UpdateCategory>({
    defaultValues: initialValues,
  });

  const onSubmit = async (data: UpdateCategory) => {
    if (!initialValues?.id) return;

    const response: ResponseType = await updateCategory.mutateAsync(data);

    if (response?.status === 200) {
      Swal.fire("Thành công", "Cập nhật dữ liệu thành công", "success");
      handleClose();
    } else {
      Swal.fire("Lỗi", "Đã có lỗi xảy ra", "error");
    }
  };

  useEffect(() => {
    if (initialValues) reset(initialValues);
  }, [initialValues, reset]);

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

  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
      <form id="update-category-form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
              <Grid size={12} margin={1}>
                <TextField
                  label="Tên danh mục"
                  {...register("name", { required: "Tên danh mục không được để trống" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                />
              </Grid>

              <Grid size={12} margin={1}>
                <TextField
                  label="Mô tả"
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  fullWidth
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="categoryParentId"
                  control={control}
                  rules={{ required: "Vui lòng chọn danh mục cha" }}
                  render={({ field, fieldState }) => (
                    <Autocomplete
                      options={dataCategory}
                      getOptionLabel={(option) => option.name || ""}
                      value={dataCategory.find((r) => r.id === field.value) || null}
                      onChange={(_, value) => field.onChange(value ? value.id : null)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Loại tài khoản"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid size={12} margin={1}>
                {/* Preview ảnh cũ */}
                {initialValues?.imageUrl && typeof initialValues.imageUrl === "string" && (
                  <ImagePreview path={initialValues.imageUrl} />
                )}
                {/* Upload ảnh mới */}
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
  );
};

export default ModalSua;
