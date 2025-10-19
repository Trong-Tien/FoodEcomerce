import { useCreateProduct } from "@/Hooks/Product";
import { addProductSchema, type AddProduct } from "@/Type/AddProduct";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Autocomplete, Button, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { useGetUnitCaculate } from "@/Hooks/UnitCaculate";
import type { UnitCacaulate } from "@/Type/UnitCaculate";
import { useGetTradeMark } from "@/Hooks/TradeMark";
import type { TradeMark } from "@/Type/Trademark";
import { useGetPlaceOfProduct } from "@/Hooks/PlaceOfProduct";
import type { PlaceOfProduct } from "@/Type/PlaceOfProduct";
import { useGetCategoryByChild } from "@/Hooks/Category";
import type { Category } from "@/Type/Category";
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'
import type { ResponseType } from "@/Type/ResponseType";
  import { Typography, Divider } from "@mui/material";
type props = {
  openModal: boolean;
  initialValues?: AddProduct;
  handleClose: () => void;
};
const ModalThem: React.FC<props> = ({
  openModal,
  initialValues,
  handleClose,
}) => {
  const createProduct = useCreateProduct();
  const { data: dataUnitCaculate } = useGetUnitCaculate(1, 10);
  const { data: dataTradeMark } = useGetTradeMark(1, 10);
  const { data: dataPlaceOfProduct } = useGetPlaceOfProduct(1, 10);
  const { data: dataCategory } = useGetCategoryByChild()
  const [previews, setPreviews] = useState<string[]>([]);
  const unitCaculate: UnitCacaulate[] = dataUnitCaculate?.items ?? []
  const tradeMarkData: TradeMark[] = dataTradeMark?.items ?? []
  const placeProduct: PlaceOfProduct[] = dataPlaceOfProduct?.items ?? []
  const category: Category[] = dataCategory ?? []
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AddProduct>({
    defaultValues: initialValues ?? {
      name: "",
      categoryId: [],
      description: "",
      discount: 0,
      expiry: "",
      isActive: false,
      imageUrl: [],
      managementCode: "",
      placeProductId: "",
      preserve: "",
      quantityInStock: 0,
      tradeMarkId: "",
      unitCaculateId: "",
      unitPrice: 0,
      inventory: 0
    },
    resolver: yupResolver(addProductSchema),
  });

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>, onChange: (value: File[]) => void) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      onChange(files);

      const urls = files.map(file => URL.createObjectURL(file));
      setPreviews(urls);

      return () => urls.forEach(url => URL.revokeObjectURL(url));
    }
  };

  const handleCloseWithFunction = () => {
    handleClose()
    initialValues
    setPreviews([])
  }

  const onSubmit = async (data: AddProduct) => {
    const tempdata = {
      id: uuidv4(),
      name: data.name,
      managementCode: data.managementCode,
      description: data.description,
      unitPrice: data.unitPrice,
      quantityInStock: data.quantityInStock,
      discount: data.discount,
      unitCaculateId: data.unitCaculateId,
      tradeMarkId: data.tradeMarkId,
      placeProductId: data.placeProductId,
      expiry: data.expiry,
      preserve: data.preserve,
      inventory: data.inventory,
      categoryId: data.categoryId,
      imageUrl: data.imageUrl,
      isActive: data.isActive
    }
    const response: ResponseType = await createProduct.mutateAsync(tempdata)
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
  <Dialog
    open={openModal}
    onClose={handleCloseWithFunction}
    fullWidth
    maxWidth="md"
  >
    <DialogTitle>{initialValues ? "Sửa sản phẩm" : "Thêm mới sản phẩm"}</DialogTitle>

    <form id="subscription-form" onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="subtitle1" fontWeight="bold">Thông tin cơ bản</Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Mã sản phẩm"
              {...register("managementCode")}
              error={!!errors.managementCode}
              helperText={errors.managementCode?.message}
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Tên sản phẩm"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
          </Grid>

          <Grid size={12}>
            <Typography variant="subtitle2" gutterBottom>Mô tả sản phẩm</Typography>
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

          <Grid size={12} mt={2}>
            <Typography variant="subtitle1" fontWeight="bold">Chi tiết sản phẩm</Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Đơn giá"
              type="number"
              {...register("unitPrice")}
              error={!!errors.unitPrice}
              helperText={errors.unitPrice?.message}
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Số lượng"
              type="number"
              {...register("quantityInStock")}
              error={!!errors.quantityInStock}
              helperText={errors.quantityInStock?.message}
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Giảm giá (%)"
              type="number"
              {...register("discount")}
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Tồn kho"
              type="number"
              {...register("inventory")}
              fullWidth
            />
          </Grid>

          <Grid size={6}>
            {/* Category */}
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: "Vui lòng chọn loại sản phẩm" }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  multiple
                  options={category}
                  getOptionLabel={(option) => option.name || ""}
                  value={category.filter((r) => (field.value ?? []).includes(r.id))}
                  onChange={(_, value) => field.onChange(value.map((v) => v.id))}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Loại sản phẩm"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid size={6}>
            {/* Unit */}
            <Controller
              name="unitCaculateId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={unitCaculate}
                  getOptionLabel={(o) => o.name || ""}
                  value={unitCaculate.find((r) => r.id === field.value) ?? null}
                  onChange={(_, v) => field.onChange(v ? v.id : null)}
                  renderInput={(params) => <TextField {...params} label="Đơn vị tính" />}
                />
              )}
            />
          </Grid>

          <Grid size={6}>
            {/* TradeMark */}
            <Controller
              name="tradeMarkId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={tradeMarkData}
                  getOptionLabel={(o) => o.name || ""}
                  value={tradeMarkData.find((r) => r.id === field.value) ?? null}
                  onChange={(_, v) => field.onChange(v ? v.id : null)}
                  renderInput={(params) => <TextField {...params} label="Thương hiệu" />}
                />
              )}
            />
          </Grid>

          <Grid size={6}>
            {/* Place */}
            <Controller
              name="placeProductId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={placeProduct}
                  getOptionLabel={(o) => o.name || ""}
                  value={placeProduct.find((r) => r.id === field.value) ?? null}
                  onChange={(_, v) => field.onChange(v ? v.id : null)}
                  renderInput={(params) => <TextField {...params} label="Xuất xứ" />}
                />
              )}
            />
          </Grid>

          <Grid size={6}>
            <TextField label="Hạn sử dụng" {...register("expiry")} fullWidth />
          </Grid>
          <Grid size={6}>
            <TextField label="Cách bảo quản" {...register("preserve")} fullWidth />
          </Grid>


          <Grid size={12} mt={2}>
            <Typography variant="subtitle1" fontWeight="bold">Hình ảnh sản phẩm</Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid size={12}>
            <Controller
              name="imageUrl"
              control={control}
              rules={{ required: "Vui lòng chọn ít nhất 1 hình ảnh" }}
              render={({ field, fieldState }) => (
                <>
                  <Button variant="outlined" component="label">
                    Chọn ảnh
                    <input
                      hidden
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFilesChange(e, field.onChange)}
                    />
                  </Button>
                  {fieldState.error && (
                    <Typography color="error" variant="caption" display="block">
                      {fieldState.error.message}
                    </Typography>
                  )}
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginTop: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {previews.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`preview-${idx}`}
                        width={120}
                        height={120}
                        style={{
                          borderRadius: "8px",
                          objectFit: "cover",
                          border: "1px solid #ccc",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            />
          </Grid>


          <Grid size={12}>
            <FormControlLabel
              control={<Switch {...register("isActive")} />}
              label="Kích hoạt sản phẩm"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Lưu
        </Button>
      </DialogActions>
    </form>
  </Dialog>
);
};

export default ModalThem;
