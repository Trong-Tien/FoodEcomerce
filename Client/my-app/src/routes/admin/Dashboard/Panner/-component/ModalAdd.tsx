import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import type { ResponseType } from "@/Type/ResponseType";
import { useCreatePanner } from "@/Hooks/Panner";
import { type AddPanner } from "@/Type/AddPanner";
type props = {
  openModal: boolean;
  initialValues?: AddPanner;
  handleClose: () => void;
};
const ModalAdd: React.FC<props> = ({
  openModal,
  initialValues,
  handleClose,
}) => {
  const createPanner = useCreatePanner();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPanner>({
    defaultValues: initialValues ?? {
      name: "",
      active: false,
      imageUrl: undefined,
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const onSubmit = async (data: AddPanner) => {
    const tempData: AddPanner = {
      active: data.active,
      imageUrl: data.imageUrl,
      name: data.name,
    };
    const response: ResponseType = await createPanner.mutateAsync(tempData);
    if (response?.status === 200) {
      Swal.fire({
        title: "Thêm mới dữ liệu thành công",
        icon: "success",
      });
      handleClose();
      reset();
    } else {
      Swal.fire({
        title: "Đã có lỗi xảy ra vui lòng kiểm tra lại hệ thống",
        icon: "error",
      });
    }
  };
  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth={"sm"}>
      <DialogTitle>Thêm mới panner</DialogTitle>
      <form id="subscription-form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
              <Grid size={12} margin={1}>
                <TextField
                  label="Tên Panner"
                  {...register("name")}
                  error={!!errors.name}
                  fullWidth
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
              <Grid size={12}>
                <FormControlLabel
                  control={<Switch {...register("active")} />}
                  label="Kích hoạt panner"
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
  );
};

export default ModalAdd;
