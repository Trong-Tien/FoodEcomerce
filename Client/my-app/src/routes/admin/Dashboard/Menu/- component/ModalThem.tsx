import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { addMenuSchema, type AddMenu, type MenuForm } from '@/Type/Addmenu';
import { useCreateMenu } from '@/Hooks/Menu';
import type { ResponseType } from '@/Type/ResponseType';
import Swal from 'sweetalert2'
type props = {
    openModal: boolean;
    initialValues?: AddMenu;
    handleClose: () => void
}
const ModalThemSua: React.FC<props> = ({ openModal, handleClose, initialValues }) => {
    const createMenu = useCreateMenu()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MenuForm>({
        defaultValues: initialValues ?? {
            name: "",
            url: "",
            icon: "",
            orderNumber: 0,
            isActive: false
        },
        resolver: yupResolver(addMenuSchema),
    });

    const onSubmit = async (data: MenuForm) => {
        var response: ResponseType = await createMenu.mutateAsync(data)
        if (response?.status === 200) {
            Swal.fire({
                title: "Thêm mới dữ liệu thành công",
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Đã có lỗi xảy ra vui lòng kiểm tra lại hệ thống",
                icon: "error"
            });
        }
        handleClose()
        reset()
    }

    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    return (
        <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth={'sm'}>
            <DialogTitle>
              Thêm mới menu
            </DialogTitle>
            <form id='subscription-form' onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <DialogContentText>

                        <Grid container spacing={2}>
                            <Grid size={12} margin={1}>
                                <TextField
                                    label="Số thứ tự"
                                    type="number"
                                    {...register("orderNumber")}
                                    error={!!errors.orderNumber}
                                    helperText={errors.orderNumber?.message}
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={12} margin={1}>
                                <TextField
                                    label="Tên menu"
                                    {...register("name")}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={12} margin={1}>
                                <TextField
                                    label="Đường dẫn"
                                    {...register("url")}
                                    error={!!errors.url}
                                    helperText={errors.url?.message}
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={12} margin={1}>
                                <TextField
                                    label="Icon"
                                    {...register("icon")}
                                    error={!!errors.icon}
                                    helperText={errors.icon?.message}
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={12} margin={1}>
                                <FormControlLabel control={<Switch  {...register("isActive")} />} label="Kích hoạt menu" />
                            </Grid>

                        </Grid>


                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' onClick={handleClose}>Hủy</Button>
                    <Button variant='contained' color='info' type="submit" form="subscription-form">
                        Lưu
                    </Button>
                </DialogActions>
            </form>

        </Dialog>
    )
}

export default ModalThemSua
