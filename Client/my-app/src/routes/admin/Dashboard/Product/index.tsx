import { useDeleteProduct, useGetProduct } from "@/Hooks/Product";
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
  type MRT_PaginationState,
} from "material-react-table";
import type { Product } from "@/Type/Product";
import ImageIcon from "@mui/icons-material/Image";
import ModalThem from "./-components/ModalThem";
import ModalSua from "./-components/ModalSua";
import parse from "html-react-parser";
import ModalXemHinhAnh from "./-components/ModalXemHinhAnh";
import type { UpdateProduct } from "@/Type/UpdateProduct";
import Swal from 'sweetalert2';
import type { ResponseType } from "@/Type/ResponseType";

export const Route = createFileRoute("/admin/Dashboard/Product/")({
  component: RouteComponent,
});

function RouteComponent() {

  const { data, isError: isLoadingMenuError, refetch } = useGetProduct(1, 25);
  const deleteProduct = useDeleteProduct()
  const dataProduct: Product[] = data ?? []
  const [openModal, setOpenModal] = useState(false);
  const [modalXemHinhAnh, setModalXemHinhAnh] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState<UpdateProduct>();
  const [productId, setProductId] = useState<string>("")
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handelOpenModalXemHinhAnh = (productId: string) => {
    setModalXemHinhAnh(true)
    setProductId(productId)
  };
  const handleCloseModalXemHinhAnh = () => setModalXemHinhAnh(false);


  const mapCategoryToUpdate = (p: Product): UpdateProduct => {
    return {
      id: p.id,
      name: p.name,
      managementCode: p.managementCode,
      description: p.description,
      unitPrice: p.unitPrice,
      quantityInStock: p.quantityInStock,
      discount: p.discount,
      isActive: p.isActive,
      inventory: p.inventory,
      expiry: p.expiry,
      preserve: p.preserve,
      unitCaculateId: p.unitCaculateId,
      tradeMarkId: p.tradeMarkId,
      placeProductId: p.placeProductId,
      categoryId: [],
      imageUrl: []
    };
  };

  const handleOpenModalUpdate = (row: Product) => {
    const updateData: UpdateProduct = mapCategoryToUpdate(row);
    setSelectedRow(updateData);
    setOpenModalUpdate(true);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Bạn có muốn xóa dữ liệu này ? ",
      showDenyButton: true,
      confirmButtonText: "Xác nhận",
      denyButtonText: `Không`
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response: ResponseType = await deleteProduct.mutateAsync(
          id,
        );

        if (response?.status === 200) {
          Swal.fire("Xóa dữ liệu thành công");
          refetch();
        } else {
          Swal.fire("Đã có lỗi xảy ra");
        }
      }
    });
  }

  const handleCloseModalUpdate = () => {
    setSelectedRow(undefined);
    setOpenModalUpdate(false);
  };

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
        Cell: ({ row }) => {
          return (
            <>
              <p>{parse(row.original.description)}</p>
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
        accessorKey: "inventory",
        header: "Số lượng tồn",
        size: 180,
        Cell: ({ row }) => {
          const qty = row.original.inventory ?? 0;
          const isLow = qty <= 5; // cảnh báo khi ≤ 5
          return (
            <span style={{
              color: isLow ? "red" : "inherit",
              fontWeight: isLow ? "bold" : "normal"
            }}>
              {qty} {isLow && "⚠️"}
            </span>
          );
        },
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
      }

      ,
      {
        accessorKey: "id",
        header: "Hình ảnh",
        size: 150,
        Cell: ({ row }) => {

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
            onClick={() => handleOpenModalUpdate(row.original)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa">
          <IconButton
            color="error"
            onClick={() => handleDelete(row.original.id)}
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

    // ----- Thêm đoạn này để highlight toàn row -----
    muiTableBodyRowProps: ({ row }) => {
      const qty = row.original.inventory ?? 0;
      let bgColor = "inherit";

      if (qty === 0) bgColor = "#ffcccc";      // đỏ nhạt: hết hàng
      else if (qty <= 5) bgColor = "#fff3cd";  // vàng nhạt: sắp hết

      return {
        sx: {
          backgroundColor: bgColor,
        },
      };
    },

  });


  return (
    <Card elevation={3} sx={{ p: 2 }}>
      <MaterialReactTable table={table}

      />
      <ModalThem openModal={openModal} handleClose={handleCloseModal} />
      <ModalXemHinhAnh openModal={modalXemHinhAnh} handleClose={handleCloseModalXemHinhAnh} productId={productId} />
      <ModalSua handleClose={handleCloseModalUpdate} openModal={openModalUpdate} initialValues={selectedRow} />
    </Card>
  );
}
