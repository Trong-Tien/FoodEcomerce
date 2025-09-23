import { useDeleteUser, useGetUser } from '@/Hooks/User';
import type { User } from '@/Type/User';
import { createFileRoute } from '@tanstack/react-router'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { useMemo, useState } from 'react';
import {
    Box,
    Button,
    Card,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ModalThem from './-components/ModalThem';
import ModalSua from './-components/ModalSua';
import type { UpdateUser } from '@/Type/UpdateUser';
export const Route = createFileRoute('/admin/Dashboard/NguoiDung/')({
    component: RouteComponent,
})
import Swal from 'sweetalert2';

function RouteComponent() {
    const [modalAdd, setModalAdd] = useState<boolean>(false)
    const [modalUpdate, setModalUpdate] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState<UpdateUser>();
    const { data, isError: isLoadingMenuError, refetch } = useGetUser(1, 10);
    const dataUser: User[] = data ?? []
    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: 'userName',
                header: 'Tên tài khoản',
                size: 80,
                muiTableHeadCellProps: { align: 'center' },
                muiTableBodyCellProps: { align: 'center' },
            },
            {
                accessorKey: 'phoneNumber',
                header: 'Số điện thoại',
                size: 180,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size: 180,
            },
            {
                accessorKey: 'address',
                header: 'Địa chỉ',
                size: 180,
            },
            {
                accessorKey: 'statusId',
                header: 'Trạng thái',
                size: 150,
                Cell: ({ row }) => {
                    const statusId = row.original.status.id;

                    const statusMap: Record<number, { text: string; color: string }> = {
                        1: { text: 'Chưa kích hoạt', color: 'gray' },
                        2: { text: 'Đang hoạt động', color: 'green' },
                        3: { text: 'Bị khóa tạm thời', color: 'orange' },
                        4: { text: 'Khóa vĩnh viễn', color: 'red' },
                        5: { text: 'Ngưng sử dụng', color: 'darkred' },
                        6: { text: 'Chưa xác thực', color: 'blue' },
                        7: { text: 'Đã xác thực danh tính', color: 'purple' }
                    };
                    const status = statusMap[statusId] || { text: 'Không xác định', color: 'black' };

                    return (
                        <span style={{ color: status.color, fontWeight: 600 }}>
                            {status.text}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'role.name',
                header: 'Vai trò',
                size: 180,
            },

        ],
        []
    );


    // const handleDelete = (id: string) => {
    //     Swal.fire({
    //       title: "Bạn có muốn xóa dữ liệu này ? ",
    //       text: "Lưu ý dữ liệu này sẽ mất vĩnh viễn",
    //       showDenyButton: true,
    //       confirmButtonText: "Xác nhận",
    //       denyButtonText: `Không`
    //     }).then(async (result) => {
    //       /* Read more about isConfirmed, isDenied below */
    //       if (result.isConfirmed) {
    //         const response: ResponseType = await deleteCategory.mutateAsync(
    //           id,
    //         );
    //         if (response?.status === 200) {
    //           Swal.fire("Xóa dữ liệu thành công");
    //         } else {
    //           Swal.fire("Đã có lỗi xảy ra");
    //         }
    //       }
    //     });
    //   }
    

    const mapUserToUpdate = (data: User): UpdateUser => {
        return {
            id: data.id,
            userName: data.userName,
            email: data.email,
            address: data.address,
            phoneNumber: data.phoneNumber,
            active: data.active,
            password : data.password,
            roleId: data.role.id,
            statusId: data.status.id
        }
    }

    const handleOpenModal = () => setModalAdd(true)

    const handleOpenModalUpdate = (row : User) => {
        const updateData: UpdateUser = mapUserToUpdate(row);
        setSelectedRow(updateData);
        setModalUpdate(true)
    }

    const handleClose = () => {
        setModalAdd(false)
        setModalUpdate(false)
        refetch()
    }





    const table = useMaterialReactTable({
        columns,
        data: dataUser,
        enableRowSelection: false,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        enableRowOrdering: true,
        enableEditing: true,
        initialState: { showColumnFilters: true },
        getRowId: (row) => row.id,
        muiToolbarAlertBannerProps: isLoadingMenuError
            ? { color: 'error', children: 'Đã có lỗi xảy ra' }
            : undefined,
        muiTableContainerProps: {
            sx: { minHeight: '500px' },
        },
        renderRowActions: ({ row }) => (
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Chỉnh sửa">
                    <IconButton
                        color="primary"
                 onClick={() => handleOpenModalUpdate(row.original)}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                {/* <Tooltip title="Xóa">
                    <IconButton color="error" >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip> */}
            </Box>
        ),
        renderTopToolbarCustomActions: () => (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    px: 2,
                }}
            >
                <Typography variant="h6" fontWeight="bold">
                    Quản lý tài khoản
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenModal}
                >
                    Thêm mới tài khoản
                </Button>
            </Box>
        ),
    });
    return (
        <Card elevation={3} sx={{ p: 2 }}>
            <MaterialReactTable table={table} />

            {/* Modal thêm */}
            <ModalThem handleClose={handleClose} openModal={modalAdd} />

            {/* Modal sửa */}
            <ModalSua
                handleClose={handleClose}
                openModal={modalUpdate}
                initialValues={selectedRow}
            />
        </Card>
    )
}
