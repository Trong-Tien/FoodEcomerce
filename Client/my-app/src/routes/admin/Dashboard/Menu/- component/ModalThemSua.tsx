import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Grid, TextField } from '@mui/material';
import { TypeAction } from '@/Until/Constant';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { addMenuSchema, type AddMenu, type MenuForm } from '@/Type/Addmenu';

type props = {
    openModal: boolean;
    type: string;
    initialValues?: AddMenu;
    handleClose: () => void
}
const ModalThemSua: React.FC<props> = ({ openModal, type, handleClose, initialValues }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MenuForm>({
        defaultValues: initialValues ?? {
            name: "",
            url: "",
            icon: "",
            orderNumber: 0,
        },
        resolver: yupResolver(addMenuSchema),
    });

    return (
        <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth={'sm'}>
            <DialogTitle>
                {type === "INSERT" ? "Thêm mới menu" : "Chỉnh sửa menu"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Grid container spacing={2}>
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
                            <TextField
                                label="Số thứ tự"
                                type="number"
                                {...register("orderNumber")}
                                error={!!errors.orderNumber}
                                helperText={errors.orderNumber?.message}
                                fullWidth
                            />
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
        </Dialog>
    )
}

export default ModalThemSua
