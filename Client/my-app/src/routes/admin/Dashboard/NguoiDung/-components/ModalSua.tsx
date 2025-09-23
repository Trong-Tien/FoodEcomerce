import { useUpdateUser } from '@/Hooks/User';
import type { UpdateUser } from '@/Type/UpdateUser';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';

import Swal from 'sweetalert2'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Button, FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import { useGetLoaiTaiKhoan } from '@/Hooks/LoaiTaiKhoan';
import type { LoaiTaiKhoan } from '@/Type/LoaiTaiKhoan';
type props = {
    openModal: boolean;
    initialValues?: UpdateUser;
    handleClose: () => void
}
const ModalSua: React.FC<props> = ({ openModal, handleClose, initialValues }) => {
    const updateUser = useUpdateUser()
    const { data: dataLoaiTaiKhoan } = useGetLoaiTaiKhoan(1, 10)
    const role: LoaiTaiKhoan[] = dataLoaiTaiKhoan?.items ?? []
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<UpdateUser>({
        defaultValues: initialValues
        //  resolver: yupResolver(addMenuSchema),
    });
    const onSubmit = async (data: UpdateUser) => {
        if (!initialValues?.id) return;
        
        const response = await updateUser.mutateAsync(
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
                Chỉnh sửa thông tin người dùng
            </DialogTitle>
            <form id="subscription-form" onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>

                    {/* Grid để layout form */}
                    <Grid container spacing={2} mt={1}>
                        <Grid size={12}>
                            <TextField
                                label="Email"
                                type="text"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                fullWidth
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                label="Địa chỉ"
                                {...register("address")}
                                error={!!errors.address}
                                helperText={errors.address?.message}
                                fullWidth
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                label="Số điện thoại"
                                {...register("phoneNumber")}
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber?.message}
                                fullWidth
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                label="Tài khoản"
                                {...register("userName")}
                                error={!!errors.userName}
                                helperText={errors.userName?.message}
                                fullWidth
                            />
                        </Grid>
                          <Grid size={12}>
                            <TextField
                                label="Mật khẩu"
                                {...register("password")}
                                // error={!!errors.userName}
                                // helperText={errors.userName?.message}
                                disabled
                                type='password'
                                fullWidth
                            />
                        </Grid>


                        <Grid size={12}>
                            <Controller
                                name="roleId"
                                control={control}
                                rules={{ required: "Vui lòng chọn loại tài khoản" }}
                                render={({ field, fieldState }) => (
                                    <Autocomplete
                                        options={role}
                                        getOptionLabel={(option) => option.name || ""}
                                        value={role.find((r) => r.id === field.value) || null}
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

                        <Grid size={12}>
                            <FormControlLabel control={<Switch  {...register("active")} />} label="Kích hoạt tài khoản" />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="contained" color="info" type="submit" form="subscription-form">
                        Lưu
                    </Button>
                </DialogActions>
            </form>

        </Dialog>
    )
}

export default ModalSua
