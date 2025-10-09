import { useFile } from "@/Hooks/File";
import { useGetPanner } from "@/Hooks/Panner";
import type { Panner } from "@/Type/Panner";
import { Switch } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import {
    MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ModalAdd from "./-component/ModalAdd";
export const Route = createFileRoute("/admin/Dashboard/Panner/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const { data, isError: isLoadingMenuError, refetch } = useGetPanner(1, 10);
  const items: Panner[] = data?.items ?? [];
  const columns = useMemo<MRT_ColumnDef<Panner>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Tên Panner",
        size: 80,
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
      },
      {
        accessorKey: "imageUrl",
        header: "Hình ảnh",
        size: 150,
        Cell: ({ cell }) => {
          const path = cell.getValue<string>();
          const { data: image } = useFile(path);

          if (!image) return <span>Đang tải...</span>;

          return (
            <img
              src={image}
              alt="Ảnh panner"
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          );
        },
      },
      {
        accessorKey: "active",
        header: "Kích hoạt",
        size: 120,
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
        Cell: ({ cell }) => (
          <Switch
            checked={cell.getValue<boolean>()}
            size="small"
            color="success"
          />
        ),
      },
    ],
    []
  );
  const handleOpenModal = () => {
    setModalAdd(true);
  };
  const handleCloseModal = () => {
    setModalAdd(false);
    refetch();
  };

  const table = useMaterialReactTable({
    columns,
    data: items,
    enableRowSelection: false,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    enableRowOrdering: true,
    enableEditing: true,
    initialState: { showColumnFilters: true },
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingMenuError
      ? { color: "error", children: "Đã có lỗi xảy ra" }
      : undefined,
    muiTableContainerProps: {
      sx: { minHeight: "500px" },
    },
    renderRowActions: () => (
      <Box sx={{ display: "flex", gap: 1 }}>
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          px: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Quản lý và cấu hình panner
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Thêm Panner
        </Button>
      </Box>
    ),
  });
 return <Card>
     <MaterialReactTable table={table} />
     <ModalAdd handleClose={handleCloseModal} openModal={modalAdd}/>
  </Card>;
}
