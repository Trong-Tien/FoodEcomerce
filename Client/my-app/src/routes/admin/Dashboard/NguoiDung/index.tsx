import { useGetUser } from '@/Hooks/User';
import type { User } from '@/Type/User';
import { createFileRoute } from '@tanstack/react-router'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
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
export const Route = createFileRoute('/admin/Dashboard/NguoiDung/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { data, isError: isLoadingMenuError } = useGetUser(1, 10);
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

    const table = useMaterialReactTable({
        columns,
        data: data,
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
                    // onClick={() => handleOpenModalUpdate(row.original)}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Xóa">
                    <IconButton color="error" >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
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
                // onClick={handleOpenModal}
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
            {/* <ModalThem handleClose={handleCloseModal} openModal={openModal} /> */}

            {/* Modal sửa */}
            {/* <ModalSua
                handleClose={handleCloseModalUpdate}
                openModal={openModalUpdate}
                initialValues={selectedRow}
            /> */}
        </Card>
    )
}
