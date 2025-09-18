import { useCreateCategory } from '@/Hooks/Category';
import { addCategorySchema, type AddCategory } from '@/Type/AddCategory';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Button, Grid, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from "yup";
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid';
import type { ResponseType } from '@/Type/ResponseType';
type props = {
    openModal: boolean;
    initialValues?: AddCategory;
    handleClose: () => void
}
const ModalThem: React.FC<props> = ({ openModal, initialValues, handleClose }) => {
    const createCategory = useCreateCategory()


    const categoryValidate = yup.object<AddCategory>({
        name: yup.string().required("Tên danh mục là bắt buộc"),
        description: yup.string().required("Vui lòng nhập mô tả "),
    })

    type CategoryForm = yup.InferType<typeof categoryValidate>

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AddCategory>({
        defaultValues: initialValues ?? {
            name: "",
            description: ""
        },
        //resolver: yupResolver(categoryValidate),
    });

    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    const onSubmit = async (data: AddCategory) => {
        var tempData : AddCategory={
            id : uuidv4(),
            categoryParentId : data.categoryParentId == undefined ? null : data.categoryParentId,
            description : data.description,
            imageUrl : data.imageUrl ,
            name : data.name
        }
        var response: ResponseType = await createCategory.mutateAsync(tempData)
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
                Thêm mới menu
            </DialogTitle>
            <form id='subscription-form' onSubmit={handleSubmit(onSubmit)}  >
                <DialogContent>
                    <DialogContentText>

                        <Grid container spacing={2}>
                            <Grid size={12} margin={1}>
                                <TextField
                                    label="Tên danh mục"
                                    {...register("name")}
                                    error={!!errors.name}
                                    helperText={"Tên danh mục không được để trống"}
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={12} margin={1}>
                                <TextField
                                    label="Mô tả"
                                    {...register("description")}
                                    error={!!errors.description}
                                    helperText={"Dữ liệu không được để trống"}
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
                                    // 👇 cần custom onChange để lấy file
                                    {...register("imageUrl", {
                                        onChange: (e) => e.target.files?.[0],
                                    })}
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
            </form>

        </Dialog>
    )
}

export default ModalThem
