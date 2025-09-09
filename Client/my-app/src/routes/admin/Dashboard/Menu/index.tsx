import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import type { Menu } from '@/Type/Menu';
import { useDeleteMenu, useGetMenus } from '@/Hooks/Menu';
import {
  Box,
  Button,
  Card,
  IconButton,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import ModalThemSua from './- component/ModalThem';
import ModalSua from './- component/ModalSua';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import type { ResponseType } from '@/Type/ResponseType';
export const Route = createFileRoute('/admin/Dashboard/Menu/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [openModal, setOpenModal] = useState(false)
  const [openModalUpdate, setOpenModalUpdate] = useState(false)
  const [selectedRow, setSelectedRow] = useState<Menu>();
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [pageSizes, setPageSize] = useState<number>(0)
  const { data, isError: isLoadingMenuError } = useGetMenus(pageNumber , pageSizes);
  const deleteMenu = useDeleteMenu()
  const items: Menu[] = data?.items ?? [];

  const columns = useMemo<MRT_ColumnDef<Menu>[]>(
    () => [
      {
        accessorKey: 'orderNumber',
        header: 'STT',
        size: 80,
        muiTableHeadCellProps: { align: 'center' },
        muiTableBodyCellProps: { align: 'center' },
      },
      {
        accessorKey: 'name',
        header: 'Tên menu',
        size: 180,
      },
      {
        accessorKey: 'icon',
        header: 'Icon',
        size: 150,
      },
      {
        accessorKey: 'url',
        header: 'Đường dẫn',
        size: 200,
      },
      {
        accessorKey: 'isActive',
        header: 'Kích hoạt',
        size: 120,
        muiTableHeadCellProps: { align: 'center' },
        muiTableBodyCellProps: { align: 'center' },
        Cell: ({ cell }) => (
          <Switch
            checked={cell.getValue<boolean>()}
            size="small"
            color="success"
          />
        ),
      },
    ],
    [],
  );

  const handleOpenModal = () => setOpenModal(true);
  const handleOpenModalUpdate = (data: Menu) => {
    setSelectedRow(data);
    setOpenModalUpdate(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  const handleCloseModalUpdate = () => setOpenModalUpdate(false);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Bạn có muốn xóa dữ liệu này ? ",
      text: "Lưu ý dữ liệu này sẽ mất vĩnh viễn",
      showDenyButton: true,
      confirmButtonText: "Xác nhận",
      denyButtonText: `Không`
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response: ResponseType = await deleteMenu.mutateAsync(
          id,
        );
        if (response?.status === 200) {
          Swal.fire("Xóa dữ liệu thành công");
        } else {
          Swal.fire("Đã có lỗi xảy ra");
        }
      }
    });
  }

  const table = useMaterialReactTable({
    columns,
    data: items,
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
        <Tooltip title="Xóa">
          <IconButton color="error" onClick={() => handleDelete(row.original.id)}>
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
          Quản lý Menu
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Thêm menu
        </Button>
      </Box>
    ),
  });

  const { pageIndex, pageSize } = table.getState().pagination;

  useEffect(() => {
     if(pageIndex && pageSize) 
      setPageNumber(pageIndex)
      setPageSize(pageSize)
  }, [])


  return (
    <Card elevation={3} sx={{ p: 2 }}>
      <MaterialReactTable table={table} />

      {/* Modal insert */}
      <ModalThemSua
        handleClose={handleCloseModal}
        openModal={openModal}
      />

      {/* Modal update */}
      <ModalSua
        handleClose={handleCloseModalUpdate}
        openModal={openModalUpdate}
        initialValues={selectedRow}
      />
    </Card>
  );
}
