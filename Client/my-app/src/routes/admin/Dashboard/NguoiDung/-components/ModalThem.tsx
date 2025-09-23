import { useCreateUser } from '@/Hooks/User';
import { addUserSchema, type AddUser, type validateAddUser } from '@/Type/AddUser';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Button, FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import { useGetLoaiTaiKhoan } from '@/Hooks/LoaiTaiKhoan';
import type { LoaiTaiKhoan } from '@/Type/LoaiTaiKhoan';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'
type props = {
    openModal: boolean;
    initialValues?: AddUser;
    handleClose: () => void
}
const ModalThem: React.FC<props> = ({ openModal, handleClose, initialValues }) => {
    const createUser = useCreateUser()
    const { data: dataLoaiTaiKhoan } = useGetLoaiTaiKhoan(1, 10)
    const role: LoaiTaiKhoan[] = dataLoaiTaiKhoan?.items ?? []
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<validateAddUser>({
        defaultValues: initialValues ?? {
            email: "",
            userName: "",
            password: "",
            address: "",
            phoneNumber: "",
            roleId: ""
        },
        resolver: yupResolver(addUserSchema),
    });

    const onSubmit = async (data: validateAddUser) => {
        const tempData: AddUser = {
            id: uuidv4(),
            userName: data.userName,
            email: data.email,
            address: data.address,
            phoneNumber: data.phoneNumber,
            active: data.active,
            roleId: data.roleId,
            password: data.password,
            statusId: 7
        }
        var response = await createUser.mutateAsync(tempData)
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
                Thêm mới tài khoản
            </DialogTitle>
            <form id="subscription-form" onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <DialogContentText>
                        Vui lòng điền thông tin để tạo tài khoản mới
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
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                type="password"
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
                            <FormControlLabel control={<Switch  {...register("active")}/>} label="Kích hoạt tài khoản" />
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

export default ModalThem
