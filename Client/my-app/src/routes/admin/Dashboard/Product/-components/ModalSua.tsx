import { useGetCategoryByChild } from '@/Hooks/Category';
import {  useFiles } from '@/Hooks/File';
import { useGetPlaceOfProduct } from '@/Hooks/PlaceOfProduct';
import { useGetTradeMark } from '@/Hooks/TradeMark';
import { useGetUnitCaculate } from '@/Hooks/UnitCaculate';
import type { UpdateProduct } from '@/Type/UpdateProduct';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, Button, Grid,TextField } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useGetProductCategory, useGetProductImage, UseUpdateProduct } from '@/Hooks/Product';
import Swal from "sweetalert2";
import type { ResponseType } from '@/Type/ResponseType';
import type { UnitCacaulate } from '@/Type/UnitCaculate';
import type { TradeMark } from '@/Type/Trademark';
import type { PlaceOfProduct } from '@/Type/PlaceOfProduct';
import type { Category } from '@/Type/Category';
type Props = {
    openModal: boolean;
    initialValues?: UpdateProduct;
    handleClose: () => void;
};
type productImage = {
    id: string,
    imageUrl: string,
    productId: string,
};
type productCategory = {
    id: string,
    name: string
}
import { Box, Card, CardContent, Typography } from "@mui/material";
const ModalSua: React.FC<Props> = ({ openModal, handleClose, initialValues }) => {
    const updateProduct = UseUpdateProduct();
    const { data: dataUnitCaculate } = useGetUnitCaculate(1, 10);
    const { data: dataTradeMark } = useGetTradeMark(1, 10);
    const { data: dataPlaceOfProduct } = useGetPlaceOfProduct(1, 10);
    const { data: dataCategory } = useGetCategoryByChild();
    const { data: dataImage } = useGetProductImage(initialValues?.id ?? "");
    const { data: productCategory } = useGetProductCategory(initialValues?.id ?? "")
    const unitCaculate: UnitCacaulate[] = dataUnitCaculate?.items ?? []
    const tradeMarkData: TradeMark[] = dataTradeMark?.items ?? []
    const placeProduct: PlaceOfProduct[] = dataPlaceOfProduct?.items ?? []
    const category: Category[] = dataCategory ?? [];
    const data: productImage[] = dataImage ?? [];
    const dataProductCategory: productCategory[] = productCategory ?? [];
    const [previews, setPreviews] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<UpdateProduct>({
        defaultValues: initialValues,
    });

    const paths = data?.map((item) => item.imageUrl.toString()) ?? [];
    const fileQueries = useFiles(paths);

    const onSubmit = async (data: UpdateProduct) => {
        if (!initialValues?.id) return;
        var tempdata = {
            id: initialValues?.id,
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
            imageUrl: data.imageUrl ,
            isActive: data.isActive
        }

        const response: ResponseType = await updateProduct.mutateAsync(tempdata);

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
    const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>, onChange: (value: File[]) => void) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            onChange(files);

            const urls = files.map(file => URL.createObjectURL(file));
            setPreviews(urls);

            return () => urls.forEach(url => URL.revokeObjectURL(url));
        }
    };

    useEffect(() => {
        if (initialValues) {
            reset({
                ...initialValues,
                categoryId: dataProductCategory.map((c) => c.id), 
            });
        }
    }, [initialValues, dataProductCategory, reset]);


    const handleCloseWithFunction = () => {
        handleClose()
        initialValues
        //setPreviews([])
    }
    return (
        <Dialog open={openModal} onClose={handleCloseWithFunction} fullWidth maxWidth="md">
            <DialogTitle>Cập nhật sản phẩm</DialogTitle>
            <form id="subscription-form" onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={3}>
                        {/* --- Thông tin cơ bản --- */}
                        <Grid size={12}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Thông tin cơ bản
                                    </Typography>
                                    <Grid container spacing={2}>
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
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Mô tả sản phẩm
                                            </Typography>
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
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* --- Giá & Số lượng --- */}
                        <Grid size={12}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Giá & Tồn kho
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid size={6}>
                                            <TextField
                                                label="Đơn giá"
                                                type="number"
                                                {...register("unitPrice")}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid size={6}>
                                            <TextField
                                                label="Số lượng"
                                                type="number"
                                                {...register("quantityInStock")}
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
                                                label="Số lượng tồn"
                                                type="number"
                                                {...register("inventory")}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* --- Danh mục, thương hiệu, xuất xứ --- */}
                        <Grid size={12}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Phân loại & Thương hiệu
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid size={12}>
                                            {/* Category */}
                                            <Controller
                                                name="categoryId"
                                                control={control}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        multiple
                                                        options={category}
                                                        getOptionLabel={(o) => o.name || ""}
                                                        value={category.filter((r) => (field.value ?? []).includes(r.id))}
                                                        onChange={(_, v) => field.onChange(v.map((x) => x.id))}
                                                        renderInput={(params) => <TextField {...params} label="Loại sản phẩm" />}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={6}>
                                            {/* Unit Caculate */}
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
                                            {/* Trademark */}
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
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* --- Hình ảnh sản phẩm --- */}
                        <Grid size={12}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Hình ảnh
                                    </Typography>

                                    {fileQueries.map((q, index) => (
                                        <div key={index}>
                                            {q.data && (
                                                <img
                                                    src={q.data}
                                                    alt={`image-${index}`}
                                                    style={{ width: 100, height: 100, objectFit: "cover" }}
                                                />
                                            )}
                                        </div>
                                    ))}

                                </CardContent>
                            </Card>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Hình ảnh sản phẩm
                                    </Typography>
                                    <Controller
                                        name="imageUrl"
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={(e) => handleFilesChange(e, field.onChange)}
                                                />
                                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                                                    {previews.map((src, i) => (
                                                        <Box
                                                            key={i}
                                                            component="img"
                                                            src={src}
                                                            alt={`preview-${i}`}
                                                            sx={{
                                                                width: 120,
                                                                height: 120,
                                                                objectFit: "cover",
                                                                borderRadius: 2,
                                                                boxShadow: 1,
                                                            }}
                                                        />
                                                    ))}
                                                </Box>
                                            </>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" color="error" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                        Lưu thay đổi
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default ModalSua
