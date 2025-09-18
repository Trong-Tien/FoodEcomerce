import { useGetCategory } from '@/Hooks/Category';
import type { Category } from '@/Type/Category';
import { createFileRoute } from '@tanstack/react-router'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { useMemo, useState } from 'react';
import ModalThem from './-component/ModalThem';
import {
  Box,
  Button,
  Card,
  IconButton,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ModalThemSua from '../Menu/- component/ModalThem';
export const Route = createFileRoute('/admin/Dashboard/DanhMuc/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { data, isError: isLoadingMenuError } = useGetCategory(1, 10);
  const dataCategory: Category[] = data?.items ?? [];

  const columns = useMemo<MRT_ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Tên danh mục',
        size: 80,
        muiTableHeadCellProps: { align: 'center' },
        muiTableBodyCellProps: { align: 'center' },
      },
      {
        accessorKey: 'description',
        header: 'Mô tả',
        size: 180,
      },
      {
        accessorKey: 'imageUrl',
        header: 'Hình ảnh',
        size: 150,
      },
      // {
      //   accessorKey: 'isActive',
      //   header: 'Kích hoạt',
      //   size: 120,
      //   muiTableHeadCellProps: { align: 'center' },
      //   muiTableBodyCellProps: { align: 'center' },
      //   Cell: ({ cell }) => (
      //     <Switch
      //       checked={cell.getValue<boolean>()}
      //       size="small"
      //       color="success"
      //     />
      //   ),
      // },
    ],
    [],
  );

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false);
  const table = useMaterialReactTable({
    columns,
    data: dataCategory,
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
          Quản lý danh mục
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Thêm mới danh mục
        </Button>
      </Box>
    ),
  });
  return (
    <Card elevation={3} sx={{ p: 2 }}>
      <MaterialReactTable table={table} />
       <ModalThem
        handleClose={handleCloseModal}
        openModal={openModal}
      />
    </Card>
  )

}
