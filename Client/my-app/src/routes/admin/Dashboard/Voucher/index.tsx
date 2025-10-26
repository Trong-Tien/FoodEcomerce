import { useDeleteVoucher, useGetVoucher } from '@/Hooks/Voucher';
import type { Voucher } from '@/Type/Voucher';
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react';
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
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import ModalAdd from './-component/ModalAdd';
import { useFile } from '@/Hooks/File';
import dayjs from "dayjs";
import type { UpdateVoucher } from '@/Type/UpdateVoucher';
import ModalUpdate from './-component/ModalUpdate';
import Swal from 'sweetalert2';
import type { ResponseType } from '@/Type/ResponseType';

export const Route = createFileRoute('/admin/Dashboard/Voucher/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isError: isLoadingMenuError, refetch } = useGetVoucher(1, 10);
  const dataVoucher: Voucher[] =  data?.items ?? []
  const deleteProduct = useDeleteVoucher()
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false)
  const [selectedRow, setSelectedRow] = useState<UpdateVoucher | undefined>();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);




  const mapCategoryToUpdate = (p: Voucher): UpdateVoucher => {
    return {
      id: p.id,
      name: p.name,
      description: p.description,
      discountType: p.discountType,
      discountValue: p.discountValue,
      startDate: p.startDate,
      endTime: p.endTime,
      isActive: p.isActive,
      usageLimit: p.usageLimit,
      maxDiscountAmount: p.maxDiscountAmount,
      minOrderAmount: p.minOrderAmount,
      imageUrl: p.imageUrl
    };
  };

  const handleOpenModalUpdate = (row: Voucher) => {
    const updateData: UpdateVoucher = mapCategoryToUpdate(row);
    setSelectedRow(updateData);
    setOpenModalUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setSelectedRow(undefined);
    setOpenModalUpdate(false);
  };

    const handleDelete = (id: number) => {
      Swal.fire({
        title: "Bạn có muốn xóa dữ liệu này ? ",
        text: "Lưu ý dữ liệu này sẽ mất vĩnh viễn",
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
            refetch()
          } else {
            Swal.fire("Đã có lỗi xảy ra");
          }
        }
      });
    }
  




  const columns = useMemo<MRT_ColumnDef<Voucher>[]>(
    () => [
      {
        accessorKey: "code",
        header: "Mã voucher",
        size: 80,
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
      },
      {
        accessorKey: "name",
        header: "Tên voucher",
        size: 180,
      },
      {
        accessorKey: "discountType",
        header: "Loại giảm giá",
        size: 180,
      },
      {
        accessorKey: "discountValue",
        header: "Giá trị giảm giá",
        size: 180,
      },
      {
        accessorKey: "startDate",
        header: "Ngày bắt đầu",
        size: 180,
        Cell: ({ cell }) => {
          const dateData = cell.getValue<Date>();
          return (
            <>
              {dayjs(dateData).format("DD/MM/YYYY HH:mm")}
            </>
          );
        }
      },
      {
        accessorKey: "endTime",
        header: "Ngày kết thúc",
        size: 180,
        Cell: ({ cell }) => {
          const dateData = cell.getValue<Date>();
          return (
            <>
              {dayjs(dateData).format("DD/MM/YYYY HH:mm")}
            </>
          );
        }
      },
      {
        accessorKey: 'imageUrl',
        header: 'Hình ảnh',
        size: 150,
        Cell: ({ cell }) => {
          const path = cell.getValue<string>();
          const { data: image } = useFile(path);

          if (!image) return <span>Đang tải...</span>;

          return (
            <img
              src={image}
              alt="Ảnh danh mục"
              style={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
          );
        },
      },

    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data: dataVoucher,
    getRowId: (row) => row.code,

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
          Quản lý voucher
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Thêm mới voucher
        </Button>
      </Box>
    ),
  });
  return (
    <Card elevation={3} sx={{ p: 2 }}>
      <MaterialReactTable table={table} />
      <ModalAdd openModal={openModal} handleClose={handleCloseModal} />
      <ModalUpdate  handleClose={handleCloseModalUpdate} openModal={openModalUpdate} initialValues={selectedRow} />
    </Card>
  )
}
