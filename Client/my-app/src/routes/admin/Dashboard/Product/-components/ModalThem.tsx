import { useCreateProduct } from "@/Hooks/Product";
import { addProductSchema, type AddProduct } from "@/Type/AddProduct";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { useGetUnitCaculate } from "@/Hooks/UnitCaculate";
import type { UnitCacaulate } from "@/Type/UnitCaculate";
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
  const unitCaculate : UnitCacaulate[] = dataUnitCaculate?.items ?? []
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
    },
    resolver: yupResolver(addProductSchema),
  });
  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth={"md"}>
      <DialogTitle>Thêm mới sản phẩm</DialogTitle>
      <form id="subscription-form">
        <DialogContent>
          {/* Grid để layout form */}
          <Grid container spacing={2} mt={1}>
            <Grid size={6}>
              <TextField
                label="mã sản phẩm"
                type="text"
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
              <p>Mô tả sản phẩm</p>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <CKEditor
                    {...register("description")}
                    editor={ClassicEditor}
                    data={field.value}
                    onChange={(_: Event, editor: ClassicEditor) =>
                      field.onChange(editor.getData())
                    }
                  />
                )}
              />
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
                label="Giảm giá"
                type="number"
                {...register("discount")}
                fullWidth
              />
            </Grid>

            <Grid size={6}>
              <Controller
                name="unitCaculateId"
                control={control}
                rules={{ required: "Vui lòng chọn đơn vị cha" }}
                render={({ field, fieldState }) => (
                  <Autocomplete
                    options={unitCaculate ?? []}
                    getOptionLabel={(option) => option.name || ""}
                    value={
                      unitCaculate?.find(
                        (r) => r.id == field.value
                      ) ?? null
                    }
                    onChange={(_, value) =>
                      field.onChange(value ? value.id : null)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Đơn vị tính"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>
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
  );
};

export default ModalThem;
