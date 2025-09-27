import { useCreateUnitCaculate, useGetByParent } from '@/Hooks/UnitCaculate';
import { addUnitCaculateSchema, type AddUnitCacaulate, type validateUnitCaculate } from '@/Type/AddUnitCaculate';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
type props = {
    openModal: boolean;
    initialValues?: AddUnitCacaulate;
    handleClose: () => void
}
const ModalAdd: React.FC<props> = ({ openModal, handleClose, initialValues }) => {
    const createUnitCaculate = useCreateUnitCaculate()
    const { data: dataUnitCaculateParent } = useGetByParent()

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<validateUnitCaculate>({
        defaultValues: initialValues ?? {
            name: "",
            code: "",
            conservationRate: 0,
            description: "",
            baseUnitId : ""
        },
        resolver: yupResolver(addUnitCaculateSchema),
    });
    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    const onSubmit = async (data: validateUnitCaculate) => {
        const tempData: AddUnitCacaulate = {
            id: uuidv4(),
            code: data.code,
            name: data.name,
            conservationRate: data.conservationRate,
            description: data.description,
            baseUnitId: data.baseUnitId && data.baseUnitId !== "" ? data.baseUnitId : "00000000-0000-0000-0000-000000000000",
            isBaseUnit: false
        }
        const response = await createUnitCaculate.mutateAsync(tempData)
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

    return (
        <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth={'sm'}>
            <DialogTitle>
                Thêm mới đơn vị tính
            </DialogTitle>
            <form id="subscription-form" onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>


                    {/* Grid để layout form */}
                    <Grid container spacing={2} mt={1}>
                        <Grid size={12}>
                            <TextField
                                label="Tên đơn vị"
                                type="text"
                                {...register("name")}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                fullWidth
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                label="Ký hiệu"
                                {...register("code")}
                                error={!!errors.code}
                                helperText={errors.code?.message}
                                fullWidth
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                label="Tỉ lệ chuyển đổi"
                                {...register("conservationRate")}
                                error={!!errors.conservationRate}
                                helperText={errors.conservationRate?.message}
                                fullWidth
                            />
                        </Grid>

                        <Grid size={12}>
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
                                name="baseUnitId"
                                control={control}
                                rules={{ required: "Vui lòng chọn đơn vị cha" }}
                                render={({ field, fieldState }) => (
                                    <Autocomplete
                                        options={dataUnitCaculateParent ?? []}
                                        getOptionLabel={(option) => option.name || ""}
                                        value={dataUnitCaculateParent?.find((r) => r.id === field.value) ?? null}
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

export default ModalAdd
