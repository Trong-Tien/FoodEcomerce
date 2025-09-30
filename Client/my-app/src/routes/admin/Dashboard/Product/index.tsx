import { useGetProduct } from "@/Hooks/Product";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import type { Product } from "@/Type/Product";
import ImageIcon from "@mui/icons-material/Image";
import ModalThem from "./-components/ModalThem";
import ReactHtmlParser from "react-html-parser";
import ModalXemHinhAnh from "./-components/ModalXemHinhAnh";
export const Route = createFileRoute("/admin/Dashboard/Product/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isError: isLoadingMenuError } = useGetProduct(1, 10);
  const dataProduct  : Product []  = data ??[]
  const [openModal, setOpenModal] = useState(false);
  const [modalXemHinhAnh , setModalXemHinhAnh] = useState(false);
  const [productId , setProductId] = useState<string>("")
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handelOpenModalXemHinhAnh = (productId : string) => 
    {
      setModalXemHinhAnh(true)
       setProductId(productId)
    };
  const handleCloseModalXemHinhAnh = () => setModalXemHinhAnh(false);

  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "managementCode",
        header: "Mã sản phẩm",
        size: 80,
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
      },
      {
        accessorKey: "name",
        header: "Tên sản phẩm",
        size: 180,
      },
      {
        accessorKey: "description",
        header: "Mô tả sản phẩm",
        size: 250,
        Cell : ({row})=>{
          return (
            <>
            <p>{ReactHtmlParser(row.original.description)}</p>
            </>
          )
        }
      },
      {
        accessorKey: "unitPrice",
        header: "Đơn giá",
        size: 180,
      },
      {
        accessorKey: "quantityInStock",
        header: "Số lượng tồn",
        size: 180,
      },
      {
        accessorKey: "id",
        header: "Hình ảnh",
        size: 150,
        Cell: ({row}) => {

          return (
            <>
              <Tooltip title="Xem danh sách hình ảnh">
                <IconButton
                  color="error"
                   onClick={() => handelOpenModalXemHinhAnh(row.original.id)}
                >
                  <ImageIcon />
                </IconButton>
              </Tooltip>
            </>
          );
        },
      },
    ],
    []
  );

  console.log(productId)

  const table = useMaterialReactTable({
    columns,
    data: dataProduct,
    getRowId: (row) => row.id,

    enableExpanding: true,
    renderDetailPanel: ({ row }) => (
      <Collapse in={row.getIsExpanded()} timeout="auto" unmountOnExit>
        <Box sx={{ p: 2, bgcolor: "#f5f5f5" }}>
          <Typography variant="body2">
            <b>{row.original.name}</b>
          </Typography>
        </Box>
      </Collapse>
    ),
    enableRowSelection: false,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    //enableRowOrdering: true,
    enableEditing: true,

    muiToolbarAlertBannerProps: isLoadingMenuError
      ? { color: "error", children: "Đã có lỗi xảy ra" }
      : undefined,
    muiTableContainerProps: {
      sx: { minHeight: "500px" },
    },

    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Tooltip title="Chỉnh sửa">
          <IconButton
            color="primary"
            //onClick={() => handleOpenModalUpdate(row.original)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa">
          <IconButton
            color="error"
            // onClick={() => handleDelete(row.original.id)}
          >
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
          Quản lý sản phẩm
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Thêm mới sản phẩm
        </Button>
      </Box>
    ),
  });

  return (
    <Card elevation={3} sx={{ p: 2 }}>
      <MaterialReactTable table={table} />
      <ModalThem openModal={openModal} handleClose={handleCloseModal} />
      <ModalXemHinhAnh openModal={modalXemHinhAnh} handleClose={handleCloseModalXemHinhAnh} productId={productId}/>
    </Card>
  );
}
