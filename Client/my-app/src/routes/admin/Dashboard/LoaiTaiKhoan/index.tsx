import { useGetLoaiTaiKhoan } from '@/Hooks/LoaiTaiKhoan'
import type { LoaiTaiKhoan } from '@/Type/LoaiTaiKhoan'
import { createFileRoute } from '@tanstack/react-router'
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { useMemo, useState } from 'react'
import {
  Box,
  Card,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import ModalPermission from './-component';
export const Route = createFileRoute('/admin/Dashboard/LoaiTaiKhoan/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: dataLoaiTaiKhoan } = useGetLoaiTaiKhoan(1, 10)
  const [modalPermission, setModalPermission] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<string>("")
  const LoaiTaiKhoanItem: LoaiTaiKhoan[] = dataLoaiTaiKhoan?.items ?? []

  const columns = useMemo<MRT_ColumnDef<LoaiTaiKhoan>[]>(
    () => [
      {
        accessorKey: 'orderNumber',
        header: 'STT',
        size: 20,
        muiTableHeadCellProps: { align: 'center' },
        muiTableBodyCellProps: { align: 'center' },
      },
      {
        accessorKey: 'name',
        header: 'Tên Loại tài khoản',
        size: 200,
      },
      {
        accessorKey: 'discription',
        header: 'Mô tả',
        size: 200,
      },
    ],
    [],
  );

  const handleOpenPermission = (id: string) => { setModalPermission(true); setSelectedId(id) }
  const handleClose = () => setModalPermission(false)

  const table = useMaterialReactTable({
    columns,
    data: LoaiTaiKhoanItem,
    enableRowSelection: false,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    enableRowOrdering: true,
    enableEditing: true,
    initialState: { showColumnFilters: true },
    getRowId: (row) => row.id,
    muiTableContainerProps: {
      sx: { minHeight: '500px' },
    },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Phân quyền">
          <IconButton
            color="primary"
            onClick={() => handleOpenPermission(row.original?.id)}
          >
            <LockPersonIcon />
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
      </Box>
    ),
  });
  return <div>
    <Card elevation={3} sx={{ p: 2 }}>
      <MaterialReactTable table={table} />
      <ModalPermission handleClose={handleClose} openModal={modalPermission} roleId={selectedId} />
    </Card>
  </div>
}
