import { useUpdateMenu } from '@/Hooks/Menu';
import type { ResponseType } from '@/Type/ResponseType';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import type { Menu } from '@/Type/Menu';
type props = {
    openModal: boolean;
    initialValues?: Menu;
    handleClose: () => void
}
const ModalSua: React.FC<props> = ({ openModal, handleClose, initialValues }) => {
    const updateMenu = useUpdateMenu()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Menu>({
        defaultValues: initialValues
        //  resolver: yupResolver(addMenuSchema),
    });

    const onSubmit = async (data: Menu) => {
        if (!initialValues?.id) return;
        const response: ResponseType = await updateMenu.mutateAsync(
           data,
        );

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
    return (
        <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth={'sm'}>
            <DialogTitle>
                Chỉnh sửa menu
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
                                <FormControlLabel control={<Switch  {...register("isActive")} defaultChecked={initialValues?.isActive} />} label="Kích hoạt menu" />
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

export default ModalSua
