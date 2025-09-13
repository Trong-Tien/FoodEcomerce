import { useGetUnitCaculate } from "@/Hooks/UnitCaculate";
import type { UnitCacaulate } from "@/Type/UnitCaculate";
import { createFileRoute } from "@tanstack/react-router";
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Card,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
export const Route = createFileRoute("/admin/Dashboard/DonViTinh/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isError: isLoadingMenuError } = useGetUnitCaculate(1, 10);
  const items: UnitCacaulate[] = data?.items ?? [];
  const columns = useMemo<MRT_ColumnDef<UnitCacaulate>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Tên Đơn vị",
        size: 80,
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
      },
      {
        accessorKey: "code",
        header: "Mã quản lý",
        size: 180,
      },
      {
        accessorKey: "conservationRate",
        header: "Tỉ lệ chuyển đổi",
        size: 150,
      },
      {
        accessorKey: "description",
        header: "Mô tả",
        size: 200,
      },
    ],
    []
  );

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
    renderRowActions: () => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Chỉnh sửa">
          <IconButton
            color="primary"
          //  onClick={() => handleOpenModalUpdate(row.original)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa">
          <IconButton color="error">
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
          Quản lý và cấu hình đơn vị tính
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
         // onClick={handleOpenModal}
        >
          Thêm đơn vị mới
        </Button>
      </Box>
    ),
  });

  return <Card>
     <MaterialReactTable table={table} />
  </Card>;
}
