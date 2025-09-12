import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import type { MenuRole } from '@/Type/MenuRole';
import Swal from 'sweetalert2'
import RadioGroup from '@mui/material/RadioGroup';
import { Button, Checkbox, FormControlLabel, Grid, Stack, Switch, Typography } from '@mui/material';
import { useGetMenus } from '@/Hooks/Menu';
import type { Menu } from '@/Type/Menu';
import { useGetAllMenuByRole } from '@/Hooks/MenuRole';
import type { ResponseType } from '@/Type/ResponseType';
import { usePermissionMenu } from '@/Hooks/LoaiTaiKhoan';
type props = {
    openModal: boolean,
    roleId: string,
    handleClose: () => void,
    initialValues?: MenuRole
}
const ModalPermission: React.FC<props> = ({ openModal, handleClose, initialValues, roleId }) => {
    const { data: dataMenu } = useGetMenus(1, 20)
    const { data: dataMenuRole } = useGetAllMenuByRole(roleId );
    const permissionAction = usePermissionMenu()
    const menuItem: Menu[] = dataMenu?.items ?? []
    const menuRoleData: MenuRole[] = dataMenuRole ?? []
    const [menuRole, setMenuRole] = useState<MenuRole[]>([]);

    useEffect(() => {
        if (menuRoleData.length > 0) {
            setMenuRole(menuRoleData);
        }
    }, [menuRoleData]);

    const {
        handleSubmit,
        formState: { },
    } = useForm<MenuRole>({
        defaultValues: initialValues
        //  resolver: yupResolver(addMenuSchema),
    });

    // keyof Omit Tạo một type mới giống MenuRole, nhưng bỏ đi (omit) hai field menuId và roleId.
    const handlePermissionChange = (
        menuId: string,
        key: keyof Omit<MenuRole, "menuId" | "roleId">,
        checked: boolean
    ) => {
        setMenuRole(prev => {
            const exists = prev.find(m => m.menuId === menuId);

            if (exists) {
                return prev.map(m =>
                    m.menuId === menuId ? { ...m, [key]: checked } : m
                );
            } else {
                return [
                    ...prev,
                    {
                        menuId,
                        roleId,
                        add: false,
                        watch: false,
                        update: false,
                        delete: false,
                        [key]: checked,
                    },
                ];
            }
        });
    };



    const handlePermission = async () => {
        const response: ResponseType = await permissionAction.mutateAsync(menuRole)
        if (response?.status === 200) {
            Swal.fire({
                title: "Phân quyền thành công",
                icon: "success"
            });
            handleClose()
            setMenuRole([])
        }
        else {
            Swal.fire({
                title: "Đã có lỗi xảy ra",
                icon: "error"
            });
        }
    }
    const handleCloseModal = () => {
        handleClose()
        setMenuRole([])
    }
    console.log(menuRole)
    return (
        <div>
            <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth={'sm'}>
                <DialogTitle>
                    Phân quyền truy cập
                </DialogTitle>
                <form id='subscription-form' onSubmit={handleSubmit(handlePermission)}>
                    <DialogContent>
                        <DialogContentText>
                            <Grid container spacing={2}>
                                <Stack direction="row" spacing={2}>
                                    <div style={{ width: "100px" }}>
                                        <Typography variant='h6' fontWeight={"bold"}>
                                            Menu
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant='h6' fontWeight={"bold"}>
                                            Phân quyền
                                        </Typography>
                                    </div>
                                </Stack>
                                <Grid size={12} margin={1} sx={{ maxWidth: "100%" }}>
                                    {menuItem.map(item => {
                                        const role = menuRole?.find(r => r.menuId == item.id)
                                        return (
                                            <Stack direction="row" spacing={2} key={item.id}>
                                                <div style={{ width: "25%" }}>
                                                    <FormControlLabel control={<Checkbox checked={
                                                        !!menuRole.find(
                                                            m => m.menuId === item.id && (m.watch || m.add || m.update || m.delete)
                                                        )
                                                    }
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            const checked = e.target.checked;
                                                            setMenuRole(prev => {
                                                                const exists = prev.find(m => m.menuId === item.id);

                                                                if (checked) {
                                                                    // Nếu check → thêm mới hoặc update
                                                                    if (exists) {
                                                                        return prev.map(m =>
                                                                            m.menuId === item.id
                                                                                ? {
                                                                                    ...m,
                                                                                    watch: true,
                                                                                    add: true,
                                                                                    update: true,
                                                                                    delete: true,
                                                                                }
                                                                                : m
                                                                        );
                                                                    } else {
                                                                        return [
                                                                            ...prev,
                                                                            {
                                                                                menuId: item.id,
                                                                                roleId: roleId,
                                                                                watch: true,
                                                                                add: true,
                                                                                update: true,
                                                                                delete: true,
                                                                            },
                                                                        ];
                                                                    }
                                                                } else {
                                                                    // Nếu uncheck → xoá hẳn khỏi mảng
                                                                    return prev.filter(m => m.menuId !== item.id);
                                                                }
                                                            });
                                                        }}


                                                    />} label={item.name}
                                                    />
                                                </div>
                                                <div style={{ width: "80%" }}>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group"
                                                    >
                                                        <FormControlLabel control={<Switch
                                                            checked={role?.watch || false}
                                                            onChange={(e) =>
                                                                handlePermissionChange(item.id, "watch", e.target.checked)
                                                            }
                                                        />} label="Xem" />
                                                        <FormControlLabel control={<Switch
                                                            checked={role?.add || false}
                                                            onChange={(e) =>
                                                                handlePermissionChange(item.id, "add", e.target.checked)
                                                            }
                                                        />} label="Thêm" />
                                                        <FormControlLabel control={<Switch
                                                            checked={role?.update || false}
                                                            onChange={(e) =>
                                                                handlePermissionChange(item.id, "update", e.target.checked)
                                                            }
                                                        />} label="Sửa" />
                                                        <FormControlLabel control={<Switch
                                                            checked={role?.delete || false}
                                                            onChange={(e) =>
                                                                handlePermissionChange(item.id, "delete", e.target.checked)
                                                            }
                                                        />} label="Xóa" />
                                                    </RadioGroup>
                                                </div>
                                            </Stack>
                                        )

                                    })}


                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='error' onClick={handleCloseModal}>Hủy</Button>
                        <Button variant='contained' color='info' type="submit" form="subscription-form" >
                            Lưu
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>
        </div>
    )
}

export default ModalPermission
